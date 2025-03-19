import request from '@/lib/Request';

export async function detail(
  body?: {},
  options?: ServicesApi.RequestOptions,
) {
  return request<UserDealer.Detail>(
    `dealer/userDealer/detail`,
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
