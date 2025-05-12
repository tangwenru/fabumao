import request from '@/lib/Request';

export async function create(
  body: {
    targetUserId: number;
    canBuyVipCard: boolean;
  },
  options?: Global.RequestOptions,
) {
  return request<UserPermission.Create>(
    `dealer/userPermission/create`,
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
  body?: { },
  options?: Global.RequestOptions,
) {
  return request<UserPermission.Detail>(
    `user/userPermission/detail`,
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

