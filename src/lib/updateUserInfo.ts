import * as UserController from "@/service/api/UserController";
import setLocalUserInfo from "@/lib/setLocalUserInfo";
import getLocalUserInfo from "@/lib/getLocalUserInfo";

const updateUserInfo = async () => {
  const userInfo = getLocalUserInfo();
  if( ! userInfo.isLogin ){
    console.log('updateUserInfo not login!');
    return;
  }
  const result = await UserController.getInfo().catch( err => {

  });
  if( result  ){
    setLocalUserInfo({
      ...userInfo,
      ...result,
      isLogin: true,
    });
  }
}

export default updateUserInfo;