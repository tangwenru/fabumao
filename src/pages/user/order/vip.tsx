import React, { useEffect, useState } from 'react';
import {Alert, Divider, Radio, Table, Tabs, TabsProps, Tag, Tooltip} from 'antd';
import LayoutContent from '@/ui/LayoutContent';
import styles from './vip.less';
import * as VipOrderController from '@/service/api/VipOrderController';
import { useRequest } from '@umijs/hooks';
import Time from '@/ui/Time';
import Hash from '@/ui/Hash';
import UserOrderStatus from '@/pages/user/order/vip-order-status';
import Money from "@/ui/Money";
import WithdrawBindAccountBankCard from "@/pages/user/withdraw/bind-account/bank-card";
import UserLayout from "@/pages/user/_layout";
import isInServer from "@/lib/isInServer";

const UserVipOrderList: React.FC = ({}) => {
  const [pagination, setPagination] = useState<Global.Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
    simple: true,
    showSizeChanger: false,
  });

  const columns: Global.Columns<VipOrder.List>[] = [
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
      title: '金额',
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

  const [listData, setListData] = useState<VipOrder.List[]>([]);
  const { run, loading, error } = useRequest(
    (pager = pagination) =>
      VipOrderController.list({
        current: pager.current,
        pageSize: pager.pageSize,
      }),
    {
      manual: isInServer(),
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
    <div className={styles.vipList}>
      <Table<VipOrder.List>
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

export default UserVipOrderList;
