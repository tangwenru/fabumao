import React, { useEffect, useState } from 'react';
import {Card, Divider, Table, Tag, Button, Radio, Tabs} from 'antd';
import LayoutContent from '@/ui/LayoutContent';
import styles from './vip.less';
import {
  AlignLeftOutlined,
  SettingOutlined,
  PlusCircleOutlined, LikeOutlined, LinkOutlined,
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import * as VipController from '@/service/api/VipController';
import { useRequest } from '@umijs/hooks';
import { Buy } from "component-shipinlv";
import PageContentWarp from "@/ui/PageContentWarp";
import VipCommend from "@/component/vip/commend";
import {getProductUrl} from "@/lib/getProductUrl";
import UserVipStatus from "@/pages/user/vip/status";
import Money from "@/ui/Money";
import UserPromoteLevel from "@/component/user/promote-level";
import {getBaseConfigEnv} from "../../../../../web-base-config";

const UserVipListVip: React.FC = ({}) => {

  const columns: Global.Columns<Vip.List>[] = [
    {
      title: '说明',
      dataIndex: 'monthTitle',
      key: 'monthTitle',
      render(monthTitle) {
        return <Tag>{monthTitle}</Tag>;
      },
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render(price) {
        return (
          <Money value={ price } />
        );
      },
    },
    {
      title: <>推广者等级<small className={ styles.titleAlt }>一/二级提成</small></>,
      dataIndex: 'ratioDownPercent1',
      key: 'ratioDownPercent1',
      render(ratioDownPercent1, record) {
        return (
          <>
            <UserPromoteLevel title={ record?.userPromoteInfo.title } color={ record?.userPromoteInfo?.color } />
            {ratioDownPercent1}
            <small>%</small>
            <Divider type="vertical" />
            {record?.ratioDownPercent2}
            <small>%</small>
          </>
        );
      },
    },
    {
      title: '说明',
      dataIndex: 'alt',
      key: 'alt',
      render(alt, record) {
        return (
          <div className={styles.alt}>
            {alt}
            {Array(record?.recommend).map((num, i) => (
              <LikeOutlined key={ i } />
            ))}
            <VipCommend commend={record?.recommend} />
          </div>
        );
      },
    },
    {
      title: '购买',
      dataIndex: '_x',
      key: '_x',
      render(_, record) {
        return (
          ( record?.price || 0 ) > 0 &&
          <Buy
            env={ getBaseConfigEnv() }
            productKind="vip"
            vipId={ record?.id || 0 }
            productCount={ 1 }
          >
            <Button type="primary">购买</Button>
          </Buy>
        );
      },
    },
  ];

  const [listData, setListData] = useState<Vip.ListAll[]>([]);
  const { run, loading, error } = useRequest(
    () =>
      VipController.listAll({
        webDomain: document.location.hostname,
      }),
    {
      manual: true,
      onSuccess(result) {
        setListData(result);
      },
    },
  );

  useEffect(() => {
    run();
  }, []);


  return (
    <div className={styles.vipList}>
      <PageContentWarp
        loading={ loading }
        error={ error }
        onReload={ run }
        // title="购买会员"
      >
        {
          listData.map( (items) => (
            <Card
              title={(
                <div className={ styles.cardTitle }>
                  <div>
                    <div className={ styles.name }>
                      <a
                        target="_blank"
                        href={ getProductUrl( items.productDetail.productUrl, items.productDetail.productType ) }
                      >
                        { items.productDetail.name }
                        <small>{ items.productDetail.subName }</small>
                      </a>
                    </div>
                    <div>
                      <UserVipStatus
                        isVip={ items.userVipInfo.isVip }
                        title={ items.userVipLevelInfo.monthTitle }
                        expired={ items.userVipInfo.expired }
                      />
                    </div>
                  </div>
                  <div>
                    <a
                      className={ styles.view }
                      target="_blank"
                      href={ getProductUrl( items.productDetail.productUrl, items.productDetail.productType ) }
                    >
                      <Button type="link">
                        查看 <LinkOutlined />
                      </Button>
                    </a>
                  </div>
                </div>
              )}
              key={ `${ items.productDetail.productType }` }
              className={ styles.card }
            >
              <div style={{ backgroundImage: `url('${ items.productDetail.logoUrl }')` }} className={styles.thumbUrl} />

              <Table<Vip.List>
                // size="small"
                className={ styles.table }
                bordered={true}
                size="small"
                rowKey={(record) => `${record.id}`}
                loading={loading}
                columns={columns}
                dataSource={items.list || []}
                pagination={ false }
              />
            </Card>
          ))
        }
      </PageContentWarp>
    </div>
  );
};

export default UserVipListVip;
