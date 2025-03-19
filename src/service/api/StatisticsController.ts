import request from '@/lib/Request';
export async function financeMonth(
  body: {
    month: string;
  },
  options?: Global.RequestOptions,
) {
  return request<Statistics.FinanceMonth>(
    `user/statistics/financeMonth`,
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
