import React, {useEffect, useState} from 'react';
import styles from './success.less';
import * as UserController from '@/service/api/UserController';
import {useRequest} from "@umijs/hooks";
import {Button, Result} from "antd";
import { WechatOutlined } from '@ant-design/icons';
import getLocalUserInfo from "@/lib/setLocalUserInfo";
import event from "@/lib/event";
import {getQuery, go} from "@/lib";

interface Props{
  children: React.ReactNode;
}

const WeChatLoginSuccess: React.FC<Props> = ({ children }) => {

  const {
    loading,
    error,
    run,
  } = useRequest(() => UserController.getInfo(), {
    manual: true,
    onSuccess(data) {
      setLocalUserInfo({
        ...data,
        isLogin: true,
      });
      // event.run('login-success');
      document.location.href = '/'
      // router.push( '/product' );
      // go('/')
    },
  });

  const onSuccess = async () => {
    const sid = getQuery('loginSid');
    setLocalUserInfo({
      sid,
      isLogin : true,
    });
    await run();
  }

  useEffect(() => {
    onSuccess();
  }, []);

  return (
    <div
      className={ styles.success }
    >
      <div className={ styles.pageIcon }>
        <WechatOutlined />
        <div className={ styles.alt }>正在登录，马上就好</div>
      </div>
      <div className={ styles.submits }>
        <Button
          loading={ loading }
          type="primary"
        >
          登录中...
        </Button>
      </div>
    </div>
  );
}

export default WeChatLoginSuccess;
