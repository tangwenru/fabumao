import React, {useEffect, useState} from 'react';
import {
  Table,
  Avatar,
  Tag, Button, Space, Switch, Divider, Tooltip, Result,
} from 'antd';
import LayoutContent from "@/ui/LayoutContent";
import styles from './list.less';
import * as DealerController from "@/service/api/DealerController";
import {useRequest} from "@umijs/hooks";
import DealerSecretDoorLongVideoSalesListQuery from "./query";
import SecretDoorLongVideoSalesProductCountCreate from "@/pages/dealer/secret-door/long-video-sales/create";
import Tool from "component-shipinlv/dist/lib/Tool";
import toast from "@/lib/toast";
import PageContentWarp from "@/ui/PageContentWarp";

const  DealerSecretDoorLongVideoSalesList: React.FC
  = ({

     }) => {
  const [ query, setQuery ] = useState<Dealer.CustomerProductUsageDetailQuery>({
    keyword: '',
  });

  const [ pagination, setPagination ] = useState<Global.Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
    simple: true,
    showSizeChanger: false,
  });

  const [ detailData, setDetailData ] = useState<Dealer.CustomerProductUsageDetail>({
    userId: 0,
    userIdKey: '',
    productType: '', // long-video-sales,
    productName: '',
    canUseCount: 0,
    alreadyUsedCount: 0,
    accountName: "",
    historyAlreadyUsedCount: 0
  });
  const {
    run,
    loading,
    error,
  } = useRequest(( formQuery = query ) => DealerController.productUsageDetail({
      productType: 'long-video-sales',
      ...formQuery,
    }),
    {
      manual: true,
      onSuccess( result ){
        setDetailData( result );
      }
    },
  );


  const onQuery = ( query ) => {
    setQuery({...query});
    run( query );
  }

  return (
    <div className={ styles.list }>
      <LayoutContent
        title="■■■ 长视频额度"
        leftExtInfo=""
      >
        <DealerSecretDoorLongVideoSalesListQuery
          query={ query }
          onSubmit={ q => onQuery(q) }
        />

        <PageContentWarp
          loading={ loading }
          error={ error }
          onReload={ () => run() }
        >
          {
            detailData.userIdKey ?
              <SecretDoorLongVideoSalesProductCountCreate
                loading={ loading }
                detailData={ detailData }
                productType="long-video-sales"
                userIdKey={ detailData.userIdKey }
              />
              :
              (
                query.keyword &&
                <Result
                  status="404"
                  title="没找到"
                />
              )
          }
        </PageContentWarp>
      </LayoutContent>
    </div>
  )
};

export default  DealerSecretDoorLongVideoSalesList;
