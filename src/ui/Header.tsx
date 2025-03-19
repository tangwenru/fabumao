import React, { useEffect, useState } from 'react';
import {
  HomeOutlined, AppstoreAddOutlined, ShopOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Menu} from 'antd';
import type { MenuProps } from 'antd';
import styles from './Header.less';
import Logout from '@/lib/logout';
import goAuth from "@/lib/goAuth";
import getLocalUserInfo from "@/lib/getLocalUserInfo";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";
import event from "@/lib/event";
import {go} from "@/lib";

const RoleColor = {
  admin: 'red',
  operate: 'blue',
  funds: 'orange',
  other: '',
};

const Header = () => {
  const [userInfo, setUserInfo] = useState( getLocalUserInfo());
  const [siteInfo, setSiteInfo] = useState( getLocalSiteInfo());
  const [ currentPath, setCurrentPath ] = useState(document.location.pathname);
  // const {} = useRequest(() => UserController.getInfo(), {
  //   manual: !userInfo.isLogin,
  //   onSuccess(data) {
  //     getLocalUserInfo({
  //       ...data,
  //       isLogin: true,
  //     });
  //     setUserInfo( getLocalUserInfo() );
  //   },
  // });

  useEffect(() => {
    event.on('user-info.header', () => {
      setUserInfo({
        ...getLocalUserInfo(),
      });
    });

    event.on('user-login-success.header', () => {
      setUserInfo({
        ...getLocalUserInfo(),
      });
    });

    event.on('logout.header', () => {
      setUserInfo({ ...getLocalUserInfo() });
    });

    event.on('site-info.header', (siteInfo: Site.BaseInfo) => {
      setSiteInfo(siteInfo);
    });

    return () => {
      event.off('user-login-success.header');
      event.off('logout.header');
      event.off('user-info.header');
      event.off('site-info.header');
    };
  }, []);

  const onMenu = async (key: string) => {
    if( key?.match( /^\/user\//i ) ){
      if( ! getLocalUserInfo().isLogin ){
        const authResult = await goAuth().catch( err => {

        });
        if( ! authResult ){
          return;
        }
      }
    }

    switch (key) {
      case '/auth':
        await goAuth().catch( err => {});
        break;

      case '/logout':
        userInfo.isLogin = false;
        setUserInfo({
          ...userInfo,
        });
        Logout();

        goAuth();
        break;

      default:
        go(key);
    }

    setCurrentPath( key );
  };

  const [ menuItems, setMenuItems] = useState<MenuProps['items']>([
    {
      label: '首页',
      key: '/',
      // icon: <HomeOutlined />,
    },
    {
      label: `下载`,
      key: '/download',
      // icon: <AppstoreAddOutlined />,
    },
    {
      label: `关于`,
      key: '/about-us',
      // icon: <ShopOutlined />,
    },
    {
      label: <a className={styles.myMenu}>我的</a>,
      key: '/user/dashboard',
    },
  ]);

  const [ menuItemsPhone] = useState<MenuProps['items']>([
    {
      label: '首页',
      key: '/',
      // icon: <HomeOutlined />,
    },
    {
      label: `产品`,
      key: '/product',
      icon: <AppstoreAddOutlined />,
    },
  ]);

  // useEffect(() => {
  //   let menuItems: MenuProps['items'] = userInfo.isLogin
  //     ? [
  //       {
  //         label: <a>首页</a>,
  //         key: '/home',
  //         icon: <DashboardOutlined />,
  //       },
  //         {
  //           label: <a>安全退出</a>,
  //           key: '/logout',
  //           danger: true,
  //           icon: <PoweroffOutlined />,
  //         },
  //       ]
  //     : [
  //         {
  //           label: <a>登录/注册</a>,
  //           key: '/auth',
  //           icon: <UserOutlined />,
  //         },
  //       ];
  //   setMenuItems(menuItems);
  // }, [document.location, userInfo.isLogin]);

  return (
    <div className={styles.header}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#722ED2',
          },
        }}
      >
        <Menu
          className={ styles.menu }
          onClick={ e => {
            console.log('e:', e );
            onMenu( e.key );
          }}
          selectedKeys={[ currentPath ]}
          mode="horizontal"
          items={ window.innerWidth >= 680 ?  menuItems : menuItemsPhone }
        />
      </ConfigProvider>
    </div>
  );
};

export default Header;
