const ua = typeof window != 'undefined' ? window.navigator.userAgent.toLowerCase() : '';

// android平台
const isAndroid = (() => {
  return /Android|Adr/i.test(ua)
})()

// ios平台
const isIos = (() => {
  return /iPhone|iPod|iPad/i.test(ua)
})()

// 微信生态
const isWechat = (() => {
  return /MicroMessenger/i.test(ua)
})()

// 微信小程序
const isWxmp = (() => {
  return /miniProgram/i.test(ua) || typeof window != 'undefined' ? window.__wxjs_environment === 'miniprogram' : '';
})()

// 钉钉环境
const isDingding = (() => {
  return /DingTalk/i.test(ua)
})()

const isH5 = (() => {
  return !! ua.match(/AppleWebKit.*Mobile.*/) || isAndroid || isIos; //是否为移动终端
})()


// 钉钉环境
const isWeb = (() => {
  return ! isH5;
})()


const Platform = {
  isAndroid,
  isIos,
  isWechat,
  isWxmp,
  isDingding,
  isH5,
  isWeb,
  isIPhone: ua.indexOf('iPhone') > -1 , //iPhone
  isIPad: ua.indexOf('iPad') > -1, //iPad
}


export default Platform