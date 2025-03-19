
declare namespace Customer {
  type Role = 'manage' | 'area-manage' |  'store-manage' | 'clerk';
  interface CustomerInfo{
    id: number;
    role: Role;
    avatarUrl: string;
    gender: Global.Gender;
    nickname: string;
    phoneNumber: string;
    isLogin: boolean;
  }
  interface ListQuery{
    shopId: number;
    role: '' | Role;
    keyword: string;
  }

  interface ListResult{
    list: List[];
    pagination: Global.Pagination;
  }

  interface List{
    id: number;
    role: Role;
    avatarUrl: string;
    gender: Global.Gender;
    nickname: string;
    phoneNumber: string;
  }

  interface CreateQuery{

  }
}