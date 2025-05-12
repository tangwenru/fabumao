import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import LayoutContent from '@/ui/LayoutContent';
import styles from './list.less';
import {
  AlignLeftOutlined,
  SettingOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import * as FinanceController from '@/service/api/FinanceController';
import { useRequest } from '@umijs/hooks';
import Time from '@/ui/Time';
import Hash from '@/ui/Hash';
import Platform from "@/component/platform";
import UserLayout from "@/pages/user/_layout";
import isInServer from "@/lib/isInServer";

const StockApiMethodList: React.FC = ({}) => {
  const [pagination, setPagination] = useState<Global.Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
    simple: true,
    showSizeChanger: false,
  });
  const [ isInH5 ] = useState( Platform.isH5 );

  const columns: Global.Columns<Finance.List>[] = [
    {
      title: '编号',
      dataIndex: 'idKey',
      key: 'idKey',
      render(idKey) {
        return <Hash content={idKey} maxLength={ 6 } />;
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render(name, record) {
        return <div>{name}</div>;
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render(type) {
        return <Tag>购买{type?.toLocaleUpperCase()}</Tag>;
      },
    },
    {
      title: '金额',
      dataIndex: 'money',
      key: 'money',
      render(money) {
        return (
          <>
            <small>￥</small>
            <strong>{money}</strong>
            <small>元</small>
          </>
        );
      },
    },
    {
      title: '扩展信息',
      dataIndex: 'extInfo',
      key: 'extInfo',
      render(extInfo) {
        return extInfo;
      },
    },
    {
      title: '好友ID',
      dataIndex: 'toUserDownUserId',
      key: 'toUserDownUserId',
      render(toUserDownUserId) {
        return toUserDownUserId.toString(36).toLocaleUpperCase();
      },
    },

    {
      title: '时间',
      dataIndex: 'created',
      key: 'created',
      render(created, record) {
        return <Time time={created} />;
      },
    },
  ];

  const [listData, setListData] = useState<Finance.List[]>([]);
  const { run, loading, error } = useRequest(
    (pager = pagination) =>
      FinanceController.list({
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
    <UserLayout>
      <div className={`${ styles.list } ${ isInH5 ? styles.isInH5 : '' }`}>
        <LayoutContent title="我的账单">
          <Table<Finance.List>
            size="small"
            bordered={true}
            rowKey={(record) => `${record.idKey}`}
            loading={loading}
            columns={columns}
            dataSource={listData}
            pagination={pagination}
            onChange={( e ) => {
              pagination.current = e.current || 1;
              run(pagination);
            }}
          />
        </LayoutContent>
      </div>
    </UserLayout>
  );
};

export default StockApiMethodList;
