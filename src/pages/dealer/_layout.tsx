// user/_layout.js

import React, {useEffect, useState} from 'react';
import {ConfigProvider, Layout, Menu} from "antd";
import styles from './_layout.less';
import RouterDealer from '@/config/route-dealer';
import getLocalUserInfo from "@/lib/getLocalUserInfo";
import goAuth from "@/lib/goAuth";
import {go} from "@/lib";
import { Outlet } from '@umijs/max';

interface Props{
  children: React.ReactNode;
}
const DealerLayout: React.FC<Props> = ({ children }) => {
  // const router = useRouter();
  const [ defaultSelectedKeys, setDefaultSelectedKeys ] = useState<string[]>([
    document.location.pathname
  ]);
  const [ isMobile, setIsMobile ] = useState( false );

  const onMenu = ( key: string ) => {
    console.log('e', key );
    go( key );
  }

  useEffect(() => {

    setIsMobile( window.screen.width <= 480  );

    const userInfo = getLocalUserInfo();
    if( ! userInfo.isLogin ){
      goAuth();
    }
  }, []);

  return (
    <Layout
      className={ styles.dealerLayout}
    >
      {
        ! isMobile &&
        <Layout.Sider
          className={ styles.sider }
        >
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemSelectedBg: '#f3e0ff',
                },
              },
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={ defaultSelectedKeys }
              // defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={ RouterDealer }
              className={ styles.menu }
              onClick={ e => onMenu( e.key )}
            />
          </ConfigProvider>
        </Layout.Sider>
      }
      <Layout.Content className={ styles.content }>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default DealerLayout;