import React, { useEffect, useState } from 'react';
import {Alert, Divider, Popover, Radio, Space, Table, Tabs, TabsProps, Tag, Tooltip} from 'antd';
import styles from './index.less';
import * as VipCardController from '@/service/api/VipCardController';
import { useRequest } from '@umijs/hooks';
import Time from '@/ui/Time';
import UserOrderStatus from '../vip-order-status';
import Money from "@/ui/Money";
import Copy from "@/ui/copy";
import PageContentWarp from "@/ui/PageContentWarp";
import VipCardListQuery from "@/pages/user/order/vip-card/query";
import TextInput from "@/ui/text-input";
import toast from "@/lib/toast";
import Tool from "component-shipinlv/dist/lib/Tool";
import ProductLogo from "@/component/product/logo";

const UserVipCardList: React.FC = ({}) => {
  const [ siteInfo ] = useState( Tool.getLocalSiteInfo() );
  const [ query, setQuery ] = useState<VipCard.ListQuery>({
    targetTypeId: 0,
    keyword: '',
    used: '',
  })
  const [pagination, setPagination] = useState<Global.Pagination>({
    current: 1,
    pageSize: 20,
    total: 0,
    simple: true,
    showSizeChanger: false,
  });

  const columns: Global.Columns<VipCard.List>[] = [
    {
      title: '类别',
      dataIndex: 'monthTitle',
      key: 'monthTitle',
      render(monthTitle, record ) {
        let color = undefined;
        if( monthTitle == '年卡' ){
          color = 'red';
        }
        return (
          <div>
            <ProductLogo productType={ record?.productType || '' } size={ 36 } /> { record?.productName }
            {
              monthTitle &&(
                <><Divider type="vertical" /><Tag color={ color }>{ monthTitle }</Tag></>
              )
            }

          </div>
        );
      },
    },
    {
      title: '激活码',
      dataIndex: 'code',
      key: 'code',
      render(code, record) {
        const keyCode = `AI-${ code }`;
        return (
          <Space>
            <Copy className={ styles.codeCopy } content={ keyCode }>{ keyCode }</Copy>
            {
              siteInfo.dealerId == record?.ownerUserId && record?.userId > 0 &&
              <>
                <Divider type="vertical" />
                <Tag className={ styles.useInfo }>
                  {
                    record?.userId.toString( 36 ).toLocaleUpperCase()
                  }
                </Tag>
              </>
            }

          </Space>
        );
      },
    },
    // {
    //   title: '使用人',
    //   dataIndex: 'userId',
    //   key: 'userId',
    //   render(userId, record) {
    //     return userId <= 0 ?
    //       ''
    //       :
    //       <span className={ styles.useInfo }>{ userId.toString( 36 ).toLocaleUpperCase() } <small><Time time={ record?.used } /></small></span>;
    //   },
    // },
    {
      title: '购买时间',
      dataIndex: 'created',
      key: 'created',
      render(created) {
        return <Time time={created} />;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render( remark, record ) {
        return (
          <Popover
            title="备注"
            content={ remark }
          >
            <div className={styles.remark}>
              <TextInput
                className={styles.remarkInput}
                label={ remark || ''}
                value={ remark || ''}
                maxLength={ 50 }
                onFinish={ (remark) => {
                  onEditRemark( record?.id || 0, remark )
                }}
              />
            </div>
          </Popover>
        );
      },
    },
  ];

  const [listData, setListData] = useState<VipCard.List[]>([]);
  const { run, loading, error } = useRequest(
    ( queryPost = query, pager = pagination) =>
      VipCardController.list({
        ...queryPost,
        current: pager.current,
        pageSize: pager.pageSize,
      }),
    {
      onSuccess( result) {
        setListData(result.list);
        setPagination({
          ...pagination,
          ...result.pagination,
        });
      },
    },
  );

  const {run: runRemark, loading: loadingRemark} = useRequest(
    ( id: number, remark: string ) =>
      VipCardController.editRemark({
        id,
        remark,
      }),
    {
      manual: true,
      onSuccess(result) {
        toast('已经保存');
        const index = listData.findIndex( item => item.id === result.id );
        if( index < 0 ){
          console.log('runRemark index 没找到' );
          return;
        }
        listData[ index ].remark = result.remark;
        setListData([...listData]);
      },
    },
  );

  const onQuery = ( query: VipCard.ListQuery ) => {
    pagination.current = 1;
    setPagination({...pagination});
    setQuery({...query});
    run( query, pagination );
  }

  const onEditRemark = ( id: number, remark: string ) => {
    return runRemark( id, remark );
  }

  return (
    <PageContentWarp
      className={styles.vipCard }

    >
      <VipCardListQuery
        query={ query }
        onQuery={ onQuery }
      />
      <Table<VipCard.List>
        bordered={true}
        size="small"
        rowKey={(record) => `${record.id }`}
        loading={loading}
        columns={columns}
        dataSource={listData}
        pagination={pagination}
        onChange={({ current }) => {
          pagination.current = current || 1;
          run(query, pagination);
        }}
      />
    </PageContentWarp>
  );
};

export default UserVipCardList;
