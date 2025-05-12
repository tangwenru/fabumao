import request from '@/lib/Request';
export async function list(
  body: {
    friendType: 'down0' | 'down1' | '';
    day: string;
    current: number;
    pageSize: number
  },
  options?: Global.RequestOptions,
) {
  return request<Invite.ListData>(
    `user/invite/list`,
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
