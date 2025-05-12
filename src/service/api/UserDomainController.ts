import request from '@/lib/Request';

export async function list(body?: {}, options?: Global.RequestOptions) {
  return request<UserDomain.ListResult>(
    `user/userDomain/list`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        ...body,
      },
      ...(options || {}),
    },
  );
}

export async function save(
  body: {
    domainList: UserDomain.List[];
  },
  options?: Global.RequestOptions,
) {
  return request<true>(`user/userDomain/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...body,
    },
    ...(options || {}),
  });
}


export async function checkDomain(
  body: {
    domain: string;
    protocol: string;
    productType: string;
  },
  options?: Global.RequestOptions) {
  return request<UserDomain.CheckDomainResult>(`userDomain/checkDomain`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...body,
    },
    ...(options || {}),
  });
}
