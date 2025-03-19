import React from 'react';
import styles from './PageContentWarp.module.scss';
import LoadError from './LoadError';
import { LoadingOutlined } from '@ant-design/icons';
import {Space} from "antd";

interface Props {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  minHeight?: number;
  loading?: boolean;
  loadingDom?: React.ReactNode;
  error?: Error | null;
  leftExtInfo?: React.ReactNode;
  extInfo?: React.ReactNode;
  children?: React.ReactNode;
  errorNode?: (err: Error) => React.ReactNode;
  onReload?: () => void;
}

const PageContentWarp: React.FC<Props> = ({
  title = '',
  className = '',
  minHeight = -1,
  loading = false,
                                            leftExtInfo = '',

                                            loadingDom = '',
  extInfo = '',
                                            subtitle,
  children,
  error,
  errorNode,
  onReload,
}) => {
  return (
    <div
      className={`${styles.pageContentBox} ${className}`}
      style={{ minHeight: minHeight > 0 ? minHeight : 'auto' }}
    >
      <div className={`${styles.pageTitle} ${ ! title && styles.noTitle } ${ ( !title && ! extInfo ) ? styles.noTitles : ''}`}>
        {title}

        <span className={styles.subtitle}>{subtitle}</span>

        <div className={styles.extInfo}>
          <Space size="middle">
            {Array.isArray(extInfo) ? <Space>{extInfo}</Space> : extInfo}
          </Space>
        </div>
      </div>
      {error ? (
        <>
          {errorNode && errorNode(error) ? (
            errorNode(error)
          ) : (
            <LoadError
              title={error.message}
              code={error.name}
              onReload={onReload}
            />
          )}
        </>
      ) : (
        <>
          {loading ? (
            (
              loadingDom ?
                loadingDom
                :
                <div className={`pageContentBoxLoading ${styles.loading}`}>
                  <LoadingOutlined />
                </div>
            )
          ) : (
            <>
              {leftExtInfo && (
                <div className={styles.leftExtInfo}>{leftExtInfo}</div>
              )}
              { children }
            </>
          )}
        </>
      )}
    </div>
  );
};
export default PageContentWarp;
