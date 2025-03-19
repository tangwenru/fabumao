import React, { useState  } from 'react';
import { Auth as AuthShipinlv } from 'component-shipinlv';
import {useRequest} from "@umijs/hooks";
import * as SiteController from "@/service/api/SiteController";
import PageContentWarp from "@/ui/PageContentWarp";
import {store} from "@/lib";
import {getBaseConfigEnv, getBaseConfigItemApi} from "../../../web-base-config";

interface Props{
  onSuccess: () => void;
}
const Auth: React.FC<Props>
  = ({
       onSuccess = () => {},
     }) => {
  const [ loginTypeList, setLoginTypeList ] = useState<string[]>([]);
  const [ isLoad, setIsLoad ] = useState( false );
  const {
    loading,
    error,
    run,
  } = useRequest(() => SiteController.info({
    domain: document.location.hostname,
    inviteUserId: store.get('inviteUserId') || 1,
  }), {
    onSuccess(data) {
      setLoginTypeList( data.loginType );
      setIsLoad( true );
    },
  });

  return (
    <PageContentWarp
      loading={ loading || ! isLoad }
      error={ error }
      onReload={ run }
    >
      {
        isLoad &&
        <AuthShipinlv
          apiUrl={getBaseConfigItemApi() + 'user/'}
          productType="fabumao"
          roleType="user"
          clientUniqueKeyList={[]}
          // loginTypeList={[ 'account', 'account-login']}
          // domain={ getBaseConfigDealerUrl() }
          env={getBaseConfigEnv()}
          onLoginSuccess={onSuccess}
          loginTypeList={loginTypeList}
          domain={document.location.hostname}
          postData={{}}
        />
      }
    </PageContentWarp>
  );
}

export default Auth;
