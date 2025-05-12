import React from 'react';
import {
  Table,
  Badge,
} from 'antd';

interface Props{
  status: Withdraw.Type;
}
interface StatusDict{
  [ name: string ]: {
    title: string;
    state: 'success' | 'processing' | 'error';
  }
}

// 'finish' | 'wait-check' | 'reject' | 'transferring' | 'transfer-error' | ''
const StatusDict: StatusDict = {
  finish: {
    title: '已完成',
    state: 'success',
  },
  'wait-check': {
    title: '等待审批',
    state: 'processing',
  },
  reject: {
    title: '被拒绝',
    state: 'error',
  },
  transferring: {
    title: '转账中',
    state: 'processing',
  },
  'transfer-error': {
    title: '转账错误',
    state: 'error',
  },

}
const  WithdrawStatus: React.FC<Props>
  = ({
       status = '',
     }) => {

  const itemData = StatusDict[ status ] || {
    title: status,
    state: '',
  }
  return (
    <Badge status={ itemData.state } text={ itemData.title } />
  )
};

export default  WithdrawStatus;
