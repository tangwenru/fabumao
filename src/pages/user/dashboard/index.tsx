import React, {useRef, useState} from 'react';
import styles from './index.less';
import {Card} from 'antd';
import DetectionStatisticsPage from "./statistics";
import PageContentWarp from "@/ui/PageContentWarp";
import DetectionQuery from "./query";
import dayjs from "dayjs";
import {useRequest} from "@umijs/hooks";
import * as DetectionTaskController from "@/service/api/DetectionTaskController";
import UserDashboardShopPage from "./shop";

const UserDashboardPage = () => {
  const shopStatisticsPageRef = useRef<DetectionTask.ShopStatisticsPageRef>(null);
  const shopListStatisticsPageRef = useRef<DetectionTask.ShopListStatisticsPageRef>(null);

  const [pagination, setPagination] = useState<Global.Pagination>({
    current: 1,
    pageSize: 20,
    total: 0,
    simple: true,
  });

  const [ query, setQuery ] = useState<DetectionTask.ShopStatisticsQuery>({
    startTime: dayjs().startOf('day').valueOf(),
    endTime: dayjs().endOf('day').valueOf(),
  });
  //
  // const [ listData, setListData ] = useState<DetectionTask.ShopListStatistics[]>( [] );
  //
  // const {run, loading, error} = useRequest(
  //   (postQuery = query, current = pagination.current ) =>
  //     DetectionTaskController.shopListStatistics({
  //       startTime: Math.floor( postQuery.startTime * 0.001 ) || 0,
  //       endTime: Math.floor( postQuery.endTime * 0.001 ) || 0,
  //     }),
  //   {
  //     onSuccess(result) {
  //       setListData([...result.list]);
  //     },
  //   },
  // );
  
  const onQuery = ( query: DetectionTask.ShopStatisticsQuery ) => {
    setQuery({...query});
    // run(query, 1);
    shopStatisticsPageRef.current?.onRun( query );
    shopListStatisticsPageRef.current?.onRun( query );
  }

  return (
      <PageContentWarp
        className={ styles.userDashboard}
        // loading={loading}
        // error={error}
        // onReload={ () => run() }
        extInfo={(
          <DetectionQuery
            defaultQuery={ query }
            onQuery={ onQuery }
          />
        )}
      >
         <DetectionStatisticsPage
           ref={ shopStatisticsPageRef }
            query={ query }
         />

        <UserDashboardShopPage
          ref={ shopListStatisticsPageRef }
          query={ query }
        />
      </PageContentWarp>
  );
}

export default UserDashboardPage;
