import request from '@/lib/Request';
export async function detail(
  body: {
      productType: string;
      domain: string
  },
  options?: Global.RequestOptions,
) {
    return request<ClientVersion.Detail>(
      `clientVersion/lastDetail`,
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


export async function list(
  body: {
    osType: Global.OsName;
    productType: string;
    domain: string
  },
  options?: Global.RequestOptions,
) {
  return request<ClientVersion.List[]>(
    `clientVersion/list`,
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