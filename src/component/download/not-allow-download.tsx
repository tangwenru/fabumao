import styles from './not-allow-download.less';
import React, {useEffect, useState} from 'react';

interface Props{
}

const SoftDownloadNotAllowDownload: React.FC<Props>
  = ({
     }) => {
  const [ isInWechat ] = useState( /MicroMessenger/i.test( navigator.userAgent ) );

  return (
    isInWechat &&
    <div
        className={ styles.notAllowDownload }
      >
      <div className={ styles.main }>
        微信浏览器不能下载，请使用其他浏览器
      </div>
    </div>
  );
}

export default SoftDownloadNotAllowDownload;
