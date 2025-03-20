import store from "./store";

const getLocalUserInfo = () => {
  const storageCustomerInfo: User.UserInfo = {
    id: 0,
    sid: '',
    shareId: '',
    nickname: '',
    accountName: '',
    isLogin: false,
    avatarUrl: '',
    canWithdraw: 0,
    ...store.get('user-info'),
  };
  storageCustomerInfo.avatarUrl = storageCustomerInfo.avatarUrl || 'https://fafamao.oss-cn-chengdu.aliyuncs.com/image/logo.png'
  return storageCustomerInfo;
}

export default getLocalUserInfo;