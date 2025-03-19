const getWebDomain = ( url: string = '' ): string => {
  // 'http://localhost:3000/product/remove-watermark/download',
  if( url?.match(/^[_a-z0-9-.]+$/i) ){
    return url;
  }

  const domain = url?.match(/https?:\/\/([^?/]+)/)?.[1] || '';

  return domain.split(':')?.[0] || '';
}

export default getWebDomain;