import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import styles from './index.less';
import {Card} from 'antd';
import PageContentWarp from "@/ui/PageContentWarp";
import {useRequest} from "@umijs/hooks";
import * as DetectionTaskController from "@/service/api/DetectionTaskController";

interface Props{
  query: DetectionTask.ShopStatisticsQuery;
}

const UserDashboardShopPage = forwardRef<DetectionTask.ShopStatisticsPageRef, Props>((props, ref) => {
  const {query} = props;
  const [ listData, setListData ] = useState<DetectionTask.ShopListStatistics[]>( [] );

  const {run, loading, error} = useRequest(
    (postQuery = query ) =>
      DetectionTaskController.shopListStatistics({
        startTime: Math.floor( postQuery.startTime * 0.001 ) || 0,
        endTime: Math.floor( postQuery.endTime * 0.001 ) || 0,
      }),
    {
      onSuccess(result) {
        setListData([...result.list]);
      },
    },
  );


  const onRun = ( query: DetectionTask.ShopStatisticsQuery) => {
    run( query );
  }

  useImperativeHandle(ref, () => ({
    onRun,
  }));

  return (
    <PageContentWarp
      className={ styles.userDashboardShop}
      loading={ loading}
      error={ error }
      onReload={ () => run() }
    >

      <Card
        title="门店合格率"
      >
        {
          listData.map((item, index) => {
            const passedPercent = Math.floor( ( item.passedAmount / ( item.passedAmount + item.notPassedAmount ) ) * 100 );
            return (
              <article key={ item.shopId }>
                <div className={ styles.shopName }>
                  { item.shopName }
                </div>
                <div
                  className={ styles.passedPercent }
                >
                  <span
                    className={ styles.passedPercentData }
                    style={{
                      width: `${ passedPercent}%`,
                    }}
                  >
                    { passedPercent }
                    <small>%</small>
                  </span>
                </div>
              </article>
            )
          })
        }
      </Card>
    </PageContentWarp>
  );
});


export default UserDashboardShopPage;
