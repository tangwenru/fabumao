import styles from './index.module.scss';
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row, Tabs} from "antd";
import {
  CaretRightOutlined, LikeFilled,
} from "@ant-design/icons";
import { Link } from "@umijs/max";
import PageContentWarp from "@/ui/PageContentWarp";
import {getBaseConfigEnv} from "../../../web-base-config";
import { Buy, VipList } from "component-shipinlv";
import Contact from "@/component/contact";
import {useRequest} from "@umijs/hooks";
import * as VipController from "@/service/api/VipController";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";
import notification from "@/lib/notification";

interface Props{
  productType?: string; // Global.ApiResult<Vip.Compare>;
}

const SoftPricing: React.FC<Props>
  = ({
       productType= document.location.pathname.match(/\/product\/([a-z0-9-]+)\/pricing/i)?.[1] || '',
     }) => {
  const [ siteInfo, setSiteInfo ] = useState( getLocalSiteInfo() );
  const [ detailData, setDetailData ] = useState<Vip.Compare>({
    list: [],
    productDetail: {

    }
  });
  // const [ isLogin, setIsLogin ] = useState(false );
  // const [ colSpan, setColSpan ] = useState( 8 );
  // const [ isInClient, setIsInClient ] = useState( false );
  //
  const { run, loading, error } = useRequest(
    () =>
      VipController.compare({
        productType,
        domain: document.location.hostname,
      }),
    {
      onSuccess(result) {
        setDetailData( result );
      },
    },
  );

  //
  // useEffect(() => {
  //   setColSpan( window.screen.width > 480 ? 8 : 24 );
  //   setTimeout(() => {
  //     setIsInClient( true );
  //   }, 2000 );
  // }, []);

  return (
    <div className={ styles.pricing }>
      <PageContentWarp
        // error={ error }
        onReload={ () => {
          document.location.reload();
        }}
        className={ styles.pricingWarp }
      >
         <div className="page-warp">
            <h2 className={ styles.pageTitle }>
              {/*<span className={ styles.subName}>{ productDetail?.subName }</span>*/}
              <Link to={ `/product/${ detailData.productDetail?.productType }`}>{ detailData.productDetail?.name }</Link>
              <span className={ styles.pagePos }><CaretRightOutlined className={ styles.icon } />套餐</span>
            </h2>
            <div
              className={ styles.softLogo }
              style={{
                backgroundImage: `url('${ detailData.productDetail?.logoUrl }')`,
              }}
            />

            <div className={ styles.vipList }>
              <VipList
                env={ getBaseConfigEnv() }
                tableScrollY="65vh"
                payMethod={[ 'wepay' ]}
                productType={ productType }
                applyDemoWechatUrl={ siteInfo.domainUserWeContactQrUrl || siteInfo.dealerWeContactQrUrl || siteInfo.adminWechatQr  }
                onBuySuccess={ () => {
                  console.log('onBuySuccess!');
                  notification.success('已经购买成功', '请直接使用');
                  // ( top || window ).window.document.location.reload();
                }}
              />
            </div>


            {/*<Row gutter={ 24 }>*/}
            {/*  {*/}
            {/*    detailData?.list?.map( items => (*/}
            {/*      <Col span={ colSpan } key={ items.id }>*/}
            {/*        <Card*/}
            {/*          title={ <div className={ styles.productTitle }>{ items.monthTitle }</div> }*/}
            {/*          className={ styles.card }*/}
            {/*        >*/}
            {/*          {*/}
            {/*            items.vipLevel > 10 &&*/}
            {/*            <div className={ styles.limitedDiscount }>*/}
            {/*              <LikeFilled /> 限时折扣*/}
            {/*            </div>*/}
            {/*          }*/}
            {/*          <div className={ styles.items }>*/}
            {/*            <div className={ styles.title }>{ items.title }</div>*/}
            {/*            <div className={ styles.operate }>*/}
            {/*              <div className={ styles.price }>*/}
            {/*                <Money value={ items.price } />*/}
            {/*              </div>*/}
            {/*              <div className={ styles.submits }>*/}
            {/*                {*/}
            {/*                  items?.price > 0 &&*/}
            {/*                  <Buy*/}
            {/*                    env={ getBaseConfigEnv() }*/}
            {/*                    productKind="vip"*/}
            {/*                    vipId={ items?.id }*/}
            {/*                    productCount={ 1 }*/}
            {/*                  >*/}
            {/*                    <Button type="primary">立即购买</Button>*/}
            {/*                  </Buy>*/}
            {/*                }*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </Card>*/}
            {/*      </Col>*/}
            {/*    ))*/}
            {/*  }*/}
            {/*</Row>*/}

            {/*<SoftPricingCompare*/}
            {/*  productType={ detailData.productDetail?.productType }*/}
            {/*  compareList={ detailData?.list || [] }*/}
            {/*/>*/}
        </div>
      </PageContentWarp>

      <Contact />
    </div>
  );
}

export default SoftPricing;
