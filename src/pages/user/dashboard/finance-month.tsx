import {Select, Card, Space, Radio} from 'antd';

import styles from './finance-month.less';
import {useEffect, useRef, useState} from 'react';
import * as StatisticsController from '@/service/api/StatisticsController';
import dayjs from 'dayjs';
import { useRequest } from '@umijs/hooks';
import LayoutContent from "@/ui/LayoutContent";
import { Column as AntDesignPlotsColumn } from '@ant-design/plots';
import Tool from "component-shipinlv/dist/lib/Tool";
const ChartBoxId = 'user-dashboard-finance';

type ShowType = 'true-money' | 'sales';
const UserDashboardFinance = () => {
  const [ salesPriceRatio ] = useState( parseInt( Tool.getQuery('salesPriceRatio') ) || 2 );
  const [ showType  ,  setShowType ] = useState<ShowType>( 'true-money' );
  const [month, setMonth] = useState(dayjs().format('YYYY-MM'));
  const [ dataList, setDataList ] = useState<Statistics.FinanceMonthChartData[]>([]);
  const [result, setResult] = useState<Statistics.FinanceMonth>({
    chartList: [],
    monthList: [],
  });

  const [ userInfo  ] = useState( Tool.getLocalUserInfo() );
  const [ chartList, setChartList] = useState([...result.chartList]);
  const [ monthList, setMonthList] = useState([...result.monthList]);
  // const chartRef = useRef<G2Plot.Column>();
  const [ isShowChart, setIsShowChart ] = useState( false );
  const { run, loading, error } = useRequest(
    (monthSelect = month) =>
      StatisticsController.financeMonth({
        month: monthSelect,
      }),
    {
      manual: true,
      onSuccess(result) {
        result.chartList.forEach((items, index) => {
          items.money = Math.ceil( items.money );
          items.day = ~~dayjs(items.day).format('DD');
        });

        result.monthList.forEach((items, index) => {
          items.money = Math.ceil( items.money );
        });

        onShowData( showType, result );

        setResult({ ...result });
        onChart(showType,[...result.chartList]);
        setIsShowChart( true );
      },
    },
  );

  const onMonthChange = (month: string) => {
    setMonth(month);
    run(month);
  };

  // const onInitChart = (e: HTMLDivElement | null) => {
  //   onChart([...result.chartList]);
  // };

  const onChart = async ( showType: ShowType, data: Statistics.FinanceMonthChartList[] = []) => {
    // 整理数据，day 必须为字符串，不然 他妈的 对不齐
    const dataList: Statistics.FinanceMonthChartData[] = [];
    data.forEach((item) => {
      dataList.push({
        // money: item.money,
        money: showType === 'true-money' ?  Math.ceil( item.money ) : Math.ceil( item.money * salesPriceRatio ),
        day: `${item.day}`,
      });
    });
    // 补齐到月底
    const endDay = ~~dayjs().endOf('month').format('DD');
    const startIndex = data[data.length - 1]?.day || 0;
    for (let day = startIndex + 1; day <= endDay; day++) {
      dataList.push({
        money: 0,
        day: `${day}`,
      });
    }
    setDataList([...dataList]);
  };

  const config = {
    xField: 'day',
    yField: 'money',
    label: {
      // 可手动配置 label 数据标签位置
      // position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {
      min: 1,
    },
    meta: {
      day: {
        alias: '日期',
        min: 1,
      },
      money: {
        alias: '收入',
        min: 0,
      },
    },
    minColumnWidth: 16,
    maxColumnWidth: 30,
  }

  const onShowType = ( showType ) => {
    setShowType( showType );
    onShowData( showType, result );
    onChart(showType, [...result.chartList]);
  }

  const onShowData = ( showType: ShowType, result: Statistics.FinanceMonth ) => {
    const chartList: Statistics.FinanceMonthChartList[] = [];
    result.chartList.forEach((items, index) => {
      chartList.push({
        ...items,
        money: showType === 'true-money' ?  Math.ceil( items.money ) : Math.ceil( items.money * salesPriceRatio )
      });
    });
    setChartList([...chartList]);

    const monthList: Statistics.FinanceMonthMonthList[] = [];
    result.monthList.forEach((items, index) => {
      monthList.push({
        ...items,
        money: showType === 'true-money' ?  Math.ceil( items.money ) : Math.ceil( items.money * salesPriceRatio )
      });
    });
    setMonthList([...monthList]);
  }

  useEffect(() => {
    run();
  }, []);

  return (
    <LayoutContent
      title="收入统计"
      loading={ loading }
      error={ error }
      extInfo={(
        <Space>
          {
            userInfo.id === 1 &&
            <Radio.Group
              value={ showType }
              optionType="button"
              onChange={ ( e ) => {
                onShowType( e.target.value );
              }}
            >
              <Radio value="sales">销售额</Radio>
              <Radio value="true-money">利润</Radio>
            </Radio.Group>
          }
          <Select
            className={styles.month}
            value={month}
            onChange={(month) => onMonthChange(month)}
          >
            { monthList.map((item) => (
              <Select.Option key={item.month} value={item.month}>
                {item.month} <small>/{item.money}元</small>
              </Select.Option>
            ))}
          </Select>
        </Space>
      )}
      className={styles.userDashboardFinance}
    >
      <Card
        // title="收入统计"
      >
        {
        isShowChart &&
          <AntDesignPlotsColumn
            { ...config }
            data={ dataList }
          />
        }
        <div id={ ChartBoxId } />
      </Card>
    </LayoutContent>
  );
};
export default UserDashboardFinance;
