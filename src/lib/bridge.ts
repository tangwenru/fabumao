const bridge = (): AppBridge => {
  // 客户端，node 环境
  const reg = new RegExp( 'shipinlv' , 'i');
  if( reg.test( window.navigator.userAgent ) ){
    return window.WdAppBridge;
  }
  // 浏览器环境
  return {
    sendIpc(){
      console.error('no bridge!')
    },
  };
}

export default bridge;