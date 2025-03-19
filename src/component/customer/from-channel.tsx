import React, { useEffect, useState } from 'react';
import { WechatOutlined, UnlockOutlined } from '@ant-design/icons';
import styles from './from-channel.module.scss';
interface Channel {
  [name: string]: {
    title: React.ReactNode;
    icon: React.ReactNode;
    color?: string;
    tagColor?: string;
  };
}
interface Props {
  fromChannel: string;
  isTag?: boolean;
}

const Channel: Channel = {
  'account': {
    title: '账户类型',
    icon: <UnlockOutlined />,
    color: '#FFF',
    tagColor: '#00cde3',
  },
  'wechat-mini': {
    title: '微信',
    icon: <WechatOutlined />,
    color: '#2aae67',
    tagColor: '#2aae67',
  },
};
const UserFromChannel: React.FC<Props> = ({
  fromChannel = '',
  isTag = false,
}) => {
  const itemData = Channel[fromChannel] || {
    title: fromChannel,
    icon: '',
    tagColor: '',
  };

  return (
    <span
      className={`${styles.fromChannel} ${isTag ? styles.tag : styles.noTag}`}
      style={{
        backgroundColor: itemData.tagColor,
      }}
    >
      <span style={{ color: itemData?.color }} className={styles.icon}>
        {itemData?.icon}
      </span>{' '}
      {itemData.title}
    </span>
  );
};

export default UserFromChannel;
