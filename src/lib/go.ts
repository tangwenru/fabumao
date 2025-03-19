import param from "@/lib/param";
import { history } from '@umijs/max';
// import { history } from 'umi';

const go = (path: string | number = '', paramQuery = {}) => {
  if (typeof path === 'number') {
    history.go(path);
    return '';
  } else if (!path) {
    path = document.location.pathname;
  }

  if ( param( paramQuery )) {
    path = path + (path.indexOf('?') === -1 ? '?' : '&') + param( paramQuery );
  }

  history.push(path);
  console.log('go path:', path );
  return path;
}
export default go;