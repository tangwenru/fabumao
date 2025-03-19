import React, {useEffect, useState} from 'react';
import { ConfigProvider  } from 'antd';
// @ts-ignore
import { Outlet, useLocation } from '@umijs/max';
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';
import styles from './index.less';
import Footer from "@/ui/Footer";
import NotFooter from "@/config/not-footer";
import {ProLayout} from "@ant-design/pro-layout";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";
import HeaderAvatarProps from "@/ui/HeaderAvatar";
import Header from "@/ui/Header";
import { useRequest } from '@umijs/hooks';
import * as SiteController from "@/service/api/SiteController";
import {go, store} from "@/lib";
import event from "@/lib/event";
import toastError from "@/lib/toastError";
import WebBaseConfig, {getBaseConfigEnv} from "../../web-base-config";
import setLocalUserInfo from "@/lib/setLocalUserInfo";
import {HeaderViewProps} from "@ant-design/pro-layout/es/components/Header";
import goAuth from "@/lib/goAuth";
import Tool from "component-shipinlv/dist/lib/Tool";
import LayoutPhoneMenu from "@/layouts/phone-menu";
import {LoadingOutlined} from "@ant-design/icons";
import LayoutHideHome from "@/layouts/hide-home";
import getLocalUserInfo from "@/lib/setLocalUserInfo";
import updateUserInfo from "@/lib/updateUserInfo";

interface Props{
  children?: React.ReactNode
}

const FaviconsList = [
  { rel: 'icon', type: 'image/png' },
  { rel: 'Bookmark', type: 'image/png' },
  { rel: 'apple-touch-icon', type: 'image/png' },
  { rel: 'apple-touch-icon-precomposed', type: 'image/png' },
];
const LayoutIndex: React.FC<Props> = ({ children, }) => {
  const myLocation = useLocation();
  const env = getBaseConfigEnv();

  const [ isShowChildren, setIsShowChildren ] = useState( false ) ;
  const [ isHideHome ] = useState( WebBaseConfig.hiddenHomeDomainList.includes( document.location.hostname ) );

  const [ siteInfo, setSiteInfo ] = useState( getLocalSiteInfo() );
  const [ userInfo, setUserInfo ] = useState( getLocalUserInfo() );

  const [ pathname, setPathname] = useState( document.location.pathname );
  const { run: runSite, loading: loadingSite, error } = useRequest(
    () =>
      SiteController.info({
        domain: document.location.hostname,
        inviteUserId: store.get('inviteUserId'),
      }, {
        timeout: 20e3,
      }),
    {
      onSuccess(result) {
        setSiteInfo(result);
        store.set('site-info', {
          ...result,
        });
        event.run('site-info', result);

        if (!result.isQueryDomainBind) {
          toastError('当前域名没有被绑定，请在管理页面绑定域名', 8);
        }

        setSiteInfo({...result});
        onFavicons( result.webLogoUrl );

        document.title = result.domainTitle || result.webTitle;

        setIsShowChildren( true );
      },
      onError(){
        setIsShowChildren( true );
      }
    },
  );

  // const route = Tool.getLocalStaffInfo().role === 'admin' ? routeAdmin : routeVideoTemplate;
  const onPathname = ( pathname: string ) => {
    console.log('onPathname:', document.location.pathname, pathname  );
    setPathname( pathname );
  }

  const onFavicons = ( webLogoUrl: string ) => {
    // <link rel="icon" href="https://shipinlv.oss-cn-hangzhou.aliyuncs.com/www/source/image/dingqi-logo.png"
    //       type="image/png"/>
    // <link rel="Bookmark" type="image/png"
    //       href="https://shipinlv.oss-cn-hangzhou.aliyuncs.com/www/source/image/dingqi-logo.png"/>
    // <link rel="apple-touch-icon" href="https://shipinlv.oss-cn-hangzhou.aliyuncs.com/www/source/image/dingqi-logo.png"/>
    // <link rel="apple-touch-icon-precomposed"
    //       href="https://shipinlv.oss-cn-hangzhou.aliyuncs.com/www/source/image/dingqi-logo.png"/>
    FaviconsList.forEach( item => {
      const $icon = document.createElement('link');
      $icon.rel = item.rel;
      $icon.href = webLogoUrl;
      if( item.type ){
        $icon.type = item.type;
      }
      document.head.appendChild( $icon );
    });
  }

  const onInit = () => {
    event.on('user-login-success.layout', ( data: any ) => {
      setLocalUserInfo({
        ...data,
      });
      // 直接刷新
      ( top || window ).document.location.reload();
    });

    event.on('user-info', () => {
      setUserInfo({...getLocalUserInfo() });
    });

    window.addEventListener('message', ( e) => {
      console.log('windows message :', e.data );
      switch ( e.data?.type  ) {
        case 'need-login':
          goAuth();
          break;
      }
    }, false );

    updateUserInfo();
  }

  useEffect(() => {
    onInit();
    return () => {

    };
  }, []);

  useEffect(() => {
    console.log('Current pathname:', myLocation.pathname);
    onPathname(myLocation.pathname)
    // 在这里添加你的代码，当 pathname 变化时，你想要执行的操作
  }, [myLocation.pathname]); // 只有当 pathname 变化时，才会重新运行 useEffect


  const disabledProLayout = !! myLocation.pathname.match(/^\/client\//i);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#722ED1',
        },
      }}
    >
      <StyleProvider
        hashPriority="high"
        transformers={[legacyLogicalPropertiesTransformer]}
      >
        <div
          className={`${styles.layouts}`}
        >
          {
            disabledProLayout ?
              <div className={styles.layoutContent}>
                {
                  loadingSite ?
                    <div className={styles.loading}>
                      <LoadingOutlined/>
                    </div>
                    :
                    (
                      isShowChildren &&
                      <Outlet/>
                    )
                }
              </div>
              :
              <ProLayout
                logo={siteInfo.webLogoUrl}
                title={siteInfo.webTitle}
                // route={}
                suppressSiderWhenMenuEmpty={true}
                siderWidth={0}
                location={{
                  pathname,
                }}
                navTheme="light"
                colorPrimary="#722ED1"
                layout="mix"
                fixedHeader={true}
                fixSiderbar={true}
                // headerHeight={ 60 }
                splitMenus={false}
                avatarProps={HeaderAvatarProps(userInfo, isHideHome )}
                actionsRender={() => {
                  // if (props.isMobile) return [];
                  if (typeof window === 'undefined') return [];
                  if( isHideHome ){
                    return ;
                  }

                  return [
                    // props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                    //   <SearchInput />
                    // ) : undefined,
                    <Header/>,
                  ];
                }}
                headerTitleRender={(logo: string, title: string, props: HeaderViewProps) => {
                  const defaultDom = (
                    <a
                      className={styles.logo}
                      onClick={() => go('/')}
                    >
                      {logo}
                      <span className={styles.title}>{title}</span>
                      <small>{siteInfo.webSubTitle}</small>
                    </a>
                  );
                  if (typeof window === 'undefined' || document.body.clientWidth < 1400 || props?.isMobile ){
                    return (
                        <>
                          {defaultDom}
                        </>
                    );
                  }

                  return (
                    <>
                      {defaultDom}
                    </>
                  );
                }}
                onCollapse={(collapsed: boolean) => {
                  if (!userInfo.isLogin) {
                    return goAuth();
                  }

                  const {pathname} = document.location;
                  let role = 'user';
                  let title = '用户菜单';
                  if (/\/dealer\//i.test(pathname)) {
                    role = 'dealer';
                    title = '经销商菜单';
                  }

                  const dialog = Tool.drawer({
                    title,
                    placement: 'left',
                    content: (
                      <LayoutPhoneMenu
                        role={role}
                        onMenu={() => {
                          dialog.destroy();
                        }}
                      />
                    ),
                    width: 200,
                  })
                }}
              >
                <div className={styles.layoutContent}>
                  {
                    loadingSite ?
                      <div className={styles.loading}>
                        <LoadingOutlined/>
                      </div>
                      :
                      (
                        isShowChildren &&
                        <>
                          {
                            isHideHome ?
                              <LayoutHideHome/>
                              :
                              <Outlet/>
                          }
                        </>
                      )
                  }
                </div>
                {
                  ! isHideHome &&
                  !pathname.match(/^\/customer\//i) &&
                  !pathname.match(/^\/dealer\//i) &&
                  !NotFooter.includes(pathname) &&
                  isShowChildren &&
                  ! /\/workspace$/i.test( pathname ) &&
                  <Footer/>
                }
              </ProLayout>
          }
          {!['idc', 'prod'].includes(env) && <div className="dev-alert">{env}</div>}
        </div>
      </StyleProvider>
    </ConfigProvider>
  );
}


export default LayoutIndex;
