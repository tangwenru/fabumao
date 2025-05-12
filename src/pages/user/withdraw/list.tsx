import React, {useEffect, useState} from 'react';
import {
  Table,
  Tag,
} from 'antd';
import LayoutContent from "@/ui/LayoutContent";
import styles from './list.less';
import * as WithdrawController from "@/service/api/WithdrawController";
import {useRequest} from "@umijs/hooks";
import Time from "@/ui/Time";
import Hash from "@/ui/Hash";
import LoadError from "@/ui/LoadError";
import WithdrawStatus from "@/pages/user/withdraw/status";
import UserLayout from "@/pages/user/_layout";


const WithdrawList: React.FC
  = ({

     }) => {

  const [ pagination, setPagination ] = useState<Global.Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
    simple: true,
    showSizeChanger: false,
  });

  const columns: Global.Columns<Withdraw.List>[] = [
    {
      title: '编号',
      dataIndex: 'idKey',
      key: 'idKey',
      render( idKey ){
        return <Hash content={ idKey } maxLength={ 6 } />
      }
    },
    {
      title: '金额',
      dataIndex: 'money',
      key: 'money',
      render( money ){
        return (
          <><small>￥</small><strong>{ money }</strong><small>元</small></>
        )
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render( status, record ){
        return <><WithdrawStatus status={ status } /></>
      },
    },
    {
      title: '时间',
      dataIndex: 'created',
      key: 'created',
      render( created, record ){
        return <Time time={ created } />;
      },
    },
  ];

  const [ listData, setListData ] = useState<Withdraw.List[]>([]);
  const {
    run,
    loading,
    error,
  } = useRequest(( pager = pagination ) => WithdrawController.list({
      current: pager.current,
      pageSize: pager.pageSize,
    }),
    {
      manual: true,
      onSuccess( result ){
        setListData( result.list );
        setPagination({
          ...pagination,
          ...result.pagination,
        });
      }
    },
  );

  useEffect(() => {
    run();
  }, []);

  return (
    <UserLayout>
      <div className={ styles.list }>
        <LayoutContent
          title={ <>提现记录</> }
          extInfo={(
            <>

            </>
          )}
          leftExtInfo=""
        >
          <Table<Withdraw.List>
            bordered={ true }
            rowKey={ ( record ) => `${ record.idKey }` }
            loading={ loading }
            columns={ columns }
            locale={{
              emptyText: error?.message ? <LoadError title={ error?.message } /> : ''
            }}
            dataSource={ listData }
            pagination={ pagination }
            onChange={ ({ current }) => {
              pagination.current = current || 1;
              run( pagination )
            }}
          />
        </LayoutContent>
      </div>
    </UserLayout>
  )
};

export default WithdrawList;
