import React, {useEffect, useState} from 'react';
import { Tabs, TabsProps } from 'antd';
import LayoutContent from '@/ui/LayoutContent';
import styles from './index.less';
import UserVipCardOrderList from "./vip-card-order";
import UserVipOrderList from "./vip";
import UserVipCardList from "./vip-card";
import UserLayout from "@/pages/user/_layout";
import isInServer from "@/lib/isInServer";
import getQuery from "@/lib/getQuery";
import go from "@/lib/go";

const UserOrder: React.FC = ({}) => {
  const [ activeKey, setActiveKey ] = useState( '' );
  const items: TabsProps['items'] = [
    {
      key: 'vip',
      label: (
        <div className={ styles.bankCard }>
          会员订单
        </div>
      ),
      children: (
        <UserVipOrderList />
      ),
    },
    {
      key: 'vip-card-order',
      label: (
        <div className={ styles.alipayAccount } >
          卡密订单
        </div>
      ),
      children: (
        <UserVipCardOrderList />
      ),
    },
    {
      key: 'vip-card',
      label: (
        <div className={ styles.alipayAccount } >
          卡密列表
        </div>
      ),
      children: (
        <UserVipCardList />
      ),
    },
  ];

  const onTabs = ( tabName: string ) => {
    setActiveKey( tabName );
    go('', {
      tabName,
    });
  }

  useEffect(() => {
    // isInServer() ? '' : 'vip';
    setActiveKey( getQuery('tabName') || 'vip');
  }, []);

  return (
    <UserLayout>
      <div className={styles.order}>
        <LayoutContent
          title="订单列表"
        >
          {
            activeKey &&
            <Tabs
              activeKey={ activeKey }
              items={ items }
              onChange={ e =>  onTabs( e ) }
            />
          }
        </LayoutContent>
      </div>
    </UserLayout>
  );
};

export default UserOrder;
