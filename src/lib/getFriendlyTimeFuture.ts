const getFriendlyTimeFuture = ( millisecond = 0 ) => {
  // 换算为 秒
  const second = Math.abs( millisecond * 0.001 );
  let out = '';
  if( second < 5 ){
    out = `马上`;
  }else if( second < 60){
    out = `${ second }秒`;
  }else if (second < 60 * 60) {
    out = `${(second / 60).toFixed(0)}分钟`;
  } else if (second < 24 * 3600) {
    out = `${(second / 3600).toFixed(0)}小时`;
  } else if (second < 30 * 24 * 3600) {
    out = `${(second / (24 * 3600)).toFixed(0)}天`;
  } else if (second < 12 * 30 * 24 * 3600) {
    out = `${(second / (30 * 24 * 3600)).toFixed(0)}个月`;
  } else {
    out = `${(second / (12 * 30 * 24 * 3600)).toFixed(1)}年`;
  }

  if( second < 0 ){
    return out + '前';
  }else if( second > 0 ){
    return out + '后';
  }else{
    return out + '现在';
  }

}

export default getFriendlyTimeFuture;