declare namespace Site {
  interface BaseInfo {
    dealerId: number;
    channelId: number;
    domainUserWeContactQrUrl: string;
    dealerWeContactQrUrl: string;
    isIDealer: boolean;
    icp: string;
    isQueryDomainBind: boolean;
    wechatAppId: string;
    domain: string;
    domainTitle: string;
    webTitle: string;
    webSubTitle: string;
    loginType: string[];
    disabledOnlineBuy: string[];
    webLogoUrl: string;
    disabledContact: boolean;
    companyName: string;
    companyIntroduction: string;
    companyCity: string;
    companyAddress: string;
    companyUrl: string;
    adminWechatQr: string;
    phoneNumber: string;
    email: string;
    sitePause: {
      isPause: boolean;
      reason: string;
    }
  }
}
