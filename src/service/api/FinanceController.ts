import request from '@/lib/Request';
export async function list(
  params: {
    current: number;
    pageSize: number
  },
  options?: Global.RequestOptions,
) {
  return request<Finance.ListData>(
    `finance/list`,
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
