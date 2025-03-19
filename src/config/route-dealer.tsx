import React from 'react';
import {
  UsergroupAddOutlined,
  DashboardOutlined,
  FormOutlined, WalletOutlined, DatabaseOutlined, CrownOutlined, UserSwitchOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const RouterDealer: MenuProps['items'] = [
  {
    key: '/dealer/dashboard',
    label: '概览',
    icon: <DashboardOutlined />,
    // component: './dashboard',
  },
  {
    key: '/dealer/product-try/list',
    label: '试用产品',
    icon: <CrownOutlined />,
  },
  // {
  //   key: '/dealer/product-user-try/list',
  //   label: '用户试用',
  //   icon: <UserSwitchOutlined />,
  // },
  {
    key: '/dealer/user/list',
    label: '名下好友',
    icon: <UsergroupAddOutlined />,
    component: './profile/user/list',
  },
  {
    key: '/dealer/ratio/list',
    label: '推广比例',
    icon: <DatabaseOutlined />,
    component: './profile/ratio/list',
  },
  {
    key: '/dealer/funds/withdraw/list',
    label: '提现申请',
    icon: <WalletOutlined />,
    component: './funds/withdraw/list',
  },
  {
    key: '/dealer/info',
    label: '经销商资料',
    icon: <FormOutlined />,
    component: './info',
  },
];


export default RouterDealer;
