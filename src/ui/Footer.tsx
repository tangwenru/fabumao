import React, { useState } from 'react';
import {Divider, QRCode, Space, theme } from 'antd';
import styles from './Footer.module.scss';
import packageJson from '../../package.json';
import getWebTitle from "@/lib/getWebTitle";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";
import {go} from "@/lib";

const Footer = () => {
  const [ nowYear ] = useState( ( new Date() ).getFullYear() );
  // const appInitData = useAppInitData();
  const [ siteInfo, setSiteInfo ] = useState( getLocalSiteInfo() );
  const onGo = ( path: string ) => {
    go( path );
  }
  return (
    <div className={ styles.footer }>
      <div className="page-warp">
        <div className={ styles.items }>
          <div className={styles.left}>
            <p>
              <Space size={18}>
                <a href="/website/privacy-statement" title={`${siteInfo.webTitle}-隐私与安全`} target="_blank">
                  隐私与安全
                </a>
                <a href="/website/trademark" title={`${siteInfo.webTitle}-商标版权`} target="_blank">
                  商标版权
                </a>
                <a title={`${siteInfo.webTitle}-关于我们`} onClick={ () => onGo('/about-us') }>
                  关于我们
                </a>
              </Space>
            </p>

            <p>
              Copyright &copy; 2018 - {nowYear}{' '}
              <Divider type="vertical" className={styles.hr}/>
              {getWebTitle()}
            </p>

            <p className={styles.copyright}>
              {
                siteInfo.icp &&
                <a href="https://beian.miit.gov.cn/" target="_blank">{siteInfo.icp}</a>
              }
            </p>


            <p>
              <span className={styles.version}>
                版本 V{packageJson.version}
              </span>
            </p>

          </div>
          <div className={styles.right}>
            {
              ! siteInfo.disabledContact &&
              <div className={styles.qrCode}>
                <QRCode
                  value={siteInfo.domainUserWeContactQrUrl || siteInfo.dealerWeContactQrUrl || siteInfo.adminWechatQr}
                  color="#29ae67"
                  bgColor="#F5F5F5"
                  size={110}
                  bordered={false}
                  errorLevel="M"
                />
                <div className={styles.alt}>
                  微信扫码 联系我
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
