declare interface Window {
  __wxjs_environment: string;
  _openAuth_: boolean;
  _pageDialogBox: {
    destroy: () => void;
  }[];
  __events: {
    name: string;
    fn: (data?: any) => void;
  }[];
  __recordError: {
    create: ( query: {
      title: string;
      siteUserId: number;
      errorLevel: 1 | 2 | 3; //'1:严重，2：警告；3：提示；',
      errorType: 'HTTP' | 'LOGICAL' | string; //'HTTP: 网络错误; LOGICAL：逻辑错误；‘’: 不能定义的错误；',
      language: 'JavaScript' | 'Go', //Go','JavaScript','')
      pageUrl: string;
      content: string;
      apiUrl: string;
    }[] ) => void;
  }
  WdAppBridge: AppBridge;
}



declare interface AppBridge{
  electron: any;
  ipcRenderer: any;
  process: any;
  store: {
    get: ( name: string ) => any;
    set: ( name: string, value: any ) => void;
  }
  openInFolder: ( filePath: string ) => void;
  unzip: ( zipPath: string, folderPath: string ) => Promise<boolean>;
  getAppId: () => string;
  getAppPath: () => string;
  Downloader: FileDownloader;
  appQuiet: () => void;
  WindowsShortcuts: any;
  startLocalServer: ( appPath: string ) => Promise<any>;
  openDir: ( path: string ) => void;
  showFileInFolder: ( path: string ) => Promise<true>;
  getDirFileList: ( path: string, fileType?: 'folder' | 'file' | ''  ) => Promise<string[]>;
  getTextFileContent: ( path: string ) => Promise<string>;
  showItemInFolder: ( fullPath: string ) => Promise<true>;
  getSetting: () => Setting.Config;
  setWindowClose: () => void;
  setMinimize: () => void;
  setFullScreen: () => void;
  openMainConsole: () => void;
  // AliCloudPopCore: any;
  fontList: {
    getFonts: () => Promise<string[]>;
  };
  request: ( url, options: {}, fn : ( err: Error, response: {
    req: { path: string },
    statusCode: number;
    headers: { [name:string ]: any },
  }, body: string ) => any ) => void;
  // 如果 command 不唯一，注意区分
  sendIpc: ( command: string,  query?: any ) => void;
  getIpc: ( command: string,  query: {
    from: string;
    [name: string]: any;
  } ) => Promise<any>;
  invoke:  ( command: string ) => void;
  fs: any;
  os: any;
  child_process: any;
  path: any;
  downloadFile: (url: string, dest: string, cb: DownloadFileCb ) => void;
  httpProxy: ( data: HttpProxyQuery ) => Promise<any>;
  FileType: {
    fromFile: ( filePath: string ) => Promise<{ext: string, mime: string }>
  };
  MimeTypes: {
    getContentType: ( fileName: string ) => string;
  };
  version: string;
  versionReal: number;
  agentId: number;
  openLocalBrowser: ( url: string ) => void;
}
