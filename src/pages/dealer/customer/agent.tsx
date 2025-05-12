import React, { useState} from 'react';
import {
  Table, Tag, Button, Select, Switch, Result, Form,
} from 'antd';
import styles from './agent.less';
import * as DealerController from "@/service/api/DealerController";
import {useRequest} from "@umijs/hooks";
import PageContentWarp from "@/ui/PageContentWarp";
import DialogDrawerFooter from "@/ui/DialogDrawerFooter";
import toast from "@/lib/toast";
import math from "@/lib/math";

interface Props{
  userId: number;
  isAgent: boolean;
  onSuccess: () => void;
}

interface FormData{
  enabled: boolean;
  agentRatioPercent: number;
}

const  DealerCustomerDetailAgent: React.FC<Props>
  = ({
       userId= 0,
       isAgent= false,
       onSuccess = () => {},
     }) => {
  const [ form ] = Form.useForm();
  const [ canPost, setCanPost ] = useState( false );
  const [ isUserAgent, setIsUserAgent ] = useState( isAgent );
  const [ formData, setFormData ] = useState<FormData>({
    enabled: true,
    agentRatioPercent: 0,
  });

  const onAgentRatioPercent = ( ratio: number ) => {
    formData.agentRatioPercent = ratio;
    setFormData({...formData});
    setCanPost( true );
  }

  const {
    run: runSubmit,
    loading: loadingSubmit,
  } = useRequest(( query: UserAgentRatio.SaveQuery ) => DealerController.agentRatioSave(query ),
    {
      manual: true,
      onSuccess( result ){
        toast('保存成功');
        onSuccess();
      }
    },
  );

  const viewSelect = ( record = detailData.userAgentRatioList ) => {
    const agentRatioPercent = record.agentRatioPercent || 0;
    const min = agentRatioPercent ;
    const dealerRatioInfo = record.dealerRatioInfo;
    const parentGiveRatioSum = record.parentAlreadyGiveRatioPercentSum;
    const sonMaxDealerAlreadyGiveRatioPercent = record.sonMaxDealerAlreadyGiveRatioPercent;
    const notInSelf = Math.max( 0, sonMaxDealerAlreadyGiveRatioPercent.dealerAlreadyGiveRatioPercent - agentRatioPercent );
    let max = dealerRatioInfo.agentMaxRatioPercent - notInSelf ;

    // 检查上级
    const fatherDealerAlreadyGiveRatioPercent = math.subtract( dealerRatioInfo.agentMaxRatioPercent, parentGiveRatioSum );
    max = Math.min( fatherDealerAlreadyGiveRatioPercent, max );
    return (
      <Select
        defaultValue={ agentRatioPercent }
        onChange={ e => onAgentRatioPercent( e ) }
        className={ styles.agentRatioPercentSelect }
      >
        {
          Array( max ).join(',').split(',').map( (_, i ) => (
            i < agentRatioPercent ? null
              :
              <Select.Option key={ i } value={ i }>
                { i } <small className={ styles.agentRatioPercent }>%</small>
              </Select.Option>
          ))
        }
      </Select>
    );
  }

  const [ detailData, setDetailData ] = useState<Dealer.AgentRatio>({
    userAgentRatioList: {
      id: 0,
      agentRatioPercent: 0,
      dealerAlreadyGiveRatioPercent: 0,
      enabled: true,
      created: 0,
      dealerRatioInfo: {
        dealerRatioPercent: 0,
        agentMaxRatioPercent: 0,
      },
      parentAlreadyGiveRatioPercentSum: 0,
      sonMaxDealerAlreadyGiveRatioPercent: {
        userId: 0,
        agentRatioPercent: 0,
        dealerAlreadyGiveRatioPercent: 0,
        enabled: true,
      }
    },
  });
  const {
    run,
    loading,
    error,
  } = useRequest(() => DealerController.agentRatio({
      userId,
    }),
    {
      manual: ! isAgent,
      onSuccess( result ){
        setDetailData( result );
        formData.enabled = result.userAgentRatioList.enabled
        formData.agentRatioPercent = result.userAgentRatioList.agentRatioPercent;
        setFormData({...formData})
        form.setFieldsValue({...formData});
      }
    },
  );
  
  const onFinish = () => {
    const data: UserAgentRatio.SaveQuery = {
      list: formData,
      userId,
    };
    runSubmit( data );
  }

  const onGiveAgent = () => {
    setIsUserAgent( true )
    run();
  }

  return (
    <div className={ styles.agentRatio }>
      <PageContentWarp
        loading={ loading }
        onReload={ run }
        error={ error }
      >
        <Form
          form={ form }
        >
          {
            isUserAgent ?
              <>
                <div className={ styles.alert }>
                  <Tag color="orange">
                    代理的收益比例，只能增大，不能减小
                  </Tag>
                </div>

                <Form.Item label="当前比例">
                  { detailData.userAgentRatioList.agentRatioPercent }<small>%</small>
                </Form.Item>

                <Form.Item label="是否启用">
                  <Switch
                    disabled
                    defaultChecked={ detailData.userAgentRatioList.enabled }
                    unCheckedChildren="已禁用"
                    checkedChildren="已启用"
                  />
                </Form.Item>

                <Form.Item label="分配比例" name="agentRatioPercent">
                  { viewSelect() }
                </Form.Item>

                <DialogDrawerFooter>
                  <Button type="primary" disabled={ ! canPost } loading={ loading } onClick={ onFinish }>
                    确定
                  </Button>
                </DialogDrawerFooter>
              </>
              :
              <Result
                title="该用户还不是代理"
                extra={
                  <Button type="primary" key="console" onClick={ () => onGiveAgent() }>
                    开通代理权限
                  </Button>
                }
              />
          }
        </Form>

      </PageContentWarp>
    </div>
  )
};

export default  DealerCustomerDetailAgent;
