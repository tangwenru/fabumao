
import React from 'react';
import { Tag } from 'antd';

interface Props{
  status: string;
}

const WithdrawState: React.FC<Props> = ({ status = '' }) => {
  return (
    <a className={ `withdraw-status withdraw-status-${ status }` }>
      {
        status === 'wait-check' &&
        <Tag color="magenta">待我处理</Tag>
      }

      {
        status === 'finish' &&
        <Tag color="green">已完成</Tag>
      }

      {
        status === 'reject' &&
        <Tag color="red">被拒绝</Tag>
      }

      {
        status === 'transferring' &&
        <Tag color="orange">打款中</Tag>
      }

      {
        status === 'transfer-error' &&
        <Tag color="red">打款失败</Tag>
      }
    </a>
  )
}

export default WithdrawState;
