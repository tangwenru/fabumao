const getFileExt = (fileUrl: string) => {
  let url = (fileUrl || '').split('?')[0].match(/\.([a-z0-9]+)$/i) || [];
  return url[1] || '';
}

export default getFileExt;
