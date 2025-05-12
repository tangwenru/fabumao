
import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Card, Col, Tag, Form, Input, Divider, Upload, Row} from 'antd';

import styles from './my-up-info.less';
import LayoutContent from "@/ui/LayoutContent";
import {useRequest} from "@umijs/hooks";
import * as UserController from "@/service/api/UserController";
import PageContentWarp from "@/ui/PageContentWarp";
import {StopOutlined} from "@ant-design/icons";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";
import MakeQrImage from "@/lib/makeQrUrl";

const UserShareMyUpInfo = () => {
  const [ myUpInfo, setMyUpInfo ] = useState<User.MyUpInfo>({
    userId: 0,
    nickname: '',
    gender: 2,
    avatarUrl: '',
    weQrUrl: '',
  });

  const [ siteInfo, setSiteInfo ] = useState( getLocalSiteInfo() );


  const {
    loading,
    error,
    run,
  } = useRequest(() => UserController.getMyUpInfo(),
    {
      manual: true,
      onSuccess( result ){
        const data = result;
        // setUserInfo( data );
        setMyUpInfo( data )
      }
    },
  );

  useEffect(() => {
    run();
    setSiteInfo( getLocalSiteInfo()  );
  }, []);

  return (
    <PageContentWarp
      loading={ loading }
      error={ error }
      onReload={ run }
      className={ styles.shareMyUp }
    >
      <Row gutter={ 12 }>
        <Col span={ 12 }>
          <div className={ styles.upInfo }>
          <Card
            title="我的领路人"
            extra={(
              <div className={ styles.baseInfo }>
                <Avatar
                  className={ styles.avatar }
                  size={ 24 }
                  icon={ <img src={ myUpInfo.avatarUrl } alt="" /> }
                />
                <div className={ styles.info }>
                  <div className={ styles.nickname }>
                    { myUpInfo.userId.toString(36).toLocaleUpperCase() }
                    <small>{ myUpInfo.nickname && `(${ myUpInfo.nickname })` }</small>
                  </div>
                  {/*<div>*/}
                  {/*  <Gender gender={ myUpInfo.gender } />*/}
                  {/*</div>*/}
                </div>
              </div>
            )}
          >
            {
              myUpInfo.weQrUrl ?
                <>
                    <div className={ styles.qrImage }>

                      <MakeQrImage url={ myUpInfo.weQrUrl } fgColor="#2aae67" size={ 300 } />
                      <div className={ styles.alt }>
                        微信扫一扫，添加好友
                      </div>
                    </div>

                </>
                :
                <div className={ styles.noQr }>
                  <StopOutlined className={ styles.icon} />
                  <p>没有设置微信二维码</p>
                </div>
            }
          </Card>
          </div>
        </Col>

        <Col span={ 12 }>
          <Card title="我的经销商">
            <div className={ styles.qrImage }>
              <MakeQrImage
                className={ styles.qr }
                url={ siteInfo.dealerWeContactQrUrl  }
                size={ 120 }
                fgColor="#2aae67"
              />
              <div className={ styles.alt }>
                微信扫一扫，添加好友
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </PageContentWarp>
  );
}

export default UserShareMyUpInfo;
