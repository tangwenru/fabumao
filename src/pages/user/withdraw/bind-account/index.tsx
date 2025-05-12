import React, {useState} from 'react';
import {
  Tag,
  Form,
  Button, Radio, Tooltip, Table, Divider, Tabs, Alert,
} from 'antd';
import styles from './index.less';
import {
  AlipayCircleOutlined, CreditCardOutlined, WechatOutlined,
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import WithdrawBindAccountBankCard from "@/pages/user/withdraw/bind-account/bank-card";

interface DetailData{
  balance: number;
  handlingFeePercent: number;
  hasApplyTask: boolean;
  applyTaskCreated: number;
  // hasBindReceiptAccount: boolean;
}

interface Props{
  hasBindReceiptAccount: boolean;
  onSuccess: () => void;
}
const WithdrawBindAccount: React.FC<Props>
  = ({
       hasBindReceiptAccount,
       onSuccess = () => {},
     }) => {
  const [ form ] = Form.useForm();
  const [ formData, setFormData ] = useState({
    alipayOpenId: '',
    wechatOpenId: '',
  });

  const items: TabsProps['items'] = [
    {
      key: 'alipay',
      label: (
        <div className={ styles.alipayAccount } >
          <AlipayCircleOutlined /> 支付宝
        </div>
      ),
      children: (
        <Alert type="warning" description="预计下周上线" />
      ),
    },
    {
      key: 'bank-card',
      label: (
        <div className={ styles.bankCard } >
          <CreditCardOutlined /> 银行卡
        </div>
      ),
      children: (
        <WithdrawBindAccountBankCard
          onSuccess={ onSuccess }
        />
      ),
    },
    {
      key: 'wepay',
      label: (
        <div className={ styles.wechatAccount }>
          <WechatOutlined /> 微信账户
        </div>
      ),
      className: styles.disabled,
      disabled: true,
      children: (
        <Alert type="warning" description="微信打款接口还没审批下来，正在申请中..." />
      ),
    },
  ];
  
  const onChange = ( e: string ) => {

  }

  return (
    <div
      className={ styles.withdrawBindAccount }
    >
      <Tabs
        defaultActiveKey="alipay"
        items={items}
        onChange={ key => onChange( key ) }
      />
    </div>
  );
}
export default WithdrawBindAccount;

