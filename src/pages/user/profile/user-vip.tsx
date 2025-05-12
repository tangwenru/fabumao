import React, { useEffect, useState } from 'react';
import {
  Card,
  Divider,
  Table,
  Tag,
} from 'antd';

import { useRequest } from '@umijs/hooks';
import styles from './user-vip.less';
import PageContentWarp from '@/ui/PageContentWarp';
import * as UserController from '@/service/api/UserController';
import Time from '@/ui/Time';
import ProductType from '@/component/product-type';
import UserProfileVipCard from "@/pages/user/profile/vip-card";

const UserProfileUserVip = () => {
  const [listData, setListData] = useState<User.UserVipInfo[]>([]);
  const { run, loading, error } = useRequest(
    () => UserController.userVipInfo(),
    {
      manual: true,
      onSuccess(result) {
        setListData(result);
      },
    },
  );

  const columns: Global.Columns<User.UserVipInfo>[] = [
    {
      title: '名称',
      dataIndex: 'productName',
      key: 'productName',
      render(productName, record) {
        return <ProductType productType={ record?.productType } productName={ productName } />;
      },
    },
    {
      title: '等级',
      dataIndex: 'vipLevelName',
      key: 'vipLevelName',
      render(vipLevelName, record) {
        return <div>{vipLevelName}</div>;
      },
    },
    //
    {
      title: '提成比例',
      dataIndex: 'ratioDownPercent1',
      key: 'ratioDownPercent1',
      render(ratioDownPercent1, record) {
        return (
          <>
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
      title: '过期时间',
      dataIndex: 'expired',
      key: 'expired',
      render(expired, record) {
        return <Time time={expired} />;
      },
    },
  ];

  useEffect(() => {
    run();
  }, []);

  return (
    <div className={ styles.userVip }>
      <Card title="我的会员等级">
        <PageContentWarp
          loading={loading} error={error} onReload={() => run()}>
          <Table<User.UserVipInfo>
            size="small"
            bordered={true}
            rowKey={(record) => `${record.productType}`}
            loading={loading}
            columns={columns}
            dataSource={listData}
            pagination={false}
          />
        </PageContentWarp>
      </Card>

      {/*<UserProfileVipCard*/}
      {/*  onActive={ () => {*/}
      {/*    run();*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
};

export default UserProfileUserVip;
