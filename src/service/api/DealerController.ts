import request from '@/lib/Request';
export async function customerList(
  body: {
    friendType: Dealer.FriendType;
    startTime: number;
    endTime: number;
    keyword: string;
    current: number;
    pageSize: number
  },
  options?: ServicesApi.RequestOptions,
) {
  return request<Dealer.CustomerListData>(
    `dealer/user/list`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...body,
      },
      ...(options || {}),
    },
  );
}


export async function customerDetail(
  body: {
    userId: number;
  },
  options?: ServicesApi.RequestOptions,
) {
  return request<Dealer.CustomerDetail>(
    `dealer/user/detail`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...body,
      },
      ...(options || {}),
    },
  );
}


export async function agentRatio(
  body: {
    userId: number;
  },
  options?: ServicesApi.RequestOptions,
) {
  return request<Dealer.AgentRatio>(
    `dealer/user/agentRatio`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...body,
      },
      ...(options || {}),
    },
  );
}


export async function agentRatioSave(
  body: UserAgentRatio.SaveQuery,
  options?: ServicesApi.RequestOptions,
) {
  return request<UserAgentRatio.SaveQuery>(
    `dealer/userAgentRatio/save`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...body,
      },
      ...(options || {}),
    },
  );
}



export async function getInfo(
  body?: {},
  options?: ServicesApi.RequestOptions,
) {
  return request<Dealer.Info>(
    `dealer/info/detail`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...body,
      },
      ...(options || {}),
    },
  );
}


export async function saveInfo(
  body: {
    weContactQrUrl: string;
  },
  options?: ServicesApi.RequestOptions,
) {
  return request<any>(
    `dealer/info/save`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...body,
      },
      ...(options || {}),
    },
  );
}

export async function productUsage(
  body: Dealer.CustomerProductUsageQuery,
  options?: ServicesApi.RequestOptions,
) {
  return request<any>(
    `dealer/productUsage/list`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...body,
      },
      ...(options || {}),
    },
  );
}



export async function productUsageDetail(
  body: {
    productType: string;
    keyword: string;
  },
  options?: ServicesApi.RequestOptions,
) {
  return request<any>(
    `dealer/productUsage/detail`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...body,
      },
      ...(options || {}),
    },
  );
}



export async function productCountEdit(
  body: {
    productType: string;
    userIdKey: string;
    canUseCount: number;
  },
  options?: ServicesApi.RequestOptions,
) {
  return request<any>(
    `dealer/productUsage/edit`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...body,
      },
      ...(options || {}),
    },
  );
}



export async function userPassword(
  body: {
    targetUserId: number;
  },
  options?: ServicesApi.RequestOptions,
) {
  return request<Dealer.CustomerUserPasswordResult>(
    `dealer/user/userPassword`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ...body,
      },
      ...(options || {}),
    },
  );
}