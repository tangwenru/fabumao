import React, { useEffect, useState } from 'react';
import { Result} from 'antd';
import LayoutContent from '@/ui/LayoutContent';
import styles from './agent.less';
import Platform from "@/component/platform";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";
import MakeQrImage from "@/lib/makeQrUrl";

const UserVipListAgent: React.FC = ({}) => {
  const [ siteInfo, setSiteInfo ] = useState( getLocalSiteInfo() );
  useEffect(() => {
    setSiteInfo( getLocalSiteInfo()  );
  }, []);
  return (
    <div className={styles.agent}>
      <LayoutContent
        // loading={ loading }
        // error={ error }
        // onReload={ run }
        // title="购买会员"
      >
        <Result
          title="代理权益"
          children={(
            <div>
              <p>
                会员自身就可以推广赚钱，但代理的推广权限更多、收益非常丰厚！
              </p>
              <p>具体咨询您的经销商</p>
              <p className={ styles.qrImageBox }>
                <MakeQrImage
                  className={ styles.qrImage }
                  url={ siteInfo.dealerWeContactQrUrl }
                  fgColor="#0bc160"
                  size={ 500 }
                ></MakeQrImage>
                <div className={ styles.qrScanAlt }>
                  {  Platform.isH5 ? '截图，微信扫一扫' : '打开微信扫一扫'}
                </div>
              </p>
            </div>
          )}
        />
      </LayoutContent>
    </div>
  );
};

export default UserVipListAgent;
