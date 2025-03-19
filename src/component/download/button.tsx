import styles from './button.less';
import React, {useState} from 'react';
import {Button, Col, ConfigProvider, Row, Space} from "antd";
import {
  CloudDownloadOutlined, ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "@umijs/max";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";

interface Props{
  productName: string;
  preList?: React.ReactNode[];
  className?: string;
  downTitle?: React.ReactNode;
  downIcon?: React.ReactNode;
  downEndPath?: string;
  downDisabled?: boolean;
  extList?: React.ReactNode[];
}

const DownloadButton: React.FC<Props>
  = ({
       productName,
       preList = [],
       className = '',
       downTitle = '下载免费试用',
       downIcon = <CloudDownloadOutlined />,
       downEndPath = '',
       downDisabled = false,
       extList,
     }) => {
  const [ siteInfo, setSiteInfo ] = useState( getLocalSiteInfo() );
  return (
    <div className={ `${ styles.download } ${ className }` }>
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
          {
            preList?.map( item => item )
          }

          <Link to={ downEndPath || `/product/${ productName }/download`}>
            <Button type="primary" size="large" shape="round" icon={ downIcon } disabled={ downDisabled }>
              { downTitle }
            </Button>
          </Link>

          {
            ( siteInfo.disabledOnlineBuy?.includes( productName )
            ||
              siteInfo.disabledOnlineBuy?.includes( '*' )
            ) ?
              ''
              :
              <Link to={`/product/${ productName }/pricing`}>
                <Button type="primary" ghost size="large" shape="round">
                  <ShoppingCartOutlined /> 购买套餐
                </Button>
              </Link>
          }

          {
            extList?.map( item => item )
          }
        </Space>
      </ConfigProvider>
    </div>
  );
}

export default DownloadButton;
