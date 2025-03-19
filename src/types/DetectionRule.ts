declare namespace DetectionRule{
  interface ListResult{
    list: List[];
    pagination: Global.Pagination;
  }

  interface ListQuery{
    industryId: number;
    enabled: Global.SelectEnabled;
  }

  interface List{
    id: number;
    industryId: number;
    name: string; // 员工规范检测,
    require: string; // 识别工作人员制服穿戴与工牌佩戴,
    check: string; // 制服完整度≥90%+工牌可见,
    enabled: boolean
    created: number;
    updated: number;
    industryBaseInfo: Industry.BaseInfo;
  }

  interface CreateQuery{

  }

  interface Detail{

  }

  interface TestPromptCreate{
    systemPrompt: string;
    selectIdList: number[];
    model: string;
  }

  interface BaseInfo{
    "id": number;
    "name": string; // "环境卫生状态",
    "require": string; // "检测地面/桌面可见垃圾、水渍、油污",
    "check": string
  }


}
