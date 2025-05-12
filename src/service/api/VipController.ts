import request from '@/lib/Request';

export async function compare(
  body: {
    domain: string;
    productType: string;
  },
  options?: Global.RequestOptions,
) {
  return request<Vip.Compare>(
    `vip/compare`,
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


export async function listAll(
  params: {
    webDomain: string;
  },
  options?: Global.RequestOptions,
) {
  return request<Vip.ListAll[]>(
    `vip/listAll`,
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

export async function detail(
  params: {
    id: number;
  },
  options?: Global.RequestOptions,
) {
  return request<Vip.List>(
    `vip/detail`,
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
