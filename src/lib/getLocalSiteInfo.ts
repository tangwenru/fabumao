import store from "@/lib/store";

const getLocalSiteInfo = () => {
  const storageCustomerInfo: Site.BaseInfo = {
    dealerId: 1,
    domain: '',
    webLogoUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    dealerWeContactQrUrl: '',
    domainUserWeContactQrUrl: '',
    isIDealer: false,
    icp: '浙ICP备16011722号',
    disabledOnlineBuy: [],
    wechatAppId: '',
    domainTitle: '',
    webTitle: '',
    disabledContact: false,
    adminWechatQr: 'https://u.wechat.com/MDA8pNKUYg2YIqckdiImRFE',
    sitePause: {
      isPause: false,
      reason: '',
    },
    ...store.get('site-info'),
  };
  return storageCustomerInfo;
}

export default getLocalSiteInfo;