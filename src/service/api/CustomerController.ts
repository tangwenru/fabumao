import request from '@/lib/Request';
export async function list(
  body: {
    current: number;
    pageSize: number;
  },
  options?: Global.RequestOptions,
) {
  return request<Customer.ListResult>(`user/user/list`, {
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
    body: {
      current: number;
      pageSize: number;
    },
    options?: Global.RequestOptions,
) {
  return request<Customer.ListResult>(`user/user/create`, {
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
      customerId: number;
    },
    options?: Global.RequestOptions,
) {
  return request<Customer.ListResult>(`user/user/detail`, {
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
