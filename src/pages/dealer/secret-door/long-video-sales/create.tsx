import React, {useEffect, useState} from 'react';
import {Button, Card, Divider, Form, InputNumber, Switch, Table} from "antd";
import styles from './create.less';
import * as DealerController from '@/service/api/DealerController';
import { useRequest } from '@umijs/hooks';
import toast from "@/lib/toast";
import PageContentWarp from "@/ui/PageContentWarp";

interface Props{
  loading: boolean;
  detailData: Dealer.CustomerProductUsageDetail;
  userIdKey: string;
  productType: string;
  // onFinish: () => void;
}
const SecretDoorLongVideoSalesProductCountCreate: React.FC<Props>
  = ({
       loading,
       detailData,
       userIdKey ,
       productType,
       // onFinish = () => {},
     }) => {

  const [ form ] = Form.useForm();
  const [ formData, setFormData ] = useState({
    canUseCount: detailData.canUseCount,
    isLimitCanUseCount: detailData.canUseCount >= 0,
  });
  const { run: runPost, loading: loadingPost } = useRequest(
    ( data: {  canUseCount: number } ) =>
      DealerController.productCountEdit({
        ...data,
        productType,
        userIdKey,
      }),
    {
      manual: true,
      onSuccess(result) {
        toast('已经保存');
        // onFinish()
      },
    },
  );

  const onFinish = ( values: {  canUseCount: number } ) => {
    console.log("long onFinish values:", values );
    if( ! formData.isLimitCanUseCount ){
      values.canUseCount = -1;
    }

    runPost({
      ...values,
    });
  }

  useEffect(() => {
    form.setFieldsValue({
      ...detailData,
    });
    console.log('iinnnn');
  }, []);

  return (
    <PageContentWarp
      className={`${ styles.create } `}
      loading={ loading }
    >
      <Form
        form={ form }
        disabled={ loadingPost }
        initialValues={{
          canUseCount: detailData.canUseCount,
        }}
        onFinish={ onFinish }
      >
        <Card
          size="small"
          className={ styles.card }
          title={(
            <>
              账户：
              { detailData.userId?.toString( 36 ).toLocaleUpperCase() }
              <Divider type="vertical" />
              { detailData.accountName }
            </>
          )}
        >
          <Form.Item
            label="是否限制数量"
          >
            <Switch
              checked={ formData.isLimitCanUseCount }
              checkedChildren="限制数量"
              unCheckedChildren="不限数量"
              onChange={ e => {
                formData.isLimitCanUseCount = e;
                setFormData({...formData});
              }}
            />
          </Form.Item>

          <div
            style={{
              display: formData.isLimitCanUseCount ? '' : 'none',
            }}
          >
            <Form.Item
              label="能用数量"
              name="canUseCount"
            >
              <InputNumber
                addonBefore="剩余能用"
                addonAfter="个"
                min={ -1 }
                disabled={ loadingPost }
                precision={ 0 }
              />
            </Form.Item>
          </div>

          {/*<Form.Item*/}
          {/*  label="是否清空已用"*/}
          {/*  name="isClearAlreadyUsedCount"*/}
          {/*>*/}
          {/*  <Switch*/}
          {/*    disabled={ true }*/}
          {/*    // checked={ isClearAlreadyUsedCount }*/}
          {/*    checkedChildren="清空已用"*/}
          {/*    unCheckedChildren="保持已用"*/}
          {/*  />*/}
          {/*</Form.Item>*/}

          {/*<Form.Item*/}
          {/*  label="已经用了"*/}
          {/*>*/}
          {/*  {detailData.alreadyUsedCount} <small>个</small>*/}
          {/*</Form.Item>*/}

          <Form.Item
            label="历史已用"
          >
            <strong>{ detailData.historyAlreadyUsedCount }</strong> <small>个</small>
          </Form.Item>

          <Button
            type="primary"
            loading={ loadingPost }
            htmlType="submit"
          >
            确定
          </Button>

        </Card>
      </Form>
    </PageContentWarp>
  );
};

export default SecretDoorLongVideoSalesProductCountCreate;
