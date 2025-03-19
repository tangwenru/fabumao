import request from '@/lib/Request';

export async function list(
  body: {
    current: number;
    pageSize: number;
  },
  options?: ServicesApi.RequestOptions,
) {
  return request<DealerProductUserTry.ListResult>(
    `dealer/productUserTry/list`,
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
