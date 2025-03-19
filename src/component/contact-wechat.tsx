import React, {useEffect, useState} from 'react';
import { Divider, Popover } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import Platform from "@/component/platform";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";
import MakeQrImage from "@/lib/makeQrUrl";
import event from "@/lib/event";

interface Props{
  qrType: '' | 'user'  | 'admin' | 'dealer';
  title?: React.ReactNode;
  size?: number;
  alertTitle?: React.ReactNode;
}
const ContactWechat: React.FC<Props>
  = ({
       qrType ,
       title = '',
       size = 120,
       alertTitle = '',
     }) => {
  const [ siteInfo, setSiteInfo ] = useState( getLocalSiteInfo());
  const [ weContactImageUrl, setWeContactImageUrl ] = useState('');
  const onImage = ( info = siteInfo ) => {
    let qrUrl = info.adminWechatQr;
    switch ( qrType ) {
      case 'dealer':
        qrUrl = info.dealerWeContactQrUrl;
        break;
      case 'user':
        qrUrl = info.domainUserWeContactQrUrl || info.dealerWeContactQrUrl;
        break;
    }
    // 为空
    qrUrl = qrUrl || info.adminWechatQr || '';
    setWeContactImageUrl( qrUrl );
  }

  const onClientInit = () => {
    const info = getLocalSiteInfo();
    setSiteInfo( info );
    onImage( info );
  }

  useEffect(() => {
    onClientInit();
    event.on('site-info.contact-admin', (siteInfo: Site.BaseInfo) => {
      setSiteInfo(siteInfo);
      onImage( siteInfo );
    });

    return () => {
      event.off('site-info.contact-admin');
    };
  }, []);

  return (
    weContactImageUrl ?
      <div
      >
        <div className={styles.contactAdmin}>
          <div
            className={styles.qr}
            style={{
              width: size,
              height: size,
              backgroundImage: `url('${weContactImageUrl || 'https://u.wechat.com/MDA8pNKUYg2YIqckdiImRFE'}')`,
            }}
          />
          <MakeQrImage url={weContactImageUrl} fgColor="#0bc160" size={ size }/>
          <p>
            {Platform.isH5 ? '截图，微信扫一扫' : '打开微信扫一扫'}
          </p>
        </div>
      </div>
      :
      ''
  )
}

export default ContactWechat;
