import React, {useEffect, useState} from 'react';
import {
  Table,
  Avatar,
  Tag, Button, Space,
} from 'antd';
import LayoutContent from "@/ui/LayoutContent";
import styles from './list.less';
import * as UserDealerRatioController from "@/service/dealer/UserDealerRatioController";
import * as UserDealerController from "@/service/dealer/UserDealerController";
import {useRequest} from "@umijs/hooks";
import DealerRatioForm from "@/pages/dealer/ratio/form";
import drawer from "@/lib/drawer";

const  DealerRatioList: React.FC
  = ({

     }) => {
  const columns: Global.Columns<UserDealerRatio.List>[] = [
    {
      title: '产品名',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '经销商提成比例',
      dataIndex: 'dealerRatioPercent',
      key: 'dealerRatioPercent',
      render( dealerRatioPercent, record ){
        return (
          <div>
            { dealerRatioPercent }<small>%</small>
          </div>
        )
      },
    },

    // {
    //   title: '操作',
    //   dataIndex: 'x',
    //   key: 'x',
    //   render( x, record, i ){
    //     return (
    //       <Space>
    //         <Button type="link" onClick={ () => onEdit( i ) }>编辑</Button>
    //       </Space>
    //     );
    //   },
    // },
  ];

  const [ listData, setListData ] = useState<UserDealerRatio.List[]>([]);
  const {
    run,
    loading,
    error,
  } = useRequest(() => UserDealerRatioController.list(),
    {
      onSuccess( result ){
        setListData( result );
      }
    },
  );

  const [ detailData, setDetailData ] = useState<UserDealer.Detail>({
    id: 0,
    userId: 0,
    agentMaxRatioPercent: 0,
    canWithdraw: false,
    weContactQrUrl: '',
    enabled: true,
    created: 0,
  });
  const {
    run: runUserDealer,
    loading: loadingUserDealer,
  } = useRequest(() => UserDealerController.detail(),
    {
      onSuccess( result ){
        setDetailData( result );
      }
    },
  );

  const onEdit = ( index = 0 ) => {
    const itemData = listData[ index ];
    drawer({
      title: '编辑代理提成和最大比例',
      content: (
        <DealerRatioForm
          itemData={ itemData }
        />
      ),
      width: 680,
    });
  }

  return (
    <div className={ styles.list }>
      <LayoutContent
        title="经销商推广比例"
        extInfo={(
          <div>
            分给代理最多: <strong>{ detailData.agentMaxRatioPercent }<small>%</small></strong>
          </div>
        )}
      >
        <Table<UserDealerRatio.List>
          size="small"
          bordered={ true }
          rowKey={ ( record ) => `${ record.productType }` }
          loading={ loading }
          columns={ columns }
          dataSource={ listData }
          pagination={ false }
        />
      </LayoutContent>
    </div>
  )
};

export default  DealerRatioList;
