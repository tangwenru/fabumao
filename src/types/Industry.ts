declare namespace Industry{
  interface BaseInfo{
    id?: number;
    name: string;
    color: string;
  }

  interface ListResult{
    list: List[];
    pagination: Global.Pagination;
  }

  interface List{
    id: number;
    name: string;
    enabled: boolean;
    color: string;
    updated?: number;
    created: number;
  }

  interface Detail extends List{

  }

  interface ListQuery{

  }

  interface CreateQuery{
    id: number;
    name: string;
    enabled: boolean;
    color: string;
  }
}
