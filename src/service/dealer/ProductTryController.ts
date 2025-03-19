import request from '@/lib/Request';

export async function detail(
  body?: {},
  options?: ServicesApi.RequestOptions,
) {
  return request<DealerProductTry.Detail>(
    `dealer/productTry/detail`,
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


export async function list(
  body: {

    current: number;
    pageSize: number;
  },
  options?: ServicesApi.RequestOptions,
) {
  return request<DealerProductTry.ListResult>(
    `dealer/productTry/list`,
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
  body: DealerProductTry.Create,
  options?: ServicesApi.RequestOptions,
) {
  return request<boolean>(
    `dealer/productTry/create`,
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