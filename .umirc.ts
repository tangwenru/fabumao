import { defineConfig } from '@umijs/max';
import WebBaseConfig from "./web-base-config";
import packageJson from './package.json';
const isProduction = process.env.NODE_ENV === 'production';


const ShareImageUrl = `https://fafamao.oss-cn-chengdu.aliyuncs.com/image/famaomao.png`;

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '巡检',
    siderWidth: 0,
//     //在菜单为空时隐藏 Sider
    suppressSiderWhenMenuEmpty: true,
  },
  theme: {
    colorPrimary: '#722ED2',
  },
  metas: [
    { name: 'keywords', content: WebBaseConfig.keywords },
    { name: 'description', content: WebBaseConfig.description },
    { name: 'viewport', content: 'maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,width=device-width,initial-scale=1.0' },
    { name: 'format-detection-task', content: 'telephone=no,email=no,date=no,address=no' },
    { name: 'Language', content: 'zh-CN' },
    { name: 'Copyright', content: '王温如' },
    { name: 'Designer', content: '王温如' },
    { name: 'Publisher', content: '王温如' },
    { name: 'Distribution', content: 'Global' },
    { name: 'robots', content: 'all' },

    { 'http-equiv': 'expires', content: '0' },
    { 'http-equiv': 'pragma', content: 'no-cache' },
    { 'http-equiv': 'cache-control', content: 'no-cache' },
    { 'http-equiv': 'cache', content: 'no-cache' },


    { property: 'og:site_name', content: WebBaseConfig.keywords },
    { property: 'og:description', content:  WebBaseConfig.description },
    { property: 'og:title', content:  WebBaseConfig.description},
    { property: 'og:image', content: ShareImageUrl },

    // { name: 'twitter:card', content: 'summary_large_image'},
    // { name: 'twitter:site', content: meta.title},
    // { name: 'twitter:title', content: meta.title},
    // { name: 'twitter:description', content: meta.description},
    // { name: 'twitter:image', content: meta.image },
  ],
  styles: [
    { rel: 'alternate', type: "application/rss+xml", title: "RSS", href: "/feed.xml", src: "/feed.xml" }
  ],
  favicons: [

  ],

  headScripts: [
    { src: 'https://shipinlv.oss-cn-hangzhou.aliyuncs.com/www/source/js/loading-min.js', async: true },
    // `https://gw.alipayobjects.com/os/lib/??react/18.2.0/umd/react.production.min.js,react-dom/18.2.0/umd/react-dom.production.min.js`,
    `window.ieVersion=function(){var userAgent=navigator.userAgent;var isIE=userAgent.indexOf("compatible")>-1&&userAgent.indexOf("MSIE")>-1;var isEdge=userAgent.indexOf("Edge")>-1&&!isIE;var isIE11=userAgent.indexOf("Trident")>-1&&userAgent.indexOf("rv:11.0")>-1;var version=0;if(isIE){var reIE=new RegExp("MSIE (\\\\d+\\\\.\\\\d+);");reIE.test(userAgent);var fIEVersion=parseFloat(RegExp["$1"]);if(fIEVersion===7){version=7}else if(fIEVersion===8){version=8}else if(fIEVersion===9){version=9}else if(fIEVersion===10){version=10}else{version=6}}else if(isEdge){version=12}else if(isIE11){version=11}else{version=1000}return version};if(window.ieVersion()<=9){document.body.innerHTML='      <div id="ieLow" class="ieLow">        <div class="mainContent">            你的浏览器版本太低了，强烈建议使用现代浏览器，比如：            <a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank"            >谷歌浏览器</a            >，            <a href="https://browser.360.cn/se/" target="_blank"            >360浏览器</a> 等等...        </div>    </div>'}`
  ],
  publicPath:  isProduction? `https://fafamao.oss-cn-chengdu.aliyuncs.com/www/dist/${ packageJson.version }/` : '/',
  externals:{},
  extraBabelPlugins: isProduction
    ? ['babel-plugin-dynamic-import-node']
    : [],
  npmClient: 'pnpm',
});

