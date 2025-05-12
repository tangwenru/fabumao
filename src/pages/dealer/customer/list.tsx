import React, {useEffect, useState} from 'react';
import {
  Table,
  Avatar,
  Tag, Button, Space, Switch, Divider, Tooltip,
} from 'antd';
import LayoutContent from "@/ui/LayoutContent";
import styles from './list.less';
import * as DealerController from "@/service/api/DealerController";
import {useRequest} from "@umijs/hooks";
import Time from "@/ui/Time";
import DealerCustomerListQuery from "./query";
import DealerCustomerDetail from "./detail";
import DealerCustomerDetailAgent from "./agent";
import drawer from "@/lib/drawer";
import DealerCustomerListBuyVipCard from "@/pages/dealer/customer/buy-vip-card";
import DealerCustomerProductUsage from "@/pages/dealer/customer/product-usage";
import DealerCustomerPassword from "@/pages/dealer/customer/password";

const  DealerCustomerList: React.FC
  = ({

     }) => {

  const [ query, setQuery ] = useState<Dealer.CustomerListQuery>({
    friendType: '',
    day: [
      0, //moment( moment().format('YYYY-MM-DD 00:00:00') ).valueOf(),
      0, //moment( moment().format('YYYY-MM-DD 23:59:59') ).valueOf(),
    ],
    keyword: '',
  });

  const [ pagination, setPagination ] = useState<Global.Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
    simple: true,
    showSizeChanger: false,
  });

  const columns: Global.Columns<Dealer.CustomerList>[] = [
    {
      title: '好友',
      dataIndex: 'userId',
      key: 'userId',
      render( userId, record ){
        return (
          <div className={ styles.userInfo }>
            <div className={ styles.avatar }>
              <Avatar size={ 40 } className={ styles.avatarBox } src={ record?.avatarUrl } />
            </div>
            <div className={ styles.info }>

              <Tooltip title="昵称">
                {
                  record?.nickname ?
                    <strong className={styles.nickname}>
                      {record?.nickname }
                    </strong>
                    :
                    <em className={ styles.empty }>-</em>
                }

              </Tooltip>
              <div className={styles.userId}>
                {userId.toString(36).toLocaleUpperCase() }
                {
                  record?.accountName &&
                  <>
                    <Divider type="vertical" />
                    <Tooltip title="登录账户名">
                      { record?.accountName }
                    </Tooltip>
                  </>
                }
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: '层级',
      dataIndex: 'level',
      key: 'level',
      render( level, record ){
        return (
          <div>
            { level === 1 && <Tag color="red">一级</Tag> }
            { level === 2 && <Tag color="blue">二级</Tag> }
            { level === 0 && <Tag>N 级</Tag> }

            {
              record?.isAgent &&
                <Tag color="orange">代理</Tag>
            }

          </div>
        )
      },
    },
    {
      title: '加入时间',
      dataIndex: 'created',
      key: 'created',
      render( created ){
        return <Time time={ created } />;
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
              onClick={ () => onDetail( record ) }
            >
              会员
            </Button>

            <Button
              type="link"
              onClick={ () => onProductUsage( record ) }
            >
              产品用量
            </Button>


            <Button
              type="link"
              size="small"
              onClick={ () => record ? onPassword( record ) : null }
            >
              改密
            </Button>


            <DealerCustomerListBuyVipCard
              targetUserId={ record?.userId || 0 }
              canBuyVipCard={ !! record?.canBuyVipCard }
              onCanBuyVipCard={ ( canBuyVipCard ) => onCanBuyVipCard( canBuyVipCard ) }
            />

            <Button
              type="primary"
              size="small"
              disabled
              onClick={ () => onAgentEdit( record ) }
            >
              代理
            </Button>
          </Space>
        );
      },
    },
  ];

  const [ listData, setListData ] = useState<Dealer.CustomerList[]>([]);
  const {
    run,
    loading,
    error,
  } = useRequest(( current = pagination.current, formQuery = query ) => DealerController.customerList({
      startTime: Math.floor( formQuery.day[0] * 0.001 ),
      endTime: Math.floor( formQuery.day[1] * 0.001 ),
      keyword: formQuery.keyword,
      friendType: formQuery.friendType,
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

  const onPage = ( current = 1 ) => {
    pagination.current = current || 1;
    setPagination({...pagination});
    run( pagination.current )
  }

  const onQuery = ( query ) => {
    setQuery({...query});
    run( 1, query );
  }

  const onDetail = ( itemData?: Dealer.CustomerList ) => {
    if( ! itemData ){
      return;
    }
    const dialog = drawer({
      title: '会员资料：'+ ( itemData.nickname || itemData.userId ) ,
      content: (
        <DealerCustomerDetail
          userId={ itemData.userId }
          isAgent={ itemData.isAgent }
        />
      ),
      width: 820,
    });
  }

  const onProductUsage = (itemData?: Dealer.CustomerList ) => {
    if( ! itemData ){
      return;
    }
    const dialog = drawer({
      title: '产品用量：'+ ( itemData.nickname || itemData.userId ) ,
      content: (
        <DealerCustomerProductUsage
          userId={ itemData.userId }
        />
      ),
      width: 820,
    });
  }

  const onPassword = ( itemData: Dealer.CustomerList ) => {
    const dialog = drawer({
      title: <div>重置密码 <small>{ ( itemData.nickname || itemData.accountName ) }</small></div> ,
      content: (
        <DealerCustomerPassword
          targetUserId={ itemData?.userId || 0  }
        />
      ),
      width: 600,
    });
  }

  const onAgentEdit = ( itemData?: Dealer.CustomerList ) => {
    if( ! itemData ){
      return;
    }
    const dialog = drawer({
      title: '代理比例：'+ ( itemData.nickname || itemData.userId ) ,
      content: (
        <DealerCustomerDetailAgent
          userId={ itemData.userId }
          isAgent={ itemData.isAgent }
          onSuccess={ () => {
            run();
            dialog.destroy();
          }}
        />
      ),
      width: 600,
    });
  }

  const onCanBuyVipCard = ( canBuyVipCard: boolean ) => {
    run()
  }

  return (
    <div className={ styles.list }>
      <LayoutContent
        title="好友列表"
        subtitle={ <>{ pagination.total }人</> }
        leftExtInfo=""
      >
        <DealerCustomerListQuery
          query={ query }
          onChange={ q => onQuery(q) }
        />

        <Table< Dealer.CustomerList>
          size="small"
          bordered={ true }
          rowKey={ ( record, index ) => `${ record.id }-${ index }-${ record.canBuyVipCard ? 1 : 0 }` }
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

export default  DealerCustomerList;
