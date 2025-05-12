import React, {useEffect, useState} from 'react';
import {
  Table, Divider ,
} from 'antd';
import styles from './detail.less';
import * as DealerController from "@/service/api/DealerController";
import {useRequest} from "@umijs/hooks";
import Time from "@/ui/Time";
import PageContentWarp from "@/ui/PageContentWarp";
import ProductType from "@/component/product-type";

interface Props{
  userId: number;
  isAgent: boolean;
}
const  DealerCustomerDetail: React.FC<Props>
  = ({
       userId,
       isAgent,
     }) => {
  const columns: Global.Columns<UserAuth.UserVipInfo>[] = [
    {
      title: '产品名',
      dataIndex: 'productName',
      key: 'productName',
      render(productName, record) {
        return <ProductType productType={ record.productType } productName={ productName } />;
      },
    },
    {
      title: '等级',
      dataIndex: 'vipLevelName',
      key: 'vipLevelName',
      render(vipLevelName, record) {
        return <div>{vipLevelName}</div>;
      },
    },
    //
    {
      title: '提成比例',
      dataIndex: 'ratioDownPercent1',
      key: 'ratioDownPercent1',
      render(ratioDownPercent1, record) {
        return (
          <>
            {ratioDownPercent1}
            <small>%</small>
            <Divider type="vertical" />
            {record?.ratioDownPercent2}
            <small>%</small>
          </>
        );
      },
    },
    {
      title: '过期时间',
      dataIndex: 'expired',
      key: 'expired',
      render(expired, record) {
        return <Time time={expired} />;
      },
    },
  ];

  const [ detailData, setDetailData ] = useState<Dealer.CustomerDetail>({
    userVipList: [],
  });
  const {
    run,
    loading,
    error,
  } = useRequest(() => DealerController.customerDetail({
      userId,
    }),
    {
      onSuccess( result ){
        setDetailData( result );
      }
    },
  );

  return (
    <div className={ styles.detail }>
      <PageContentWarp

      >
        <div className={ styles.titles }>会员身份信息</div>
        <Table<UserAuth.UserVipInfo>
          size="small"
          bordered={ true }
          rowKey={ ( record ) => `${ record.userId }` }
          loading={ loading }
          columns={ columns }
          dataSource={ detailData.userVipList }
          pagination={ false }
        />
      </PageContentWarp>
    </div>
  )
};

export default  DealerCustomerDetail;
