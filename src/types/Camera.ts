declare namespace Camera{
  type ListVideoPushRateKind = 'hour' | 'minute' ;
  type WorkStatus = 'progress' | 'fail' | 'connecting' | 'not-verify';
  type SourceDataForm = 'camera' | 'camera-platform' | 'photo';

  interface ListResult{
    list: List[];
    pagination: Global.Pagination;
  }
  interface List{
    id: number;
    customerOrganizationId:number;
    shopId: number;
    name: string;
    enabled: boolean;
    sourceDataForm:   SourceDataForm,
    detectionRuleIdList: number[],
    workStatus: WorkStatus;
    listVideoPushRate: ListVideoPushRate[];
    serialNo: string;
    created: number;
    updated: number;
  }


  interface Detail{
    id: number,
    customerOrganizationId: number,
    shopId: number,
    name: string,
    enabled: boolean;
    sourceDataForm:   SourceDataForm,
    detectionRuleList: DetectionRule.List[],
    listVideoPushRate: ListVideoPushRate[];
    created: number;
  }

  interface CreateVideoPushRateQuery{

  }

  interface ListVideoPushRate{
    _key?: string;
    startTime: number;
    endTime: number;
    rateKind: ListVideoPushRateKind;  //
    imageCount: number;
    enabled: boolean;
  }

  interface ListQuery{
    shopId: number;
  }

  interface CreateQuery{
    id: number;
  }

  interface BaseInfo{
    "id": number;
    "name": string;
    "enabled": boolean;
  }

  interface UpImageResultQuery{
    cameraId: number;
    imageUrl: string;
    videoUrl: string;
  }
}
