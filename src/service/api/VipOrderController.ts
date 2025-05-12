import request from '@/lib/Request';
export async function list(
  params: {
    current: number;
    pageSize: number
  },
  options?: Global.RequestOptions,
) {
  return request<VipOrder.ListData>(
    `user/vipOrder/list`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
