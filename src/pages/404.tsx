import {useEffect, useState} from "react";
import styles from './404.less';
import {
  Button,
  Result,
} from 'antd';
import PageContentWarp from "@/ui/PageContentWarp";
import onInviteIn from "@/lib/inInviteIn";
import { Link } from '@umijs/max';
import go from "@/lib/go";

export default function Index404() {
  const [ loading, setLoading ] = useState( true );
  const onInit = () => {

    // 推广链接；
    const pathInfo = global.document?.location?.pathname.match( /^\/\.([a-z0-9]+)\/?/i );
    if( pathInfo ){
      onInviteIn( pathInfo[ 1 ] );
      // Tool.go('/?i='+ pathInfo[ 1 ] );
      go('/' );
      // return;
    }
    setLoading( false );
  }
  useEffect(() => {
    onInit();
  }, []);
  return (
    <PageContentWarp
      loading={ loading }
      className={ styles.page404 }
    >
      <Result
        status="403"
        title="404"
        subTitle="对不起，您访问的页面不存在呀"
        extra={(
          <Link to="/">
            <Button type="primary" key="home">
              返回首页
            </Button>
          </Link>
        )}
      />
    </PageContentWarp>
  );
}
