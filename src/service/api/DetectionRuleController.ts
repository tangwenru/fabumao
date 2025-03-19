import request from '@/lib/Request';
export async function list(
  body?: {},
  options?: Global.RequestOptions,
) {
  return request<DetectionRule.ListResult>(
    `user/detectionRule/list`,
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
  body: DetectionRule.CreateQuery ,
  options?: Global.RequestOptions,
) {
  return request<DetectionRule.ListResult>(
    `user/detectionRule/create`,
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
  body: {
    id: number
  },
  options?: Global.RequestOptions,
) {
  return request<DetectionRule.Detail>(
    `user/detectionRule/detail`,
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
