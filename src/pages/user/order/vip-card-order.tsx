import React, { useEffect, useState } from 'react';
import {Alert, Divider, Radio, Table, Tabs, TabsProps, Tag, Tooltip} from 'antd';
import styles from './vip-card-order.less';
import * as VipCardOrderController from '@/service/api/VipCardOrderController';
import { useRequest } from '@umijs/hooks';
import Time from '@/ui/Time';
import Hash from '@/ui/Hash';
import UserOrderStatus from './vip-order-status';
import Money from "@/ui/Money";

const UserVipCardOrderList: React.FC = ({}) => {
  const [pagination, setPagination] = useState<Global.Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
    simple: true,
    showSizeChanger: false,
  });

  const columns: Global.Columns<VipCardOrder.List>[] = [
    {
      title: '编号',
      dataIndex: 'idKey',
      key: 'idKey',
      render(idKey) {
        return <Hash content={idKey} maxLength={ 6 } />;
      },
    },
    {
      title: '类别',
      dataIndex: 'monthTitle',
      key: 'monthTitle',
      render(monthTitle, record ) {
        return (
          <div>
            { record?.productName }
            {
              monthTitle &&(
                <><Divider type="vertical" /><Tag>{ monthTitle }</Tag></>
              )
            }

          </div>
        );
      },
    },
    {
      title: '总额',
      dataIndex: 'money',
      key: 'money',
      render(money) {
        return <Money value={money} />;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(status) {
        return <UserOrderStatus status={status} />;
      },
    },
    {
      title: '时间',
      dataIndex: 'created',
      key: 'created',
      render(created) {
        return <Time time={created} />;
      },
    },
  ];

  const [listData, setListData] = useState<VipCardOrder.List[]>([]);
  const { run, loading, error } = useRequest(
    (pager = pagination) =>
      VipCardOrderController.list({
        current: pager.current,
        pageSize: pager.pageSize,
      }),
    {
      onSuccess(result) {
        setListData(result.list);
        setPagination({
          ...pagination,
          ...result.pagination,
        });
      },
    },
  );

  return (
    <div className={styles.list}>
      <Table<VipCardOrder.List>
        bordered={true}
        size="small"
        rowKey={(record) => `${record.idKey}`}
        loading={loading}
        columns={columns}
        dataSource={listData}
        pagination={pagination}
        onChange={({ current }) => {
          pagination.current = current || 1;
          run(pagination);
        }}
      />
    </div>
  );
};

export default UserVipCardOrderList;
