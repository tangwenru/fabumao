import React from 'react';
import {  Modal } from 'antd';

interface PageDialogQuery{
  icon?: string;
  isFullPage?: boolean;
  closable?: boolean;
  isHideClose?: boolean;
  maskStyle?: {},
  keyboard?: boolean;
  cancelText?: React.ReactNode;
  className?: string;
  content: React.ReactNode;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  okText?: React.ReactNode;
  title?: React.ReactNode;
  width: string | number;
  onCancel?: () => void;
  onOk?: () => void;
  afterClose?: () => void;
}

if( typeof window !== 'undefined'){
  if( ! window._pageDialogBox ){
    window._pageDialogBox = [];
  }
}

const pageDialog = ( opt: PageDialogQuery ) => {
  opt = {
    icon : ' ',
    isFullPage: false,
    closable: true, // 似乎无效了
    isHideClose: false,
    maskStyle:{},
    keyboard: true,
    cancelText : '',
    className : ' ',
    maskClosable : false,
    destroyOnClose: true,
    okText : '',
    title  : '',
    onCancel : () => {},
    onOk : () => {},
    afterClose: () => {},
    ...opt,
  };

  if( opt.isFullPage ){
    opt.className += ' _page_dialog_full_ ';
    // opt.maskStyle.display = 'none';
    // opt.closable = false;
    opt.keyboard = false;
  }

  if( opt.isHideClose ){
    opt.className += ' _page_dialog_full_ _hide_close_ ';
  }

  opt.className += ' _page_dialog_ ';

  if( ! opt.okText && ! opt.cancelText ){
    opt.className += ' no-confirm-btns ';
  }

  // console.log('dialog opt ：', opt.afterClose?.toString() );

  // opt?.afterClose?.();

  let box = Modal.info( opt );
  window._pageDialogBox.push( box );

  return box;
}

export const pageDialogCloseAll = () => {
  window._pageDialogBox.forEach( (item, i) => {
    if( item && item.destroy ){
      item.destroy();
    }
    window._pageDialogBox.splice( i, 1 );
  });
}

export default pageDialog;
