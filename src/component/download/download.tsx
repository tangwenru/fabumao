import styles from './download.less';
import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, ConfigProvider, Row, Space, Tabs} from "antd";
import {
  AppleOutlined,
  CaretRightOutlined, InfoCircleFilled, LinuxOutlined, WindowsOutlined,
} from "@ant-design/icons";
import {Link} from "@umijs/max";
import type { TabsProps } from 'antd';
import PageContentWarp from "@/ui/PageContentWarp";
import Contact from "@/component/contact";
import getLocalUserInfo from "@/lib/getLocalUserInfo";
import { useRequest } from '@umijs/hooks';
import * as VersionController from '@/service/api/VersionController';
import goTop from "@/component/goTop";
import drawer from "@/lib/drawer";
import ClientVersionList from "@/component/download/client-version-list";
import SoftDownloadNotAllowDownload from "@/component/download/not-allow-download";

interface Props{
  productType?: string;
  // productType: Global.ApiResult<ClientVersion.Detail>;
}

const SoftDownload: React.FC<Props>
  = ({
       productType= document.location.pathname.match(/\/product\/([a-z0-9-]+)\/download/i)?.[1] || '',
     }) => {
  const [ detailData, setDetailData ] = useState<ClientVersion.Detail>({
    windows: {
      url: '',
      title: '',
      content: '',
      version: '',
      versionReal: 0,
      created: 0,
    },
    darwin: {
      url: '',
      title: '',
      content: '',
      version: '',
      versionReal: 0,
      created: 0,
    },
    linux: {
      url: '',
      title: '',
      content: '',
      version: '',
      versionReal: 0,
      created: 0,
    },
    productDetail: {
      productType,
    }
  });
  const [ productDetail, setProductDetail] = useState( detailData?.productDetail ) ;
  const [ isLogin, setIsLogin ] = useState(false );

  const [ currentOs, setCurrentOs ] = useState('');
  const [ colSpan, setColSpan ] = useState( 6 );

  const items: TabsProps['items'] = [
    {
      key: 'windows',
      label: 'Windows',
      icon: <WindowsOutlined />,
      children: (
        <div className={ styles.tabsItem }>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: '#111',
                },
              },
            }}
          >
            <Space size={ 30 }>
              <a
                href={detailData?.windows?.url}
                // target={ isLogin ? '_blank' : '_self' }
                target="_blank"
                onClick={(e) => onDown(e)}
              >
                <Button type="primary" size="large" shape="round" disabled={!detailData?.windows?.url}>
                  下载最新版<span className={styles.ext}>.exe</span>
                </Button>
              </a>

              <Button type="link" onClick={ () => onHistoryList('windows') }>
                历史版本
              </Button>
            </Space>
          </ConfigProvider>

          <div
            className={styles.alert}
          >
            <Alert
              message={<>支持 Windows 10/11 操作系统</>}
              type="success"
              showIcon
              className={styles.windowAlert}
            />

            <div
              className={styles.windowAlertNotSupport}
            >
              <InfoCircleFilled className={ styles.warn } /> 不支持 Windows 7/8
            </div>
          </div>
        </div>
      ),
      forceRender: true,
    },
    {
      key: 'darwin',
      label: '苹果电脑 / MacOS',
      icon: <AppleOutlined />,
      children: (
        <div className={ styles.tabsItem }>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: '#087cfa',
                },
              },
            }}
          >
            <Space size={ 30 }>
              <a
                href={detailData?.darwin?.url}
                // target={isLogin ? '_blank' : '_self'}
                target="_blank"
                onClick={(e) => onDown(e)}
              >
                <Button type="primary" size="large" shape="round" disabled={!detailData?.darwin?.url}>
                  下载最新版<span className={styles.ext}>.dmg</span>
                </Button>
              </a>

              <Button type="link" onClick={() => onHistoryList('darwin')}>
                历史版本
              </Button>
            </Space>

            <div
              className={styles.alert}
            >
              <Alert
                message="支持Mac系列：Air / iMac / Mini / Pro / Studio / M1 / M2"
                type="success"
                showIcon
                className={styles.macAlert}
              />
            </div>
          </ConfigProvider>
        </div>
      ),
      forceRender: true,
    },
    {
      key: 'linux',
      label: 'Linux',
      icon: <LinuxOutlined />,
      children: (
        <div className={styles.tabsItem}>
          <Space size={ 30 }>
            <a
              href={detailData?.linux?.url}
              // target={ isLogin ? '_blank' : '_self' }
              target="_blank"
              onClick={(e) => onDown(e)}
            >
              <Button type="primary" size="large" shape="round" disabled={!detailData?.linux?.url}>
                下载最新版<span className={styles.ext}>.zip</span>
              </Button>
            </a>

            <Button type="link" disabled onClick={() => onHistoryList('darwin')}>
              历史版本
            </Button>
          </Space>

          <div
            className={styles.alert}
          >
            {
              detailData?.linux?.url ?
                <Alert
                  message="支持：Ubuntu / Debian / Redhat / ArchLinux / FreeBSD ..."
                  type="success"
                  showIcon
                  className={styles.linuxAlert}
                />
                :
                <Alert
                  message="本软件支持 Linux系统；如有需要，请联系管理员"
                  type="info"
                  showIcon
                  className={ styles.linuxAlert }
                />
            }
          </div>
        </div>
      ),
      forceRender: true,
    },
  ];

  const { run, loading, error } = useRequest(
    () =>
      VersionController.detail({
        productType,
        domain: document.location.hostname,
      }),
    {
      onSuccess(result) {
        setDetailData( result );
        setProductDetail( result.productDetail );
      },
    },
  );

  const onDown = (e: React.MouseEvent) => {
    // 先要登录；
    // if (! isLogin) {
    //   console.log('未登录');
    //   // Tool.onLogin(() => {
    //   toast('请先登录后在下载');
    //   // });
    //
    //   e.preventDefault();
    //   return;
    // }
  };

  const onTabs = ( key: string ) => {
    setCurrentOs( key );
    window.location.hash = `os=${ key }`;
  }

  const onHistoryList = ( osName: Global.OsName, ) => {
    drawer({
      title: '历史版本 列表',
      content: (
        <ClientVersionList
          productType={ productType }
          osType={ osName }
        />
      ),
      width: 620,
    });
  }

  useEffect(() => {
    setColSpan( window.screen.width > 480 ? 6 : 24 );
    setIsLogin( getLocalUserInfo().isLogin );

    goTop();
  }, []);

  return (
    <div
      className={  styles.downloadWarp }
    >
      <PageContentWarp
        error={ error }
        onReload={ () => {
          document.location.reload();
        }}
      >
        {/*{ JSON.stringify( detailData )}*/}
        <div className={ styles.download }>
          <div className="page-warp">
            <Row gutter={ 24 }>
              <Col span={ colSpan }>
                <div className={ styles.versionInfo }>
                  <img
                    src={ productDetail?.logoUrl || `https://shipinlv.oss-cn-hangzhou.aliyuncs.com/www/product/${ productDetail?.productType }.png`}
                    alt={ `${ productDetail?.name || '' } 图标` }
                    className={ styles.logo }
                  />
                  <div>
                    <div className={styles.version}>
                      版本：v{detailData?.windows?.version}
                    </div>

                    <ul>
                      <li><a className="disabled">系统要求</a></li>
                      <li><a className="disabled">安装说明</a></li>
                      <li><a className="disabled">其他版本</a></li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col span={24 - colSpan <= 0 ? 24 : 24 - colSpan}>
                <h2 className={styles.title}>
                  <Link to={`/product/${productDetail?.productType}`}>{productDetail?.name }</Link>
                  <span className={ styles.pagePos }><CaretRightOutlined className={ styles.icon } />下载</span>
                </h2>

                <Tabs
                  activeKey={ currentOs || 'windows' }
                  items={items}
                  onChange={ e => onTabs( e ) }
                />
              </Col>
            </Row>
          </div>
          <SoftDownloadNotAllowDownload />
        </div>
      </PageContentWarp>

      <Contact />
    </div>
  );
}

export default SoftDownload;
