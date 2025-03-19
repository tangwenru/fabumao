declare namespace Region{
  // interface ListResult{
  //   list: List[];
  //   openAreaCodeList: number[];
  // }
  interface List{
    id: number;
    level: 1 | 2 | 3 | 4 | 5,
    parentCode: number,
    areaCode: number,
    zipCode: number,
    cityCode: string; // 0943,
    name: string;// 白银市,
    shortName: string;//白银,
    mergerName: string;//甘肃,白银,
    pinyin:string;// BaiYin,
    lng: number;// 104.138559,
    lat: number;//36.544756
  }
  interface Detail extends List{
    // fencePolygonPathList: Map.PolygonPathList[];
  }

  interface AllCity{
    value: number;
    label: string;
    children?: AllCity[];
  }

  interface RegionAreaInfo{
    level: number;
    areaCode: number;
    name: string;
    shortName: string;
    mergerName: string;
  }
}
