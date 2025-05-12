
import React, {useEffect, useRef, useState} from 'react';
import { Tag, Button, Form, Alert, Upload,  Divider } from 'antd';
import {useRequest} from "@umijs/hooks";
import styles from './index.less';
import {
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import * as DealerController from '@/service/api/DealerController';
import LayoutContent from "@/ui/LayoutContent";
import QrReader from "@/component/qr-reader";
import toast from "@/lib/toast";
import toastError from "@/lib/toastError";
import MakeQrImage from "@/lib/makeQrUrl";
import getObjectURL from "@/lib/getObjectURL";
const UserProfile = () => {
  const [ form ] = Form.useForm();
  const selectFileRef = useRef<File>();
  const [ dealerInfo, setDealerInfo ] = useState<Dealer.Info>({
    domains: [],
    weContactQrUrl: '',
  });

  const [ selectWeQrUrl, setSelectWeQrUrl ] = useState('');

  const upProps = {
    name: 'file',
    accept: ['.png', '.jpg', 'jpeg', 'image/png', 'image/x-png', 'image/jpg', 'image/jepg' ].join(','),
    showUploadList: false,
    maxCount: 1,
    multiple: false,
    customRequest(){
      onUrlFromImage();
    },
    beforeUpload( file: File, ) {
      selectFileRef.current = file;
    },
  };


  const {
    run,
    loading,
    error,
  } = useRequest(() => DealerController.getInfo(),
    {
      onSuccess( result ){
        const data = result;
        setDealerInfo( data );
        setSelectWeQrUrl( data?.weContactQrUrl || '' )
        form.setFieldsValue({
          ...data,
        });
      }
    },
  );

  const {
    run: runSave,
    loading: loadingSave,
  } = useRequest(( data ) => DealerController.saveInfo( data ),
    {
      manual: true,
      onSuccess( result ){
        toast( '保存成功');
      }
    },
  );

  const onUrlFromImage = async () => {
    const file = selectFileRef.current;
    if( ! file ){
      toastError('请选择微信的二维码')
      return ;
    }

    const qrReader = new QrReader();
    const url = await qrReader.read( getObjectURL( file ) ).catch();
    console.log('urlurlurl', url );
    if( ! url ){
      return;
    }
    // 微信： https://u.wechat.com/MDA8pNKUYg2YI
    // 企业微信：https://work.weixin.qq.com/u/vc1c86accd72a6c6f3?v=3.1.20.18331
    if(
      ! /^https:\/\/[a-z0-9-_]+\.wechat\.com\//i.test( url )
    &&
      ! /^https:\/\/work\.weixin\.qq\.com\//i.test( url )
    ){
      toastError('这似乎不是微信的联系二维码吧？')
      // return;
    }
    setSelectWeQrUrl( url );
  }

  const onFinish = async () => {
    runSave({
      weContactQrUrl: selectWeQrUrl,
    });
  }


  return (
    <LayoutContent
      title="经销商资料"
      loading={ loading }
      error={ error }
      onReload={ () => run() }
      className={ styles.dealerInfo }
    >
      <Form
        form={ form }
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        onFinish={ onFinish }
      >
        <Form.Item
          label="推广域名"
        >
          <div className={ styles.domains }>
            {
              dealerInfo.domains.map( domain => (
                <span key={ domain } className={ styles.domain }>
                  <Tag color="blue">{ domain }</Tag>
                </span>
              ))
            }
            {
              dealerInfo.domains.length === 0 &&
              <Alert
                message="你还没配置域名，无法推广，请联系管理员"
                type="error"
                showIcon={ true }
              />
            }
          </div>
        </Form.Item>
        <Form.Item label="对外微信">
          <Upload
            {...upProps}
            disabled={ true || loadingSave }
            listType="picture-card"
          >
            {
              selectWeQrUrl ?
                // <img
                //   src={ makeQrUrl( selectWeQrUrl, '#0bc160') }
                //   alt=""
                //   style={{ width: '100%' }}
                // />
                <MakeQrImage
                  url={ selectWeQrUrl }
                  size={ 100 }
                />
                :
                <div>
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>
                    微信二维码
                  </div>
                </div>
            }
          </Upload>
        </Form.Item>

        {/*<Form.Item*/}
        {/*  wrapperCol={{*/}
        {/*    offset: 4,*/}
        {/*    span: 12,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Divider />*/}
        {/*  <Button*/}
        {/*    className={ styles['submit'] }*/}
        {/*    htmlType="submit"*/}
        {/*    type="primary"*/}
        {/*    loading={ loadingSave }*/}
        {/*    disabled={ ! selectWeQrUrl }*/}
        {/*  >*/}
        {/*    保存*/}
        {/*  </Button>*/}
        {/*</Form.Item>*/}
      </Form>
    </LayoutContent>
  );
}

export default UserProfile;
