declare namespace Dealer{

  interface CustomerListData{
    list: CustomerList[];
    pagination: Global.Pagination;
  }
  interface CustomerList{
    userId: number;
    nickname: string;
    avatarUrl: string;
    isAgent: boolean;
    isAgentLevel1: boolean;
    isLevel1: boolean;
    level: number;
    canBuyVipCard: number;
    accountName: string;
    created: number;
  }

  type FriendType = '' | 'agent' | 'agent-1' | 'down-1' | 'down-2';
  interface CustomerListQuery{
    friendType: FriendType;
    day: [ number, number ];
    keyword: string;
  }

  interface CustomerDetail{
    userVipList: UserAuth.UserVipInfo[];
  }

  ///--------
  interface Info{
    domains: string[];
    weContactQrUrl: string;
  }

  interface AgentRatio{
    userAgentRatioList: UserAgentRatioList;
  }

  interface UserAgentRatioList{
    id: number;
    agentRatioPercent: number;
    dealerAlreadyGiveRatioPercent: number;
    enabled: boolean;
    created: number;
    dealerRatioInfo: {
      dealerRatioPercent: number;
      agentMaxRatioPercent: number;
    },

    parentAlreadyGiveRatioPercentSum: number;
    sonMaxDealerAlreadyGiveRatioPercent: {
      userId: number;
      agentRatioPercent: number;
      dealerAlreadyGiveRatioPercent: number;
      enabled: boolean;
    }
  }

  interface CustomerProductUsageQuery{
    userId: number;
    productType: string;
    timeType: 'day' | 'month';
  }

  interface CustomerProductUsageList{

  }

  interface CustomerProductUsageDetailQuery{
    keyword: string;
  }
  interface CustomerProductUsageDetail{
    userIdKey: string;
    userId: number;
    productType: string; // long-video-sales,
    productName: string;
    accountName: string;
    canUseCount: number;
    alreadyUsedCount: number;
    historyAlreadyUsedCount: number;
  }

  interface CustomerUserPasswordResult{
    password: string;
  }
}
