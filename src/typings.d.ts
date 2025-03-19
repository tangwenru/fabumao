declare namespace Global {
  type Gender = 1 | 2 | 0;
  type Enabled = '' | '1' | '0';
  interface AppInitData {
    siteInfo: Site.BaseInfo;
  }

  interface Columns<T>{
    title: React.ReactNode;
    dataIndex: string;
    key?: string;
    width?: string | number;
    render?: ( filed?: any, record?: T , index?: number ) => React.ReactNode;
  }
  interface Pagination {
    current: number;
    pageSize: number;
    total: number;
    simple?: boolean;
    more?: boolean;
    showSizeChanger?: boolean;
  }

  interface AppPathInfo{
    pathRoot: string;
    appPath: string;
    exePath: string;
    appName: string;
    [ name: string]: any;
  }

  type OsName = '' | 'darwin' | 'windows' | 'linux' | 'other';


  interface RequestOptions {
    silent?: boolean;
    domain?: string; // https?://baidu.com
    disabledToken?: boolean;
    timeout?: number;
    [key: string]: any;
  }

  type ProductName = 'video-publish' | 'translation-video' | 'mixed-cut' | 'mixed-cut-api' | 'move-video' | 'chatgpt' | 'video-template' | 'long-video-sales';

  interface ApiResult<T> {
    success: boolean;
    message: string;
    data?: T;
    code: string;
  }

  interface AppMyLayoutData{
    logoUrl: string;
    title: string;
    subtitle: string;
  }



  interface PageRoute{
    path: string;
    name?: string;
    component?: string;
    icon?: React.ReactNode;
    routes?: PageRoute[]
  }
}

