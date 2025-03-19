const getQuery = (name: string, url = '') => {
  const u =
      url ||
      ( typeof window !== 'undefined' ? window.location.search.replace('?', '') : '' ) ||
    ( typeof document !== 'undefined' ? document.location.hash.replace('#', '') : '' ),
    reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
    r = u.substr(u.indexOf('?') + 1).match(reg);
  return r != null ? decodeURIComponent(r[2]) : '';
}

export default getQuery;