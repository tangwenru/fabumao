import React from 'react';
import { Tooltip } from "antd";
import styles from './FileSize.module.scss';

interface Props{
  fileSize?: number;
}

export const FileSizeFormat = ( fileSize?: number ) => {
  fileSize = fileSize || 0;
  let data = {
    dom: <></>,
    unit: '',
    num: 0,
  };
  if( fileSize >= 1024 * 1024 * 1024 ){
    data.num = parseFloat( ( fileSize / ( 1024 * 1024 * 1024 ) ).toFixed( 2 ) );
    data.unit = 'GB'
  }else if( fileSize >= 1024 * 1024  ){
    data.num = parseFloat( ( fileSize / ( 1024 * 1024 ) ).toFixed( 2 ) );
    data.unit = 'MB'
  }else if( fileSize >= 1024  ){
    data.num = parseFloat( ( fileSize / ( 1024 * 1024 ) ).toFixed( 2 ) );
    data.unit = 'KB';
  }else{
    data.num = fileSize;
    data.unit = 'B';
  }

  data.dom = (
    <>
      { data.num } <span className={ styles[ data.unit.toLocaleLowerCase() ] }>{ data.num }</span>
    </>
  ) ;
  return data;
}

const FileSize: React.FC<Props>
  = ({
       fileSize = 0,
     }) => {
  return (
    <Tooltip title={ fileSize }>
      <span className={ styles.fileSize }>{ FileSizeFormat( fileSize ).dom }</span>
    </Tooltip>
  );
}
export default FileSize;
