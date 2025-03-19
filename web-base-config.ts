import isDomainLocalhost from "./src/lib/isDomainLocalhost";

const WebBaseConfigCurrentEnv: CurrentEnv = 'local';
const webKind: WebKind =  'fabumao';


////////////////////////////////////////////

type WebKind = 'fabumao' ;
type CurrentEnv = 'local' | 'pre' | 'prod' ;

interface WebBaseConfig{
  currentEnv: CurrentEnv;
  // appEnv: CurrentEnv;
  webKind: WebKind;
  version: string;

  keywords: string;
  description: string;

  // douzhuli: WebBaseConfigItem;
  // douxidong: WebBaseConfigItem;
  webKindData: Record<WebKind, WebBaseConfigItem>

  hiddenHomeDomainList: string[],
}

interface WebBaseConfigItem{
  apiUrls: {
    [env in CurrentEnv]: WebBaseConfigApiUrlsItem;
  }
}

interface WebBaseConfigApiUrlsItem{
  api: string;
  ws: string;
  authApi: string;
}
 
const ShipinlvApiUrls = {
  local: {
    api: 'http://localhost:9999/',
    ws: 'ws://localhost:20170/',
    authApi: 'https://api-dzl.shanren.wang/',
  },
  pre: {
    api: 'http://api.stock.net/',
    ws: 'ws://localhost:9410/',
    authApi: 'https://api-dzl.shanren.wang/',
  },
  prod: {
    api: '//api.shipinlv.com/',
    ws: 'wss://api.shipinlv.com/',
    authApi: '//api.shipinlv.com/',
  },
};

const WebBaseConfig: WebBaseConfig = {
  currentEnv: WebBaseConfigCurrentEnv,
  version: '',

  // 区分 后端的
  webKind,

  keywords: '发布猫',
  description: '发布猫',

  webKindData: {
    fabumao: {
      apiUrls: ShipinlvApiUrls,
    },
  },

  hiddenHomeDomainList: [
    // 'shipinlv.com',
    // 'www.shipinlv.com',
    // 'localhost'
  ],
}

export const getBaseConfigEnv = () => {
  if( typeof document === 'undefined'){
    return WebBaseConfig.currentEnv;
  }
  let env = WebBaseConfig.currentEnv;
  if ( ! isDomainLocalhost() ){
    env = 'prod';
  }
  return env;
}

export const getBaseConfigItemApi = () => {
  return WebBaseConfig.webKindData[ WebBaseConfig.webKind ]?.apiUrls[ WebBaseConfig.currentEnv ].api || '';
}

export const getBaseConfigItemApiUrl = ( apiName: string, env: CurrentEnv = 'prod' ) => {
  // 允许 http
  if (/^https?:\/\//i.test(apiName)) {
    return apiName;
  }

  // 替换第一个 /
  apiName = apiName.replace(/^\//, '');

  let domain = getBaseConfigItemApi();

  // 删除最后一个 /
  domain = domain?.replace(/\/$/, '') || '';

  // 改为小写
  // 把 api 变小写，但不变参数
  const apiNameInfo = apiName.split('?');
  apiName = `${apiNameInfo[0].toLowerCase()}${
    apiName.indexOf('?') > -1 ? '?' : ''
  }${apiNameInfo[1] || ''}`;

  // 可能有
  let url = `${domain}${/\/$/.test(domain) ? '' : '/'}${apiName}`;
  return url;
}

export default WebBaseConfig;
