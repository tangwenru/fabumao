// 所有 用户 默认可以试用

// 此页面 暂未使用 2024-12-20

import React, {useState} from 'react';
import styles from './list.less';
import { useRequest } from '@umijs/hooks';

import {Table } from 'antd';
import LayoutContent from "@/ui/LayoutContent";
import * as ProductUserTryController from "@/service/dealer/ProductUserTryController";
import Time from "@/ui/Time";
import Enabled from "@/ui/Enabled";
import DealerProductUserTryListQuery from "@/pages/dealer/product-user-try/query";

const DealerProductUserTryList = () => {
  const [ listsData, setListsData ] = useState<DealerProductUserTry.List[]>([]);
  const [ pagination, setPagination ] = useState<Global.Pagination>({
    current: 1,
    pageSize: 100,
    total: 0,
    simple: true,
  });

  const {
    run,
    loading,
    error,
  } = useRequest(
    (  current = pagination.current, ) =>
      ProductUserTryController.list({
        current,
        pageSize: pagination.pageSize,
      }),
    {
      onSuccess(result) {
        setListsData( result.list );
        setPagination( result.pagination );
      },
    },
  );


  const columns: Global.Columns<DealerProductUserTry.List>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '产品名',
      dataIndex: 'productBaseInfo',
      key: 'productBaseInfo',
      render( productBaseInfo ){
        return (
          <div className={ styles.productBaseInfo }>
            <div
              className={ styles.logoUrl }
              style={{
                backgroundImage: `url('${ productBaseInfo.logoUrl }')`
              }}
            />
            { productBaseInfo.name }
          </div>
        )
      }
    },
    {
      title: '试用时长',
      dataIndex: 'tryHour',
      key: 'tryHour',
      render(tryHour) {
        return <Money pre="" value={ tryHour } precision={ 0 } end=" 小时"  />
      },
    },
    {
      title: '是否启用试用',
      dataIndex: 'enabled',
      key: 'enabled',
      render(enabled, record) {
        return <Enabled enabled={ enabled } />;
      },
    },

    {
      title: '试用时间',
      dataIndex: 'created',
      key: 'created',
      render(created, record) {
        return <Time time={ created } />;
      },
    },
  ];


  return (
    <LayoutContent
      title="用户试用"
      className={ styles.dealerProductUserTryList }
      extInfo={(
        <DealerProductUserTryListQuery
          query={ {} }
          onSubmit={ () => {
            run();
          }}

        />
      )}
    >
      <Table<DealerProductUserTry.List>
        size="small"
        bordered={true}
        rowKey={(record) => `${record.id}`}
        loading={loading}
        columns={columns}
        dataSource={listsData}
        pagination={pagination}
        onChange={({ current }) => {
          pagination.current = current || 1;
          run( pagination.current );
        }}
      />
    </LayoutContent>
  );
}

export default DealerProductUserTryList;
