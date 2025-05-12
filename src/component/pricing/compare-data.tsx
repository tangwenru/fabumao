interface SoftPricingCompareDict{
  [ productType: string ]: Vip.TypeCompare[];
}

const Dict: SoftPricingCompareDict = {
  'remove-watermark': [
    { title: '单条去水印', vipLevel1: true, vipLevel12: true, vipLevel100: true },
    { title: '境外视频去水印', vipLevel1: true, vipLevel12: true, vipLevel100: true },
    { title: '下载封面', vipLevel1: true, vipLevel12: true, vipLevel100: true },
    { title: '下载文案', vipLevel1: true, vipLevel12: true, vipLevel100: true },
    { title: '视频转音频', vipLevel1: true, vipLevel12: true, vipLevel100: true },
    { title: '音视频转文案', vipLevel1: true, vipLevel12: true, vipLevel100: true },
    { title: '主页批量去水印', vipLevel1: false, vipLevel12: true, vipLevel100: true },
    { title: '万能音视频嗅探', vipLevel1: false, vipLevel12: true, vipLevel100: true },
    { title: '售后客服支持',vipLevel1: false, vipLevel12: true, vipLevel100: true },
    { title: '账户数量', vipLevel1: <>1<small>个</small></>, vipLevel12: <>1<small>个</small></>, vipLevel100: <><strong>6+</strong><small>个</small></> },
  ],
  'move-video': [
    { title: '单条去水印', vipLevel1: true, vipLevel12: true, vipLevel100: true },
    { title: '境外视频去水印', vipLevel1: true, vipLevel12: true, vipLevel100: true },
    { title: '下载封面', vipLevel1: true, vipLevel12: true, vipLevel100: true },
    { title: '下载文案', vipLevel1: true, vipLevel12: true, vipLevel100: true },
    { title: '视频转音频', vipLevel1: true, vipLevel12: true, vipLevel100: true },
    { title: '音视频转文案', vipLevel1: true, vipLevel12: true, vipLevel100: true },
    { title: '主页批量去水印', vipLevel1: false, vipLevel12: true, vipLevel100: true },
    { title: '万能音视频嗅探', vipLevel1: false, vipLevel12: true, vipLevel100: true },
    { title: '售后客服支持',vipLevel1: false, vipLevel12: true, vipLevel100: true },
    { title: '账户数量', vipLevel1: <>1<small>个</small></>, vipLevel12: <>1<small>个</small></>, vipLevel100: <><strong>6+</strong><small>个</small></> },
  ],
  'mixed-cut': [
    { title: '售后客服支持',vipLevel1: false, vipLevel12: true, vipLevel100: true },
    { title: '账户数量', vipLevel1: <>1<small>个</small></>, vipLevel12: <>1<small>个</small></>, vipLevel100: <><strong>6+</strong><small>个</small></> },

  ],
  'chatgpt': [
    { title: '售后客服支持',vipLevel1: false, vipLevel12: true, vipLevel100: true },
    { title: '折扣',vipLevel1: false, vipLevel12: true, vipLevel100: true },
  ],
  'video-template': [


    { title: '使用 基础模板',vipLevel1: true, vipLevel12: true, vipLevel100: true, vipLevel200: true, vipLevel300: true, vipLevel400: true },
    { title: '使用 高级模板',vipLevel1: false, vipLevel12: true, vipLevel100: true, vipLevel200: true, vipLevel300: true, vipLevel400: true },
    { title: '处理 本地视频',vipLevel1: true, vipLevel12: true, vipLevel100: true, vipLevel200: true, vipLevel300: true, vipLevel400: true },
    { title: '处理 远程视频链接',vipLevel1: false, vipLevel12: true, vipLevel100: true, vipLevel200: true, vipLevel300: true, vipLevel400: true },

    { title: '售后客服支持',vipLevel1: false, vipLevel12: true, vipLevel100: true, vipLevel200: true, vipLevel300: true, vipLevel400: true },
    { title: '是否支持云端渲染',vipLevel1: false, vipLevel12: false, vipLevel100: true, vipLevel200: true, vipLevel300: true, vipLevel400: true },
    { title: '线上系统培训讲解', vipLevel1: false, vipLevel12: false, vipLevel100: false, vipLevel200: true, vipLevel300: true, vipLevel400: true  },
    { title: '使用 GPT 4.0',vipLevel1: false, vipLevel12: false, vipLevel100: false, vipLevel200: false, vipLevel300: true, vipLevel400: true },
    { title: '高级模板定制',vipLevel1: false, vipLevel12: false, vipLevel100: false, vipLevel200: false, vipLevel300: true, vipLevel400: true },
    { title: '高性能渲染服务器', vipLevel1: false, vipLevel12: false, vipLevel100: false, vipLevel200: false, vipLevel300: true, vipLevel400: true  },
    { title: '上门系统培训讲解', vipLevel1: false, vipLevel12: false, vipLevel100: false, vipLevel200: false, vipLevel300: false, vipLevel400: true  },

  ]
};

const SoftPricingCompareData = ( productType?: Product.ProductType ) => {
  if( ! productType ){
    return [];
  }
  return Dict[ productType ] || [];
}

export default SoftPricingCompareData;
