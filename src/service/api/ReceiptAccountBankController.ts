import request from "@/lib/Request";

export async function bindBankCard(
  body: Withdraw.BindBankCardQuery,
  options?: Global.RequestOptions,
) {
  return request<Withdraw.ListData>(
    `user/receiptAccountBank/create`,
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


export async function bankCardDetail(
  body?: {},
  options?: Global.RequestOptions,
) {
  return request<ReceiptAccountBank.Detail>(
    `user/receiptAccountBank/detail`,
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