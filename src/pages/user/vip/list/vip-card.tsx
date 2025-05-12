import React, { useEffect, useState } from 'react';
import {Card, Alert, Form, Select, InputNumber, Button, Result, QRCode} from 'antd';
import styles from './vip-card.less';
import {
  AlertOutlined, UnorderedListOutlined, WechatOutlined,
} from '@ant-design/icons';
import * as VipController from '@/service/api/VipController';
import * as UserPermissionController from '@/service/api/UserPermissionController';
import { useRequest } from '@umijs/hooks';
import { Buy } from 'component-shipinlv';
import PageContentWarp from "@/ui/PageContentWarp";
import Money from "@/ui/Money";
import {getBaseConfigEnv} from "../../../../../web-base-config";
import UserLayout from "@/pages/user/_layout";
import {go} from "@/lib";

const UserVipListVipCard: React.FC = ({}) => {
  const [ form ] = Form.useForm();
  const [ productIndex, setProductIndex ] = useState( -1 );
  const [listData, setListData] = useState<Vip.ListAll[]>([]);
  const [ canBuyVipCard, setCanBuyVipCard ] =useState( false );
  const [ formData, setFormData] = useState<VipCard.CreateOrder>({
    vipId: 0,
    codeCount: 1,
  });
  const { run, loading, error } = useRequest(
    () =>
      VipController.listAll({
        webDomain: document.location.hostname,
      }),
    {
      manual: true,
      onSuccess(result) {
        setListData(result);
      },
    },
  );

  const { run: runCheckUserPermission, loading: loadingCheckUserPermission, error: errorCheckUserPermission } = useRequest(
    () =>
      UserPermissionController.detail(),
    {
      manual: true,
      onSuccess(result) {
        setCanBuyVipCard( result.canBuyVipCard );
        if( result.canBuyVipCard ){
          run();
        }
      },
    },
  );

  // const { run: runSubmit, loading: loadingSubmit } = useRequest(
  //   ( data: VipCard.CreateOrder ) =>
  //     VipCardController.createOrder(data),
  //   {
  //     manual: true,
  //     onSuccess(result) {
  //
  //     },
  //   },
  // );

  const onProduct = ( i: number ) => {
    setProductIndex( i );
    formData.vipId = 0;
    setFormData({...formData});

    form.setFieldsValue({
      vipId: formData.vipId,
    });
  }

  const onVipId = ( vipId = 0 ) => {
    formData.vipId = vipId;
    setFormData({...formData});
  }

  const onCodeCount = ( codeCount: number ) => {
    formData.codeCount = codeCount;
    setFormData({...formData});
  }

  const onFinish = ( values: VipCard.CreateOrder ) => {
    // if( values.vipId <= 0 ){
    //   Tool.toastError('你还没有选择价格');
    //   return;
    // }
    // runSubmit( values );
  }

  const onGo = ( path: string ) => {
    go( path )
  }

  useEffect(() => {
    runCheckUserPermission();
    form.setFieldsValue({
      productIndex,
      ...formData,
    });
  }, []);

  return (
    <UserLayout>
      <div className={styles.vipCardList}>
        <Alert
          className={ styles.cardAlt }
          message={(
            <div>
              卡密，就是会员卡的一种形式；
              <br />
              可以提前都买好，直接送给朋友，送亲戚，送领导；
              <br />
              或者卖培训资料时，赠送月卡；
              {/*<div className={ styles.tips }>*/}
              {/*  <span className={ styles.high }><AlertOutlined /> 省钱小技巧：</span>你先用大号先变成提成比较高的会员，然后用大号推荐小号注册，再用小号买卡密，这样就可以省很多钱！*/}
              {/*</div>*/}
            </div>
          )}
          type="info"
        />

        <PageContentWarp
          loading={ loading || loadingCheckUserPermission }
          error={ error || errorCheckUserPermission }
          onReload={ runCheckUserPermission }
          className={ styles.buyBox }
        >
          <Card
            title="购买卡密"
            extra={(
              <a onClick={ () => onGo('/user/order?tabName=vip-card') }>查看卡密</a>
            )}
          >
            {
              canBuyVipCard ?
                <Form
                  form={ form }
                  onFinish={ onFinish }
                >
                  <Form.Item
                    name="productIndex"
                    label="产品"
                    rules={[
                      { required: true, message: '请选择' }
                    ]}
                  >
                    <Select
                      rootClassName={ styles.vipCardList }
                      onChange={ e => onProduct( e ) }
                    >
                      <Select.Option value={ -1 }>
                        <UnorderedListOutlined /> 请选择产品
                      </Select.Option>
                      {
                        listData.map( ( items, index ) => (
                          <Select.Option key={ items.productDetail.productType } value={ index }>
                            <span className={ styles.productThumb } style={{ backgroundImage: `url('${ items.productDetail.logoUrl }')`}} />
                            { items.productDetail.name }
                          </Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="vipId"
                    label="价格"
                    rules={[
                      { required: true, message: '请选择', }
                    ]}
                  >
                    <Select
                      onChange={ e => onVipId( e )  }
                    >
                      <Select.Option value={ 0 }>
                        <UnorderedListOutlined /> 请选择产品
                      </Select.Option>
                      {
                        listData[ productIndex ]?.list.map( ( items, index ) => (
                          items.month <= 24 && items.price > 0 &&
                          <Select.Option key={ items.id } value={ items.id }>
                            { items.monthTitle } ：<Money value={ items.price } />
                          </Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="codeCount"
                    label="数量"
                    rules={[
                      { required: true, message: '请输入', }
                    ]}
                  >
                    <InputNumber
                      min={ 1 }
                      max={ 5000 }
                      addonAfter="张"
                      precision={ 0 }
                      onChange={ e => onCodeCount( e || 1 ) }
                    />
                  </Form.Item>

                  <Form.Item>
                    <div className={ styles.submits }>
                      <Buy
                        env={ getBaseConfigEnv() }
                        vipId={ formData.vipId || 0 }
                        productCount={ formData.codeCount }
                        productKind="vip-card"
                        disabled={ formData.vipId <= 0 }
                      >
                        <Button type="primary">
                          <WechatOutlined /> 购买付款
                        </Button>
                      </Buy>
                      {/*<Button*/}
                      {/*  type="primary"*/}
                      {/*  icon={ <WechatOutlined /> }*/}
                      {/*  htmlType="submit"*/}
                      {/*  loading={ loadingSubmit }*/}
                      {/*  disabled={ formData.vipId <= 0 }*/}
                      {/*>*/}
                      {/*  购买付款*/}
                      {/*</Button>*/}
                    </div>
                  </Form.Item>
                </Form>
                :
                <Result
                  status="403"
                  title="无权限购买卡密"
                  subTitle="您的账户权限只能在线购买会员"
                />
            }
          </Card>
        </PageContentWarp>
      </div>
    </UserLayout>
  );
};

export default UserVipListVipCard;
