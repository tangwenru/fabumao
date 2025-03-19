// 运行时配置
import './app.less';
// import { RuntimeConfig } from '@umijs/max';
import globalRoute from './global-route';
// 运行时配置
//
// // 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// // 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
// import Header from "@/ui/Header";
// import routeAdmin from "@/config/route-admin";
// import routeVideoTemplate from "@/config/route-video-template";
// import getLocalUserInfo from "@/lib/getLocalUserInfo";
// 其他属性见：https://procomponents.ant.design/components/layout#prolayout
//
export const layout =  () => {
  console.log('on layout!!!');
  const data = {
    title: '',
    // title: '11111', // <span className={ styles.webLogo }>{ packageJson.title }<small>管理后台</small></span>,
    // logo: '',
    // menu: {
    //   locale: false,
    // },
    // fixedHeader: false,
    siderWidth: 0,
    //在菜单为空时隐藏 Sider
    suppressSiderWhenMenuEmpty: true,
    // avatarProps: HeaderAvatarProps,
    // actionsRender: () => {
    //   // if (props.isMobile) return [];
    //   if (typeof window === 'undefined') return [];
    //   return [
    //     // props.layout !== 'side' && document.body.clientWidth > 1400 ? (
    //     //   <SearchInput />
    //     // ) : undefined,
    //     <Header />,
    //   ];
    // },
    // headerTitleRender:   (logo: string, title: string, options: any = {} ) => {
    //   const defaultDom = (
    //     <a>
    //       {logo}
    //       {title}
    //     </a>
    //   );
    //   if (typeof window === 'undefined') return defaultDom;
    //   if (document.body.clientWidth < 1400) {
    //     return defaultDom;
    //   }
    //   if ( options?.isMobile) return defaultDom;
    //   return (
    //     <div className={ styles.headerWarp }>
    //       { defaultDom }
    //     </div>
    //   );
    // },
    footerRender(){
      return false;
    },
    menu:{
    collapsedShowGroupTitle: true,
  },
    links: [],
    routes: [], //globalRoute.route, // getLocalUserInfo().role === 'admin' ? routeAdmin : routeVideoTemplate,
    // layout: 'top',
  };
  return data;
};
