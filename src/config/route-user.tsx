import React from 'react';
import {
  TeamOutlined,
  AlignLeftOutlined,
  UserOutlined,
  ContainerOutlined,
  LineChartOutlined,
  WalletOutlined,
  GlobalOutlined,
  ShareAltOutlined,
  CrownOutlined, CodeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const RouterUser: MenuProps['items'] = [
  {
    key: '/user/dashboard',
    label: '概览',
    icon: <LineChartOutlined />,
    // component: './dashboard',
  },
  // {
  //   key: '/user/vip/list',
  //   label: '购买会员',
  //   icon: <CrownOutlined />,
  //   // component: './vip/list',
  // },
  {
    key: '/user/order',
    label: '订单',
    icon: <AlignLeftOutlined />,
    // component: './order',
  },
  {
    key: '/user/finance/list',
    label: '账单',
    icon: <ContainerOutlined />,
    // component: './finance/list',
  },
  {
    key: '/user/withdraw',
    label: '提现',
    icon: <WalletOutlined />,
    children: [
      {
        key: '/user/withdraw/apply',
        label: '申请',
        icon: <LineChartOutlined />,
        // component: './withdraw/apply',
      },
      {
        key: '/user/withdraw/list',
        label: '列表',
        icon: <LineChartOutlined />,
        // component: './withdraw/list',
      },
    ],
  },
  {
    key: '/user/invite/list',
    label: '我的好友',
    icon: <TeamOutlined />,
    // component: './invite/list',
  },
  {
    key: '/user/profile',
    label: '我的资料',
    icon: <UserOutlined />,
    // component: './profile',
  },
  {
    key: '/user/active-code',
    label: '激活码',
    icon: <CodeOutlined />,
    // component: './profile',
  },
  {
    key: '/user/vip/list/vip-card',
    label: '购买卡密',
    icon: <CrownOutlined />,
    // component: './vip/list',
  },
  // {
  //   key: '/user/share',
  //   label: '推广链接',
  //   icon: <ShareAltOutlined />,
  //   disabled: true,
  //   // component: './share',
  // },
  //
  // {
  //   key: '/user/domain',
  //   label: '绑定域名',
  //   icon: <GlobalOutlined />,
  //   // component: './domain',
  // },
];


export default RouterUser;