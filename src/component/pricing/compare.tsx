import styles from './compare.module.scss';
import React, {useEffect, useState} from 'react';
import {Button, Table} from "antd";
import {
  CheckCircleFilled, CloseCircleFilled,
} from "@ant-design/icons";
import SoftPricingCompareData from "@/component/pricing/compare-data";
import {getBaseConfigEnv} from "../../../web-base-config";
import { Buy } from "component-shipinlv";

interface Props{
  productType?: Product.ProductType;
  compareList: Vip.CompareList[];
}

const SoftPricingCompare: React.FC<Props>
  = ({
       productType ,
       compareList,
     }) => {
  const [ listData ] = useState<Vip.TypeCompare[]>([
    ...SoftPricingCompareData( productType ),
    {
      title: ':buy',
    }
  ]);
  const [ columns, setColumns ] = useState<Global.Columns<Vip.TypeCompare>[]>([
    {
      title: '功能',
      dataIndex: 'title',
      key: 'title',
      render( title ){
        return (
          title === ':buy' ?
            ''
            :
            <div className={ styles.title }>{ title }</div>
        )
      }
    },
    ...(() => {
      const list: Global.Columns<Vip.TypeCompare>[] = [];
      const listLen = compareList.length;
      compareList.forEach( item => {
        const dataIndex = `vipLevel${ item.vipLevel }`;
        list.push({
          title: item.monthTitle,
          dataIndex ,
          key: dataIndex,
          width: `${ 70 / listLen }%`,
          render( value, record ){
            return (
              <div className={ styles.value }>
                {
                  record?.title === ':buy' ?
                    <div className={ styles.onBuy }>
                      {
                        item?.price > 0 &&
                        <Buy
                          env={ getBaseConfigEnv() }
                          productKind="vip"
                          vipId={ item?.id || 0 }
                          productCount={ 1 }
                        >
                          <Button type="primary">
                            购买
                          </Button>
                        </Buy>
                      }
                    </div>
                    :
                    <>
                      {
                        typeof value === 'boolean' ? (
                            value ?
                              <CheckCircleFilled className={ styles.allow } />
                              :
                              <CloseCircleFilled className={ styles.notAllow } />
                          )
                          :
                          value
                      }
                    </>
                }
              </div>
            )
          }
        })
      });
      return list;
    })(),
  ]);

  return (
    <div className={ styles.pricingCompare }>
      <Table<Vip.TypeCompare>
        size="small"
        bordered={true}
        className={ styles.table }
        rowKey={(record, index) => `${ index }-${ record.title }`}
        columns={columns}
        dataSource={ listData }
        pagination={ false }
        sticky={{ offsetHeader: 56 }}
      />
    </div>
  );
}

export default SoftPricingCompare;
