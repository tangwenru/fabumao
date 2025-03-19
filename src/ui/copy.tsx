import React from 'react';
import styles from './copy.module.scss';
import {CopyOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import toast from "@/lib/toast";

interface Props{
  content: string | number;
  showCopyButton?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const CopyText = ( text: string | number ) => {
  const id = `_copy${Math.random().toString(36).slice(2)}`;
  const $textarea = document.createElement('textarea')
  $textarea.className = styles.copyContent;
  $textarea.id = id;
  $textarea.value = `${ text }`;
  $textarea.innerText = `${ text }`;
  document.body.append( $textarea );

  onCopy( id );

  setTimeout(() => {
    $textarea.remove();
  }, 300 )
}

const onCopy = ( id: string) => {
  console.log("copy!" )

  const e: HTMLTextAreaElement | null = document.querySelector(`textarea#${ id }`);
  console.log("e", e )
  if( e ){
    e?.select();
    document.execCommand('Copy');
    toast('已经复制到剪切板');
  }
}

const Copy: React.FC<Props>
  = ({
       children,
       content = '',
       className = '',
       showCopyButton = true,
     }) => {

  const id = `_copy${Math.random().toString(36).slice(2)}`;

  return (
    <>
      { content ?
        <span className={ className } onClick={ () => onCopy( id ) }><span className="children">{ children }</span> <Tooltip title="点击复制"><a className={ styles.copyIcon }><CopyOutlined /></a></Tooltip></span>
      :
        <span className={ className }>{ children }</span>
      }

      <textarea
        className={styles.copyContent}
        onChange={(e) => {}}
        id={`${ id }`}
        value={ content}
      >{ content}</textarea>
    </>
  );
}

export default Copy;
