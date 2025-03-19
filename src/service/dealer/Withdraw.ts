declare namespace DealerWithdraw{


  interface ListData{
    list: List[],
    pagination: Pagination;
  }

  type Type = Withdraw.Type;

  interface List{
    id: number;
    money: number;
    status: Type;
    created: number;
    updated: number;
  }

  interface Verify{

  }

  interface Detail{
    id: number;
    userId: number;
    dealerId: number;
    money: number;
    staffId: number;
    status: Withdraw.Status,
    created: number;
    updated: number;
  }
}
