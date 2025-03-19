import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import './PageLoading.module.scss';

interface Props{
  isHide?: boolean;
  type?: string;
  height?: string | number;
  title?: React.ReactNode;
}
const PageLoading: React.FC<Props>
  = ({
       isHide,
       type= '',
       height,
       title,
     }) => {
  return (
    <div className={  'page-load-ing '+ ( isHide ? '' : 'show' ) +' '+ ( 'type-'+ type )  } style={{ height : height || 'auto' }} >
      <LoadingOutlined />
      <p>{ title || '努力加载中...'}</p>
    </div>
  );
}

export default PageLoading;
