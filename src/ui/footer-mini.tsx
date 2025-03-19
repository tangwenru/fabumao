import React, { useState } from 'react';
import {Divider, QRCode, Space, theme } from 'antd';
import styles from './footer-mini.less';
import packageJson from '../../package.json';
import getWebTitle from "@/lib/getWebTitle";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";
import {go} from "@/lib";

const FooterMini = () => {
  const [ nowYear ] = useState( ( new Date() ).getFullYear() );
  const [ siteInfo, setSiteInfo ] = useState( getLocalSiteInfo() );

  return (
    <div className={ styles.footer }>
      <div className="page-warp">
        <div className={ styles.items }>
          <div className={styles.left}>
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

          </div>
        </div>
      </div>
    </div>
  );
}
export default FooterMini;
