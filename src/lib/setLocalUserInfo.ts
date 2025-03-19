import store from "./store";
import getLocalUserInfo from "./getLocalUserInfo";

const setLocalUserInfo = (data = {} ) => {
  const userInfo = {
    ...getLocalUserInfo(),
    ...data,
  };
  store.set('user-info', userInfo);
  return userInfo;
}

export default setLocalUserInfo;