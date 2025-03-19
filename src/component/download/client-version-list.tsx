import styles from './client-version-list.less';
import React, {useEffect, useState} from 'react';
import type { TabsProps } from 'antd';
import PageContentWarp from "@/ui/PageContentWarp";
import { useRequest } from '@umijs/hooks';
import * as VersionController from '@/service/api/VersionController';
import {Divider, List, Tag} from "antd";
import Time from "@/ui/Time";
import dayjs from "dayjs";
import {AppleOutlined, FieldTimeOutlined, WindowsOutlined} from "@ant-design/icons";
import Markdown from "@/component/markdown";

interface Props{
  productType: string;
  osType: Global.OsName;
}

const ClientVersionList: React.FC<Props>
  = ({
       productType,
       osType,
     }) => {
  const [ listData, setListData ] = useState<ClientVersion.List[]>([]);
  const OsTypeDict = {
    windows: {
      icon: <WindowsOutlined />,
    },
    darwin: {
      icon: <AppleOutlined />,
    }
  };

  const { run, loading, error } = useRequest(
    () =>
      VersionController.list({
        productType,
        osType,
        domain: document.location.hostname,
      }),
    {
      onSuccess(result) {
        setListData( result );
      },
    },
  );

  return (
    <PageContentWarp
      error={ error }
      // loading={ loading }
      onReload={ () => run() }
      className={ styles.clientVersionList }
    >
      <List
        loading={ loading }
        itemLayout="horizontal"
        dataSource={ listData }
        rowKey={ item =>  item.id }
        renderItem={(item, index ) => {
          const versionReal = `${ item.versionReal }`;
          const versionRealTime = dayjs(`${ versionReal.slice( 0,4 ) }-${ versionReal.slice( 4,6 )  }-${ versionReal.slice( 6, 8 ) }`).valueOf();
          // console.log('ddd:', `${ versionReal.slice( 0,4 ) }-${ versionReal.slice( 4,6 )  }-${ versionReal.slice( 6, 8 ) }`, versionReal );
          return (
            <List.Item
              key={ item.id }
              actions={[
                <a key="download" href={ item.url } target="_blank">
                  { OsTypeDict[ item.osType ]?.icon } 下载
                </a>
              ]}
            >
              <List.Item.Meta
                title={ (
                  <div className={ styles.version }>
                    V{ item.version } { index === 0 && <Tag color="green">最新版</Tag> }
                  </div>
                )}
                description={(
                  <div>
                    <div className={ styles.title }>
                      { item.title }
                    </div>
                    <div>
                      <Markdown
                        content={ item.content || '' }
                      />
                    </div>
                  </div>
                )}
              />
              <div className={ styles.time }>
                <FieldTimeOutlined /> <Time time={ item.created || versionRealTime  } />
              </div>
            </List.Item>
          )
        }}
      />
    </PageContentWarp>
  );
}

export default ClientVersionList;
