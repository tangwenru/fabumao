import React from 'react';
import styles from './LayoutContent.module.scss';
import PageLoading from './PageLoading';
import { Space } from 'antd';
import LoadError from './LoadError';

interface Props {
  title?: React.ReactNode;
  loading?: boolean;
  subtitle?: React.ReactNode;
  className?: string;
  extInfo?: React.ReactNode;
  leftExtInfo?: React.ReactNode;
  children?: React.ReactNode;
  error?: Error | null;
  errorNode?: (err: Error) => React.ReactNode;
  isListEmpty?: boolean;
  onReload?: () => void;
}

const LayoutContent: React.FC<Props> = ({
  title = '',
  loading = false,
  subtitle,
  className = '',
  extInfo = '',
  leftExtInfo = '',
  children,
  error,
  errorNode,
                                          isListEmpty= false,
  onReload,
}) => {

  const loadingDom = () => {
    if( isListEmpty && loading ){
      return <PageLoading />;
    }else{
      return (
        <>
          {/*{*/}
          {/*  loading &&*/}
          {/*    <div className={ styles.loading }>*/}
          {/*        <div className={ styles.loadingWarp }>*/}
          {/*            <PageLoading />*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*}*/}
          {children }
        </>
      );
    }
  }

  return (
    <div className={`${styles.pageContentBox} ${className}`}>
      <div className={`${styles.pageTitle} ${ ( !title && ! extInfo  ) ? styles.noTitle : ''}`}>
        {title}

        <span className={styles.subtitle}>{subtitle}</span>

        <div className={styles.extInfo}>
          <Space size="middle">
            {Array.isArray(extInfo) ? <Space>{extInfo}</Space> : extInfo}
          </Space>
        </div>
      </div>
      <div className={styles.pageContentBoxWarp}>
        {leftExtInfo && (
          <div className={styles.leftExtInfo}>{leftExtInfo}</div>
        )}

        {error ? (
          <>
            {errorNode ? (
              errorNode(error)
            ) : (
              <LoadError title={error.message} onReload={onReload} />
            )}
          </>
        ) : loadingDom() }
      </div>
    </div>
  );
};
export default LayoutContent;
