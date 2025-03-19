import { Drawer, ConfigProvider } from 'antd';

import React, { useState, useEffect } from 'react';
import styles from './DialogDrawer.module.scss';
import event from "@/lib/event";

interface Props {
  onClose?: any;
  content?: any;
}

// 抽屉
const DialogDrawer: React.FC<Props> = (props: any) => {
  const state = {
    id: '',
    title: '提示',
    visible: true,
    placement: 'right',
    closable: true,
    content: '',
    width: 400,
    maskClosable: false,
    onClose() {},
    bgTheme: '', // 'light' , "",
    ...props,
  };

  // 宽度
  state.width = Math.min( state.width, typeof window !== 'undefined' ? window.innerWidth : 0 );

  // 管理 显示隐藏
  const [visible, setVisible] = useState(true);

  // 关闭
  const onClose = () => {
    setVisible(false);
    if (typeof props.onClose === 'function') {
      props.onClose();
    }
  };

  const componentWillUnmount = () => {
    event.off(`drawer-close.${state.id}`);
  };

  useEffect(() => {
    event.on(`drawer-close.${state.id}`, () => {
      onClose();
    });

    return componentWillUnmount;
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#722ED1',
        },
      }}
    >
    <Drawer
      {...state}
      className={ `${ styles.drawerDialog } ${ styles[ state.bgTheme ] } ` }
      destroyOnClose={ true }
      title={state.title}
      placement={state.placement}
      closable={state.closable}
      onClose={() => onClose()}
      open={visible}
      width={state.width}
    >
      {props.content}
    </Drawer>

    </ConfigProvider>
  );
};

export default DialogDrawer;
