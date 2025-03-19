import getLocalUserInfo from "./getLocalUserInfo";
import store from "./store";
import toast from "./toast";
import event from "./event";

const Logout = () => {
  if( typeof window === 'undefined'){
    return;
  }

  store.set('user-info', {
    ...getLocalUserInfo(),
    sid: '',
    nickname: '',
    isLogin: false,

  });
  toast('已经安全退出');
  // 广播；
  event.off('logout');
  setTimeout(() => {
    window.document.location.href = '/';
  }, 1e3 )
}

export default Logout;
