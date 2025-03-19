
const param = ( query: Object = {} ) => {
  const queryString = [];
  for (const i in query) {
    // @ts-ignore
    queryString.push(`${i}=${encodeURIComponent(query?.[i])}`);
  }
  return queryString.join('&');
}

export default param;