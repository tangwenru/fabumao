import React from 'react';
import { Button, Result } from 'antd';
import styles from './LoadError.module.scss';
import { MehOutlined } from '@ant-design/icons';

interface Props {
  title ?: string,
  code?: string;
  subTitle?: string;
  onReload ?: ( e? : any ) => void;
}

const LoadError: React.FC<Props>
  = ({
       title= '似乎遇到了一些问题, 请稍后重试',
  code = '',
       subTitle,
       onReload= '',
     }) => {

  const getTitle = (): string => {
    let outTitle = title === 'http error' ? '网络似乎有些问题' : title;
    if( code === 'not-login' ){
      outTitle = '请登录后查看';
    }
    return outTitle;
  }

  return (
    <div className={styles.loadError }>
      <Result
        icon={ <MehOutlined /> }
        title={ getTitle() }
        subTitle={ subTitle }
        extra={
          ( typeof onReload === 'function' && ! [ 'not-login' ].includes( code ) ) ? (
            <Button type="primary" onClick={(e) => onReload()}>
              重试
            </Button>
          ) : (
            ''
          )
        }
      />
    </div>
  );
};

export default LoadError;
