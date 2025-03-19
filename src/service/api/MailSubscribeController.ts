import request from '@/lib/Request';
export async function create(
  body: {
    mail: string;
    domain: string;
  },
  options?: Global.RequestOptions,
) {
  return request<Mail.Subscribe>(`mailSubscribe/create`, {
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
