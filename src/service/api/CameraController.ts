import request from "@/lib/Request";

export async function list(
  body: {
    shopId: number;
    current: number;
    pageSize: number;
  },
  options?: Global.RequestOptions,
) {
  return request<Camera.ListResult>(`user/camera/list`, {
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

export async function detail(
  body: {
    shopId: number;
    id: number;
  },
  options?: Global.RequestOptions,
) {
  return request<Camera.Detail>(
    `user/camera/detail`,
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


export async function create(
  body: Camera.CreateQuery,
  options?: Global.RequestOptions,
) {
  return request<Camera.CreateQuery>(
    `user/camera/create`,
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




export async function upImageResult(
  body: Camera.UpImageResultQuery,
  options?: Global.RequestOptions,
) {
  return request<Camera.CreateQuery>(
    `user/camera/upImageResult`,
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
