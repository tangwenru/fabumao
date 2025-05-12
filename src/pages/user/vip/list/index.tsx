import React, { useEffect, useState } from 'react';
import { Radio, Tabs} from 'antd';
import styles from './index.less';
import {
  UserOutlined, UsergroupAddOutlined, CreditCardOutlined,
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import UserVipListVip from "./vip";
import UserVipListAgent from "./agent";
import UserVipListVipCard from "./vip-card";
import {getQuery, go} from "@/lib";
import UserLayout from "@/pages/user/_layout";
import param from "@/lib/param";

const UserVipList: React.FC = ({}) => {
  const [ activeKey, setActiveKey ] = useState( '');
  const TabItems: TabsProps['items'] = [
    {
      key: 'vip',
      label: `Vip`,
      children: (
        <UserVipListVip />
      ),
    },
    {
      key: 'vip-card',
      label: `卡密`,
      children: (
        <UserVipListVipCard />
      ),
    },
    {
      key: 'agent',
      label: `Agent`,
      children: (
        <UserVipListAgent />
      ),
    },
  ];

  const onActiveKey = ( key: string ) => {
    setActiveKey( key );
    go( '', {
      activeKey: key,
    });
  }

  useEffect(() => {
    setActiveKey( getQuery('activeKey') || 'vip' );
  }, []);

  return (
    <UserLayout>
      <div className={styles.list}>
        <Radio.Group
          size="large"
          className={ styles.radioGroup }
          value={ activeKey }
          onChange={ e => onActiveKey( e.target.value ) }
        >
          <Radio.Button value="vip"><UserOutlined /> 会员</Radio.Button>
          <Radio.Button value="vip-card"><CreditCardOutlined /> 卡密</Radio.Button>
          <Radio.Button value="agent"><UsergroupAddOutlined /> 代理</Radio.Button>
        </Radio.Group>

        <Tabs
          activeKey={ activeKey }
          items={ TabItems }
          className={ styles.tabs }
        />
      </div>
    </UserLayout>
  );
};

export default UserVipList;
