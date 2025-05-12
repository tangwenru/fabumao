import React from 'react';
import {
  Table,
  Badge,
} from 'antd';
type Status = 'payed' | 'reject' | 'cancel' | 'wait-check' | 'wait-pay' | '';
interface Props{
  status: Status;
}
interface StatusDict{
  [ name: string ]: {
    title: string;
    state: 'success' | 'processing';
  }
}

const StatusDict: StatusDict = {
  payed: {
    title: '已支付',
    state: 'success',
  },
  'wait-pay': {
    title: '待支付',
    state: 'processing',
  },

}
const  UserOrderStatus: React.FC<Props>
  = ({
       status = '',
     }) => {

  const itemData = StatusDict[ status ] || {
    title: status,
  }
  return (
    <Badge status={ itemData.state } text={ itemData.title } />
  )
};

export default  UserOrderStatus;
