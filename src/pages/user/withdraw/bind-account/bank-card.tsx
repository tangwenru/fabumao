import React, {useEffect, useState} from 'react';
import {
  Tag,
  Form, Input, Button, Switch,
} from 'antd';
import styles from './bank-card.less';
import * as ReceiptAccountBankController from "@/service/api/ReceiptAccountBankController";
import PageContentWarp from "@/ui/PageContentWarp";
import {useRequest} from "@umijs/hooks";
import toast from "@/lib/toast";

interface DetailData{
  balance: number;
  handlingFeePercent: number;
  hasApplyTask: boolean;
  applyTaskCreated: number;
  // hasBindReceiptAccount: boolean;
}

interface Props{
  onSuccess: () => void;
}
const WithdrawBindAccountBankCard: React.FC<Props>
  = ({
       onSuccess = () => {},
     }) => {
  const [ form ] = Form.useForm();
  const [ detailData, setDetailData ] = useState<ReceiptAccountBank.Detail>({
    "id": 0,
    "userId": 0,
    "cardNum": '',
    "cardName": '',
    "userName": '',
    "cardAddress": '',
    "enabled": true,
    "created": 0,
    "updated": 0,
  });
  const [ enabled, setEnabled ] =useState( true );

  const { loading, run, error } = useRequest(() => ReceiptAccountBankController.bankCardDetail(),
    {
      onSuccess( result ) {
        setDetailData( result );
        form.setFieldsValue({
          ...result,
        });
        setEnabled( result.enabled );
      },
    },
  );

  const { loading: loadingSubmit, run: runSubmit } = useRequest(
    ( data: Withdraw.BindBankCardQuery ) => ReceiptAccountBankController.bindBankCard(data),
    {
      manual: true,
      onSuccess() {
        toast('已经保存');
        onSuccess();
      },
    },
  );
  
  const onFinish = ( values: Withdraw.BindBankCardQuery ) => {
    runSubmit({
      ...values,
      enabled,
    });
  }

  useEffect(() => {
    form.setFieldsValue({
      ...detailData,
    });
  }, []);

  return (
    <PageContentWarp
      loading={ loading }
      error={ error }
      onReload={ run }
      className={ styles.backCardForm }
    >
      <Form
        form={form}
        layout="vertical"
        disabled={ loadingSubmit }
        autoComplete="off"
        onFinish={ onFinish }
      >
        <Form.Item
          name="cardName"
          label="银行名称"
          rules={[
            { required: true, message: '请填写', },
          ]}
        >
          <Input placeholder="比如：工商银行、招商银行之类" />
        </Form.Item>
        <Form.Item
          name="cardNum"
          label="银行卡号"
          rules={[
            { required: true, message: '请填写', },
            { pattern: /^[a-z0-9\s]+$/i, message: '卡号只有字母、数字，请检查', }
          ]}
        >
          <Input placeholder="一排数字，类似：1234567890..." />
        </Form.Item>
        <Form.Item
          name="userName"
          label="银行卡姓名"
          rules={[
            { required: true, message: '请填写', },
          ]}
        >
          <Input placeholder="请填写卡对应的姓名" />
        </Form.Item>
        <Form.Item
          name="cardAddress"
          label="开户行"
          rules={[
            { required: true, message: '请填写', },
            { min: 5, message: '写详细一点吧', }
          ]}
        >
          <Input placeholder="省、市、具体银行名，写详细一点吧" />
        </Form.Item>

        <Form.Item>
          <Switch
            checked={ enabled }
            unCheckedChildren="已禁用"
            checkedChildren="已启用"
            onChange={ e => setEnabled( e )}
          />
        </Form.Item>

        <Form.Item>
          <div className={ styles.submits }>
            <Button type="primary" htmlType="submit" loading={ loadingSubmit }>
              保存
            </Button>
          </div>
        </Form.Item>
      </Form>
    </PageContentWarp>
  );
}
export default WithdrawBindAccountBankCard;

