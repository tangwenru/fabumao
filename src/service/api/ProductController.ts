import request from "@/lib/Request";
//
export async function detail(
  body: {
      productType: string,
  },
  options?: Global.RequestOptions,
) {
    return request<Product.Detail>(
      `product/detail`,
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
      domain: string;
      // inviteUserId: number; // 上级
  },
  options?: Global.RequestOptions,
) {
    return request<Product.List[]>(
      `product/list`,
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
