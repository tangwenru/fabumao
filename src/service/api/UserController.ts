import request from '@/lib/Request';

export async function getInfo(body?: {}, options?: Global.RequestOptions) {
  return request<User.UserInfo>(`user/info`, {
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

export async function saveInfo(
  body: {
    nickname: string;
    gender: number;
    avatarKey: string;
  },
  options?: Global.RequestOptions,
) {
  return request<User.UserInfo>(`user/saveInfo`, {
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


export async function savePassword(
  body: {
    oldPassword: string;
    password: string;
  },
  options?: Global.RequestOptions,
) {
  return request<User.UserInfo>(`user/savePassword`, {
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


export async function saveWeQrUrl(
  body: {
    weQrUrl: string;
  },
  options?: Global.RequestOptions,
) {
  return request<User.UserInfo>(`user/saveWeQrUrl`, {
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

export async function getMyUpInfo(
  body?: {},
  options?: Global.RequestOptions,
) {
  return request<User.MyUpInfo>(`user/myUpInfo`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...body,
    },
    ...(options || {}),
  });
}

//
export async function userVipInfo(
  body?: {},
  options?: Global.RequestOptions,
) {
  return request<User.UserVipInfo[]>(
    `user/userVipInfo`,
    {
      method: 'GET',
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
