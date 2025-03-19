declare namespace UserDomain {
  interface ListResult{
    list: List[];
    defaultPrimaryDomain: string;
    cnameDomain: string;
  }
  interface List {
    id: number;
    domain: string;
    icp?: string;
    created?: number;
    updated?: number;
  }
}
