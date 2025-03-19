import React, {useEffect} from 'react';
import PageContentWarp from "@/ui/PageContentWarp";
import getQuery from "@/lib/getQuery";
import setLocalUserInfo from "@/lib/setLocalUserInfo";
import {go} from "@/lib";

export default function Jump() {
  const onInit = () => {
    const sid = getQuery('sid');
    const path  = getQuery('path') || '/';

    if( sid?.length > 10 ){
      setLocalUserInfo({
        isLogin: true,
        sid,
      });
    }

    go( path );
  }
  
  useEffect(() => {
    onInit();
  }, []);
  return (
    <PageContentWarp
      loading={ true }
    >

    </PageContentWarp>
  );
}
