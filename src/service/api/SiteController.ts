import request from '@/lib/Request';
export async function info(
  params: {
    domain: string;
    inviteUserId: number; // 上级
  },
  options?: Global.RequestOptions,
) {
  return request<Site.BaseInfo>(
    `site/info`,
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
