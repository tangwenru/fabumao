import React, {useEffect, useState} from 'react';
import styles from './my-layout.less';
import {Avatar, Menu} from "antd";
import type { MenuProps } from 'antd';
import {go} from "@/lib";
import { useRouter } from 'umi';
import getWebTitle from "@/lib/getWebTitle";
import goAuth from "@/lib/goAuth";
import getLocalUserInfo from "@/lib/getLocalUserInfo";
import {legacyLogicalPropertiesTransformer, StyleProvider} from "@ant-design/cssinjs";
import {Link} from "@umijs/max";

interface Props{
  logo: string;
  title: string;
  subtitle: string;
  sidebarWidth?: number;
  avatarProps: {
    src: string;
    title: React.ReactNode;
    render: ( dom: React.ReactNode ) => React.ReactNode;
  },
  route: Global.PageRoute;
  children: React.ReactNode;
}
const MyLayout: React.FC<Props>
  = ({
       logo,
       title,
       subtitle,
       avatarProps,
       sidebarWidth = 200,
       children,
     }) => {
  const router = useRouter();
  const [ selectedKeys, setSelectedKeys ] = useState<string[]>([
    router.pathname,
  ]);

  const items: MenuProps['items'] = [
    {
      label: '首页',
      key: '/',
      // icon: <HomeOutlined />,
    },
    {
      label: `关于`,
      key: '/about-us',
      // icon: <AppstoreAddOutlined />,
    },
    {
      label: <a className={styles.myMenu}>我的</a>,
      key: '/user/dashboard',
    },
  ];

  const onClick: MenuProps['onClick'] = async (e) => {
    const currentPath = e.key;

    // if( currentPath.match( /^\/user\//i ) ){
    //   if( ! getLocalUserInfo().isLogin ){
    //     const authResult = await goAuth().catch( err => {
    //
    //     });
    //     if( ! authResult ){
    //       return;
    //     }
    //   }
    // }

    console.log('click ', currentPath );
    setSelectedKeys([ currentPath ]);
    go( currentPath );
  };

  useEffect(() => {
    const list: string[] = [
      document.location?.pathname,
    ];
    setSelectedKeys( list );
  }, []);

  return (
    <div className={ `myLayout ${ styles.myLayout }` }>
      <StyleProvider
        hashPriority="high"
        transformers={[legacyLogicalPropertiesTransformer]}
      >
      <header className={ styles.header }>
        <div className={ styles.warp }>
          <div className={ styles.headerContent }>
            <Link className={ styles.logo } to="/" title={ getWebTitle() }>
              <img
                src={ logo }
                alt={ title }
              />
              {
                title &&
                  <span className={ styles.title }>{ title }</span>
              }
              <span className={ styles.subtitle }>{ subtitle }</span>
            </Link>

            <div className={ styles.nav }>
              <Menu
                className={ styles.menu }
                onClick={onClick}
                selectedKeys={ selectedKeys }
                mode="horizontal"
                items={ items }
              />
            </div>

            <div className={ styles.avatarBox }>
              {
                avatarProps.render(
                  <div className={ styles.avatar }>
                    <Avatar
                      src={ avatarProps.src }
                      size={ 34 }
                      className={ styles.avatarImage }
                    />
                    <span className={ styles.avatarTitle }>{ avatarProps.title }</span>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className={ styles.pos } />
      </header>
      <main>
        { children }
      </main>
      </StyleProvider>
    </div>
  );
}

export default MyLayout;