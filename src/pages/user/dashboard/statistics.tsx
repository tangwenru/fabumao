import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Avatar, Button, Card, Col, Divider, Popover, Progress, Row, Space, Statistic, Table, Tag, Tooltip} from "antd";
import styles from './statistics.less';
import * as DetectionController from '@/service/api/DetectionTaskController';

import {useRequest} from '@umijs/hooks';
import Time from '@/ui/Time';
import PageContentWarp from "@/ui/PageContentWarp";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloudDownloadOutlined,
  ManOutlined, MinusOutlined,
  PlusCircleFilled, PlusOutlined
} from "@ant-design/icons";
import drawer from "@/lib/drawer";
import Enabled from "@/component/enabled";
import dayjs from "dayjs";
import * as DetectionTaskController from "@/service/api/DetectionTaskController";

interface Props{
  query: DetectionTask.ShopStatisticsQuery;
}
const DetectionStatisticsPage = forwardRef<DetectionTask.ShopStatisticsPageRef, Props>((props, ref) => {
  const { query } = props;

  const StatisticValueStyle = {
    fontSize: 32,
    lineHeight: 1.4,
  };

  const [shopStatistics, setShopStatistics] = useState<DetectionTask.ShopStatistics>({
    passedAmount: 0,
    notPassedAmount: 0,
    shopAmount: 0,
  });

  const {run, loading, error} = useRequest(
    ( postQuery = query) =>
      DetectionTaskController.shopStatistics({
        startTime: Math.floor( postQuery.startTime * 0.001 ) || 0,
        endTime: Math.floor( postQuery.endTime * 0.001 ) || 0,
      }),
    {
      onSuccess(result) {
        setShopStatistics({
          ...shopStatistics,
          ...result,
        });
      },
    },
  );

  const onRun = ( query: DetectionTask.ShopStatisticsQuery ) => {
    run( query );
  }

  useImperativeHandle(ref, () => ({
    onRun,
  }));


  return (
    <div
      className={styles.shopStatisticsPage}

    >
      <Row gutter={ 16 }>
        <Col span={ 8 }>
          <Card  size="small" variant="borderless">
            <Statistic
              title={ <>检查项 <small>/ 条</small></> }
              value={ shopStatistics.passedAmount + shopStatistics.notPassedAmount }
              precision={ 0 }
              valueStyle={StatisticValueStyle}
              suffix=""
            />
            <Divider className={ styles.hr } />
            <div className={ styles.title }>
              <div>门店数 { shopStatistics.shopAmount }<small className={ styles.alt }> 个</small></div>
              <div>

              </div>
            </div>
          </Card>
        </Col>

        {/*<Col span={ 6 }>*/}
        {/*  <Card  size="small" variant="borderless">*/}
        {/*    <Statistic*/}
        {/*      title={ <>巡检报告数</> }*/}
        {/*      value={ shopStatistics.detectionAmount }*/}
        {/*      precision={ 0 }*/}
        {/*      valueStyle={{*/}
        {/*        ...StatisticValueStyle,*/}
        {/*      }}*/}
        {/*      suffix={ <small className={ styles.alt }>%</small> }*/}
        {/*    />*/}
        {/*    <Divider className={ styles.hr } />*/}
        {/*    <div className={ styles.title }>*/}
        {/*      <div>AI 未点评数 <small className={ styles.alt }> 条</small></div>*/}
        {/*      <div>*/}

        {/*      </div>*/}
        {/*    </div>*/}

        {/*  </Card>*/}
        {/*</Col>*/}

        <Col span={ 8 }>
          <Card  size="small" variant="borderless">
            <Statistic
              title={ <>自检通过条数</> }
              value={ shopStatistics.passedAmount }
              precision={ 0 }
              valueStyle={{
                ...StatisticValueStyle,
                color: 'green',
              }}
              suffix=""
            />
            <Divider className={ styles.hr } />
            <div className={ styles.title }>
              <div>通过率 {
                ( shopStatistics.notPassedAmount + shopStatistics.passedAmount ) <= 0 ?
                  '-'
                  :
                  <>
                    { Math.floor( shopStatistics.passedAmount / ( shopStatistics.notPassedAmount + shopStatistics.passedAmount ) * 100 ) } <small className={ styles.alt }> %</small>
                  </>
              }
              </div>
              <div>

              </div>
            </div>
          </Card>
        </Col>

        <Col span={ 8 }>
          <Card  size="small" variant="borderless">
            <Statistic
              title={ <>自检未通过条数</> }
              value={ shopStatistics.notPassedAmount }
              precision={ 0 }
              valueStyle={{
                ...StatisticValueStyle,
                color: '#C00',
              }}
              suffix=""
            />
            <Divider className={ styles.hr } />
            <div className={ styles.title }>
              <div>
                未通过率 {
                ( shopStatistics.notPassedAmount + shopStatistics.passedAmount ) <= 0 ?
                  '-'
                  :
                  <>
                    { Math.floor( shopStatistics.notPassedAmount / ( shopStatistics.notPassedAmount + shopStatistics.passedAmount ) * 100 ) } <small className={ styles.alt }> %</small>
                  </>
              }
              </div>
              <div>

              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
});


export default DetectionStatisticsPage;
