declare namespace ClientVersion {
  interface Detail {
    windows: DetailData;
    darwin: DetailData;
    linux?: DetailData;
    productDetail: Product.Detail;
  }

  interface DetailData {
    url: string; // https://www.yuque.com/alone.cat/douzhuli/app-download?singleDoc=,
    title: string; //新版本发布,
    content: string; //增加若干功能,
    version: string; // 1.0.0,
    versionReal: number; // 20221212102030,
    created: number; //  1671208527
  }

  interface List{
    id: number;
    url: string;
    dealerId: number;
    osType: Global.OsName;
    productType: string;
    title: string;
    content: string;
    version: string;
    versionReal: number;
    created: number;
  }
}