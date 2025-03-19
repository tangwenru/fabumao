import React from 'react';
import { Popover, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import styles from './Hash.module.scss';
import toast from "@/lib/toast";
import getHashShow from "@/lib/getHashShow";

interface Props{
  title?: React.ReactNode | string;
  content: string | number;
  maxLength?: number;
  isPre?: boolean;
  showType?: 'popover' | 'inline';
}

const Hash: React.FC<Props>
  = ({
       title,
       content,
       maxLength = 25,
       isPre = false,
       showType = 'popover',
     }) => {

  const id = `hashCopy-${Math.random().toString(36).substr(2)}`;

  const onCopy = () => {
    const e: HTMLElement | null = document.getElementById(`${ id }`);
    if( e ){
      // @ts-ignore
      e?.select();
      document.execCommand('Copy');
      toast('已经复制到剪切板');
    }
  }


  return (
    <>
      {showType === 'popover' ? (
        <Popover
          content={(
            <div className={styles['popover-content']}>
              {
                isPre ?
                  <pre>{content}</pre>
                  :
                  content
              }
            </div>
          )}
          title={
            <div className={styles['popover-contract-hash-title']}>
              {title}
              <a onClick={(e) =>  onCopy() }>复制</a>
              <br />
            </div>
          }
        >
          {content && <span>{ getHashShow(`${ content }`, maxLength)}</span>}
        </Popover>
      ) : (
        <>
            <span className={styles['popover-contract-hash-inline']}>
              <span className={styles['content-box']}>{content}</span>
              { content && (
                <Tooltip title="点击复制">
                  <a className={styles['content-copy']} onClick={(e) => onCopy()}>
                    <CopyOutlined />
                  </a>
                </Tooltip>
              )}
            </span>
        </>
      )}

      <textarea
        className={styles.textarea}
        onChange={(e) => {}}
        id={`${ id }`}
        value={`${ content }`}
      >{ content}</textarea>
    </>
  );
}

export default Hash;
