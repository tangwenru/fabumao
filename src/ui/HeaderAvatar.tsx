import React, { useEffect, useState } from 'react';
import {
  PoweroffOutlined,
  UserOutlined,
  DashboardOutlined, HomeOutlined, AppstoreAddOutlined, ShopOutlined, LogoutOutlined, CreditCardOutlined, CrownOutlined,
} from '@ant-design/icons';
import {Avatar, ConfigProvider, Dropdown, Menu} from 'antd';
// import { getEnv } from '@/lib/get-api-url';
import type { MenuProps } from 'antd';
import styles from './HeaderAvatar.less';
import getLocalUserInfo from "@/lib/getLocalUserInfo";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";
import {go} from "@/lib";
import logout from "@/lib/logout";
import goAuth from "@/lib/goAuth";

const RoleColor = {
  admin: 'red',
  operate: 'blue',
  funds: 'orange',
  other: '',
};

const HeaderAvatarProps = ( userInfo: User.UserInfo, isHideHome: boolean ) => {
  const onAvatarMenu = async ( key: string ) => {
    switch ( key ) {
      case 'logout':
        logout();
        break;

      case 'auth':
        await goAuth().catch( err => {});
        break;

      default:
        go( key );
    }
  }

  return {
    src: userInfo.avatarUrl || 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    size: 80,
    title: <span className={ styles.nickname }>{ userInfo.nickname || ( userInfo.id || '' ).toString( 36 ).toLocaleUpperCase() || '未登录' }</span>,
    render: (props: any, dom: React.ReactNode ) => {
      const userInfo = getLocalUserInfo();
      const siteInfo = getLocalSiteInfo();
      const itemsDropdown: MenuProps['items'] = [];

      if( userInfo.isLogin ){
        itemsDropdown.push(
            {
              label: <a>概览</a>,
              key: '/user/dashboard',
              icon: <DashboardOutlined />,
            },
            // {
            //   label: <a>我的资料</a>,
            //   key: '/user/profile',
            //   icon: <UserOutlined />,
            // }
        );

        // if( siteInfo.isIDealer  ){
        //   itemsDropdown.push({
        //     label: <a>进入经销商模式</a>,
        //     key: '/dealer/dashboard',
        //     icon: <UserOutlined />,
        //   });
        //   itemsDropdown.push({
        //     label: <a>购买卡密</a>,
        //     key: '/user/vip/list/vip-card',
        //     icon: <CrownOutlined />,
        //   });
        // }

        itemsDropdown.push({
            key: 'logout',
          danger: true,
            icon: <LogoutOutlined />,
            label: '安全退出',
          });
      }else{
        itemsDropdown.push({
          label: <a>登录/注册</a>,
          key: 'auth',
          icon: <UserOutlined />,
        });
      }

      return (
        isHideHome ?
          null
          :
        <Dropdown
          menu={{
            items: itemsDropdown,
            onClick( e ){
              onAvatarMenu( e.key );
            }
          }}
        >
          <div className={ styles.avatar }>
            { dom }
          </div>
        </Dropdown>
      );
    },
  }
};

export default HeaderAvatarProps
