import getQuery from "@/lib/getQuery";
import store from "@/lib/store";

const onInviteIn = (inviteKey = '') => {
  if( ! inviteKey ){
    return;
  }
  // 邀请 id
  inviteKey = inviteKey || getQuery('i');
  const i = parseInt(inviteKey, 36 ) || 0;
  if (i > 0) {
    store.set('inviteUserId', i);
  }
}

export default onInviteIn;