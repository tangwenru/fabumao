import request from '@/lib/Request';
export async function list(
  body: {
    current: number;
    pageSize: number;
  },
  options?: Global.RequestOptions,
) {
  return request<Industry.ListResult>(`industry/list`, {
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
    id: number;
  },
  options?: Global.RequestOptions,
) {
  return request<Industry.Detail>(`industry/detail`, {
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

export async function create(
  body: Industry.CreateQuery,
  options?: Global.RequestOptions,
) {
  return request<Industry.List[]>(`industry/create`, {
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
