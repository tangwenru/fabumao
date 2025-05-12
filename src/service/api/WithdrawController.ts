import request from '@/lib/Request';

export async function config(
  body?: {
  },
  options?: Global.RequestOptions,
) {
  return request<Withdraw.Config>(
    `user/withdraw/config`,
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


export async function apply(
  body: {
    wechatAppId: string;
  },
  options?: Global.RequestOptions,
) {
  return request<any>(
    `user/withdraw/apply`,
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


export async function list(
  body: {
    current: number;
    pageSize: number;
  },
  options?: Global.RequestOptions,
) {
  return request<Withdraw.ListData>(
    `user/withdraw/list`,
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

