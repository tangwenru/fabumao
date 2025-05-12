import React, {useEffect, useState} from 'react';
import {
  Table,
  Avatar,
  Tag, Button, Space, Switch, Divider, Tooltip,
} from 'antd';
import LayoutContent from "@/ui/LayoutContent";
import styles from './list.less';
import * as DealerAdClassifyController from "@/service/dealer/AdClassifyController";
import {useRequest} from "@umijs/hooks";
import Time from "@/ui/Time";
import DealerAdListQuery from "./query";
import Enabled from "@/ui/Enabled";
import drawer from "@/lib/drawer";
import AdClassifyCreate from "./create";
import AdFrom from "@/pages/dealer/adClassify/from";

const  DealerAdList: React.FC
  = ({

     }) => {

  const [ query, setQuery ] = useState<DealerAdClassify.ListQuery>({
    productType: '',
  });

  const [ pagination, setPagination ] = useState<Global.Pagination>({
    current: 1,
    pageSize: 100,
    total: 0,
    simple: true,
    showSizeChanger: false,
  });

  const columns: Global.Columns<DealerAdClassify.List>[] = [
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
    // {
    //   title: '标题',
    //   dataIndex: 'title',
    //   key: 'title',
    //   render( title ){
    //     return title;
    //   },
    // },
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
          </Space>
        );
      },
    },
  ];

  const [ listData, setListData ] = useState<DealerAdClassify.List[]>([]);
  const {
    run,
    loading,
    error,
  } = useRequest(( current = pagination.current, formQuery = query ) => DealerAdClassifyController.list({
      ...formQuery,
      current,
      pageSize: pagination.pageSize,
    }),
    {
      onSuccess( result ){
        setListData( result.list );
        // setPagination({
        //   ...pagination,
        //   ...result.pagination,
        // });
      }
    },
  );

  const onPage = ( current = 1 ) => {
    pagination.current = current || 1;
    setPagination({...pagination});
    run( pagination.current )
  }

  const onQuery = ( query: DealerAdClassify.ListQuery ) => {
    setQuery({...query});
    run( 1, query );
  }

  const onDetail = ( itemData?: DealerAdClassify.List ) => {

  }

  const onCreate = ( id = 0 ) => {
    const dialog = drawer({
      title: '编辑',
      content: (
        <AdClassifyCreate
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

  return (
    <div className={ styles.list }>
      <LayoutContent
        title="广告分类"
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
        <Table<DealerAdClassify.List>
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
