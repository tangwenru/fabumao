import React, {useEffect, useState} from 'react';
import {
  Table,
  Avatar,
  Tag, Button, Space, Switch, Divider, Tooltip, Popover, Popconfirm,
} from 'antd';
import LayoutContent from "@/ui/LayoutContent";
import styles from './list.less';
import * as DealerAdController from "@/service/dealer/AdController";
import {useRequest} from "@umijs/hooks";
import Time from "@/ui/Time";
import DealerAdListQuery from "./query";
import drawer from "@/lib/drawer";
import DealerAdListBuyVipCard from "@/pages/dealer/customer/buy-vip-card";
import DealerAdProductUsage from "@/pages/dealer/customer/product-usage";
import DealerAdPassword from "@/pages/dealer/customer/password";
import Enabled from "@/ui/Enabled";
import AdOpenTarget from "@/pages/dealer/ad/open-target";
import Copy from "@/ui/copy";
import AdCreate from "@/pages/dealer/ad/create";
import toast from "@/lib/toast";
import AdFrom from "@/pages/dealer/adClassify/from";

const  DealerAdList: React.FC
  = ({

     }) => {

  const [ query, setQuery ] = useState<DealerAd.ListQuery>({
    adClassifyId: 0,
  });

  const [ pagination, setPagination ] = useState<Global.Pagination>({
    current: 1,
    pageSize: 100,
    total: 0,
    simple: true,
    showSizeChanger: false,
  });

  const columns: Global.Columns<DealerAd.List>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '产品',
      dataIndex: 'productBaseInfo',
      key: 'productBaseInfo',
      render( productBaseInfo: Product.BaseInfo, record ){
        return (
          <div className={ styles.productBaseInfo }>
            <span className={ styles.logoUrl } style={{ backgroundImage: `url('${ productBaseInfo.logoUrl }')` }} />
            { productBaseInfo.name }
          </div>
        )
      },
    },
    {
      title: '端类型',
      dataIndex: 'from',
      key: 'from',
      render( from ){
        return (
          <AdFrom from={ from } />
        )
      },
    },
    {
      title: '位置',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '类型',
      dataIndex: 'openTarget',
      key: 'openTarget',
      render( openTarget ){
        return <AdOpenTarget openTarget={ openTarget } />;
      },
    },
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      render( title ){
        return (
          <div className={ styles.title }>
            { title }
          </div>
        )
      }
    },
    {
      title: '打开网址',
      dataIndex: 'url',
      key: 'url',
      render( url ){
        return (
          <Space>
            <Popover title="打开网址" content={ url }>
              <div className={ styles.url }>{ url }</div>
            </Popover>

            <Copy content={ url } />
          </Space>
        );
      },
    },
    {
      title: '是否启用',
      dataIndex: 'enabled',
      key: 'enabled',
      render( enabled ){
        return <Enabled enabled={ enabled } />;
      },
    },
    {
      title: '修改时间',
      dataIndex: 'updated',
      key: 'updated',
      render( updated, record ){
        return <Time time={ updated || record?.created } />;
      },
    },

    {
      title: '操作',
      dataIndex: 'x',
      key: 'x',
      render( x, record, index = -1 ){
        return (
          <Space>
            <Button
              type="link"
              onClick={ () => onCreate( record?.id || 0 ) }
            >
              修改
            </Button>

            <Popconfirm
              title="删除"
              description="确定删除？删除后不能恢复"
              onConfirm={ () => onDel( record?.id || 0 ) }
            >
              <Button
                type="link"
                danger
                disabled={ loadingDel }
              >
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const [ listData, setListData ] = useState<DealerAd.List[]>([]);
  const {
    run,
    loading,
  } = useRequest(( current = pagination.current, formQuery = query ) => DealerAdController.list({
      ...formQuery,
      current,
      pageSize: pagination.pageSize,
    }),
    {
      onSuccess( result ){
        setListData( result.list );
        setPagination({
          ...pagination,
          ...result.pagination,
        });
      }
    },
  );

  const {
    run: runDel,
    loading: loadingDel,
  } = useRequest(( id: number ) => DealerAdController.del({
      id,
    }),
    {
      manual: true,
      onSuccess( result ){
        toast('已经删除');
        run();
      }
    },
  );

  const onPage = ( current = 1 ) => {
    pagination.current = current || 1;
    setPagination({...pagination});
    run( pagination.current )
  }

  const onQuery = ( query: DealerAd.ListQuery ) => {
    setQuery({...query});
    run( 1, query );
  }

  const onCreate = ( id = 0 ) => {
    const dialog = drawer({
      title: '编辑',
      content: (
        <AdCreate
          id={ id }
          onSuccess={ () => {
            run();
            dialog.destroy();
          }}
        />
      ),
      width: 680,
    })
  }

  const onDel = ( id = 0 ) => {
    runDel( id );
  }

  return (
    <div className={ styles.list }>
      <LayoutContent
        title="广告列表"
        subtitle={(
          <Button ghost type="primary" size="small" onClick={ () => onCreate( 0 ) }>
            新建
          </Button>
        )}
        extInfo={(
          <DealerAdListQuery
            query={ query }
            onChange={ q => onQuery(q) }
          />
        )}
      >
        <Table<DealerAd.List>
          size="small"
          bordered={ true }
          rowKey={ ( record, index ) => `${ record.id }` }
          loading={ loading }
          columns={ columns }
          dataSource={ listData }
          pagination={ pagination }
          onChange={ ({ current }) => onPage( current ) }
        />
      </LayoutContent>
    </div>
  )
};

export default  DealerAdList;
