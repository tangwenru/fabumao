import request from '@/lib/Request';
export async function list(
  body: {
    targetTypeId: number;
    keyword: string;
    used: string;

    current: number;
    pageSize: number
  },
  options?: Global.RequestOptions,
) {
  return request<VipCard.ListData>(
    `user/vipCard/list`,
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

export async function listKind(
  body?: {},
  options?: Global.RequestOptions,
) {
  return request<VipCard.ListKind[]>(
    `user/vipCard/kindList`,
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

export async function activate(
  body: {
    vipCardCode: string;
  },
  options?: Global.RequestOptions,
) {
  return request<VipCard.List[]>(`user/vipCard/activate`, {
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


export async function editRemark(
  body: {
    id: number;
    remark: string;
  },
  options?: Global.RequestOptions,
) {
  return request<VipCard.List>(
    `user/vipCard/editRemark`,
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

// export async function createOrder(
//   body: VipCard.CreateOrder,
//   options?: Global.RequestOptions,
// ) {
//   return request<VipOrder.ListData>(
//     `user/vipCardOrder/CreateOrder`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data: {
//         ...body,
//       },
//       ...(options || {}),
//     },
//   );
// }

