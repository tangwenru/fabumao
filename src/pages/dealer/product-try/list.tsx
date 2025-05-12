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

import {Table, Tag, Tooltip, Select, Button, Space} from 'antd';
import LayoutContent from "@/ui/LayoutContent";
import * as DealerProductTryController from "@/service/dealer/ProductTryController";
import Time from "@/ui/Time";
import Breadcrumb from "@/ui/Breadcrumb";
import Money from "@/ui/Money";
import drawer from "@/lib/drawer";
import Enabled from "@/ui/Enabled";
import DealerProductTryCreate from "@/pages/dealer/product-try/create";

const DealerProductTryList = () => {
  const [ listsData, setListsData ] = useState<DealerProductTry.List[]>([]);
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
      DealerProductTryController.list({
        current,
        pageSize: pagination.pageSize,
      }),
    {
      onSuccess(result) {
        setListsData([...result.list]);
        setPagination( result.pagination );
      },
    },
  );


  const columns: Global.Columns<DealerProductTry.List>[] = [
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
        return <Money pre="" value={ tryHour } precision={ 0 } end=" 小时" className={ styles.tryHour }  />
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
      title: '修改时间',
      dataIndex: 'created',
      key: 'created',
      render(created, record) {
        return <Time time={ record?.updated || created } />;
      },
    },
    {
      title: '操作',
      dataIndex: '_',
      key: '_',
      render(_, record) {
        return (
          <Space>
            <Button type="primary" onClick={ e => onCreate( record ) }>
              编辑
            </Button>
          </Space>
        );
      },
    },
  ];
  
  const  onCreate = ( itemData?:  DealerProductTry.List ) => {
    if( ! itemData ){
      return;
    }
    const dialog = drawer({
      title: '编辑',
      content: (
        <DealerProductTryCreate
          itemData={ itemData }
          onSuccess={ () => {
            run();
            dialog.destroy();
          }}
        />
      ),
      width: 620,
    })
  }


  return (
    <LayoutContent
      title="试用产品"
      className={ styles.dealerProductTryList }
    >
      <Table<DealerProductTry.List>
        size="small"
        bordered={true}
        rowKey={(record) => `${record.productBaseInfo?.productType }-${ record.id }`}
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

export default DealerProductTryList;
