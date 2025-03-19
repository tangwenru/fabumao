import request from '@/lib/Request';


export async function list(
  body: {
    cityCode: string;
  },
  options?: Global.RequestOptions,
) {
  return request<Region.ListResult>(`region/cityChild`, {
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
    areaCode: number;
  },
  options?: Global.RequestOptions,
) {
  return request<Region.Detail>(`region/detail`, {
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




export async function allCity(
  body?: {
  },
  options?: Global.RequestOptions,
) {
  return request<Region.AllCity[]>(`../region/allCity`, {
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
