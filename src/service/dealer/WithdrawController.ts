import request from '@/lib/Request';

export async function list(
  body: {
    current: number;
    pageSize: number;
  },
  options?: ServicesApi.RequestOptions,
) {
  return request<DealerWithdraw.ListData>(
    `dealer/withdraw/list`,
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

export async function detail(
  body: {
    withdrawId: number;
  },
  options?: ServicesApi.RequestOptions,
) {
  return request<DealerWithdraw.Detail>(
    `dealer/withdraw/detail`,
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


export async function verify(
  body: {
    withdrawId: number;
    isPass: boolean;
  },
  options?: ServicesApi.RequestOptions,
) {
  return request<DealerWithdraw.Verify>(
    `dealer/withdraw/verify`,
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
