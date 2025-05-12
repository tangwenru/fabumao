import React, {useState} from 'react';
import styles from './list.less';
import {
  BarsOutlined,
  CheckCircleOutlined,
  CloseCircleFilled,
  EyeOutlined,
  LoadingOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';

import {Table, Tag, Tooltip, Select, Button} from 'antd';
import WidhdrawDetail from './detail';
import WithdrawState from "./state";
import LayoutContent from "@/ui/LayoutContent";
import * as DealerWithdrawController from "@/service/dealer/WithdrawController";
import Time from "@/ui/Time";
import Breadcrumb from "@/ui/Breadcrumb";
import Money from "@/ui/Money";
import {getQuery} from "@/lib";
import drawer from "@/lib/drawer";

const WithdrawList = () => {
  const [ status, setStatus ] = useState( getQuery('status') || 'wait-check,transfer-error' );
  const [ listsData, setListsData ] = useState<DealerWithdraw.List[]>([]);
  const [ pagination, setPagination ] = useState<Global.Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
    simple: true,
  });

  const {
    run,
    loading,
    error,
  } = useRequest(
    ( statusData = status , current = pagination.current, ) =>
      DealerWithdrawController.list({
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

  const viewDetail = ( itemData: DealerWithdraw.List ) => {
    let dialogBox = drawer({
      title : `查看详情（申请编号：${ itemData.id }）`,
      content : (
        <WidhdrawDetail
          withdrawId={ itemData.id }
          onSaved={ () => {
            dialogBox.destroy();
            onSaved();
          }}
        />
      ),
      width : 700
    });

  }

  const onSaved = () => {
    run();
  }

  const onStatusChange = ( status: string ) => {
    setStatus( status );
    run( status, 1 );
  }

  const columns: Global.Columns<DealerWithdraw.List>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户',
      dataIndex: 'userId',
      key: 'userId',
      render(userId, record) {
        return userId.toString(36).toLocaleUpperCase() ;
      },
    },
    {
      title: '代理商',
      dataIndex: 'dealerInfo',
      key: 'dealerInfo',
      render(dealerInfo, record) {
        return <span>{ dealerInfo?.userName }</span>
      },
    },
    {
      title: '金额',
      dataIndex: 'money',
      key: 'money',
      render(money, record) {
        return <Money value={ money } />;
      },
    },

    {
      title: '申请时间',
      dataIndex: 'created',
      key: 'created',
      render(created, record) {
        return <Time time={ created } />;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(status, record) {
        return <WithdrawState status={ status } />;
      },
    },
    {
      title: '处理时间',
      dataIndex: 'updated',
      key: 'updated',
      render(updated, record) {
        return <Time time={ updated } />;
      },
    },
    {
      title: '操作',
      dataIndex: '_',
      key: '_',
      render(_, record) {
        return (
          <div className="operate">
            {
              record &&(
                record.status === 'wait-check' ?
                  <Button type="primary" onClick={ e => viewDetail( record ) }>处理</Button>
                  :
                  <Button type="link" onClick={ e => viewDetail( record ) }>查看</Button>
              )
            }
          </div>
        );
      },
    },
  ];


  return (
    <LayoutContent className={ styles.dealerFundsWithdrawList }>
      <Breadcrumb
        lists={ [
          { name : '首页' },
          { name : '提现列表' },
        ]}
        rightContent={(
          <div>
            <a className={ styles.reNew }>
              {
                loading ?
                  <LoadingOutlined />
                  :
                  <RedoOutlined onClick={ e => run() } />
              }
            </a>

            <Select
              className={ styles.queryStatus }
              defaultValue={ status }
              onChange={ status => onStatusChange( status ) }
            >
              <Select.Option value="wait-check,transfer-error">
                <span style={{ color: '#F90' }}><EyeOutlined /> 待我处理</span>
              </Select.Option>
              <Select.Option value="fail">
                <span style={{ color: '#C00' }}><CloseCircleFilled /> 被拒绝</span>
              </Select.Option>
              <Select.Option value="finish">
                <span style={{ color: 'green' }}><CheckCircleOutlined /> 已完成</span>
              </Select.Option>
              <Select.Option value="all">
                <span><BarsOutlined /> 全部</span>
              </Select.Option>
            </Select>
          </div>
        )}
      />

      <Table<DealerWithdraw.List>
        size="small"
        bordered={true}
        rowKey={(record) => `${record.id}`}
        loading={loading}
        columns={columns}
        dataSource={listsData}
        pagination={pagination}
        onChange={({ current }) => {
          pagination.current = current || 1;
          run( status, pagination.current );
        }}
      />
    </LayoutContent>
  );
}

export default WithdrawList;
