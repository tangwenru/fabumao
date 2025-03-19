// 获取站点基本信息
import React, {useEffect, useState} from 'react';
import { useRequest } from '@umijs/hooks';
import * as SiteController from '@/service/api/SiteController';
import styles from './site.less';
import {WarningOutlined} from "@ant-design/icons";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";
import {store} from "@/lib";
import event from "@/lib/event";
import toastError from "@/lib/toastError";
import onInviteIn from "@/lib/inInviteIn";

const Site: React.FC = () => {
  const [ siteInfo, setSiteInfo ] = useState( getLocalSiteInfo() );
  const { run } = useRequest(
    () =>
      SiteController.info(
        {
          domain: document.location.hostname,
          inviteUserId: store.get('inviteUserId'),
        },
        { silent: true },
      ),
    {
      manual: true,
      onSuccess(siteInfo) {
        setSiteInfo(siteInfo);
        store.set('site-info', {
          ...siteInfo,
        });
        event.run('site-info', siteInfo);

        if (!siteInfo.isQueryDomainBind) {
          toastError('当前域名没有被绑定，请在管理页面绑定域名', 8);
        }
      },
    },
  );

  useEffect(() => {
    onInviteIn();

    console.log('site document.location.hostname:', document.location.hostname );
    run();
  }, [])

  return (
    <div>
      {
        siteInfo?.sitePause?.isPause &&
          <div className={ styles.sitePause }>
              <div className={ styles.contents}>
                <p>
                    <WarningOutlined className={ styles.alertIcon } />
                </p>
                { siteInfo?.sitePause.reason || '网站升级中...' }
              </div>
          </div>
      }
    </div>
  );
};

export default Site;
