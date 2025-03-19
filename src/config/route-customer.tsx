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
  CrownOutlined,
  CodeOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  ShopOutlined,
  VideoCameraOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const RouterCustomer: MenuProps['items'] = [
  {
    key: '/user/dashboard',
    label: '概览',
    icon: <DashboardOutlined />,
    // component: './dashboard',
  },
  {
    key: '/user/detection-task/list',
    label: '巡检',
    icon: <OrderedListOutlined />,
    // component: './dashboard',
  },
  {
    key: '/user/shop',
    label: '店铺',
    icon: <ShopOutlined />,
    // component: './finance/list',
  },
  {
    key: '/user/user',
    label: '店员',
    icon: <UsergroupAddOutlined />,
    // component: './finance/list',
  },
  {
    key: '/user/camera',
    label: '摄像头',
    icon: <VideoCameraOutlined />,
    // component: './finance/list',
  },
  {
    key: '/user/user-camera-platform',
    label: '摄像头平台',
    icon: <VideoCameraOutlined />,
    // component: './finance/list',
  },
  {
    key: '/user/profile',
    label: '我的资料',
    icon: <UserOutlined />,
    // component: './profile',
  },
];


export default RouterCustomer;