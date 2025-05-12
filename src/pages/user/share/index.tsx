import React, { useEffect, useRef, useState } from 'react';
import {Tag, Form, Input, Divider, Upload, Popconfirm, Tooltip, Card, Space} from 'antd';
import styles from './index.less';
import {
  LoadingOutlined,
  PlusOutlined,
  CloseCircleOutlined, QuestionCircleOutlined, QrcodeOutlined,
} from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';
import * as UserController from '@/service/api/UserController';
import UserShareMyUpInfo from '@/pages/user/share/my-up-info';
import * as UserDomainController from '@/service/api/UserDomainController';
import ContactAdmin from "@/component/contact-admin";
import Copy from "@/ui/copy";
import PageContentWarp from "@/ui/PageContentWarp";
import UserShareImage from "@/pages/user/share/share-image";
import getLocalUserInfo from "@/lib/getLocalUserInfo";
import toastError from "@/lib/toastError";
import drawer from "@/lib/drawer";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";
import MakeQrImage from "@/lib/makeQrUrl";
import toast from "@/lib/toast";
import isInServer from "@/lib/isInServer";
import UserLayout from "@/pages/user/_layout";
import getObjectURL from "@/lib/getObjectURL";
import {getBaseConfigItemApi} from "../../../../web-base-config";
import {RcFile} from "antd/es/upload";
import {UploadChangeParam, UploadFile} from "antd/es/upload/interface";

const UserShare = () => {
  const [userInfo] = useState(getLocalUserInfo());
  const [shareId] = useState(
    (( userInfo.id || userInfo.shareId )?.toString(36) || '0').toLocaleLowerCase(),
  );
  const [domainList, setDomainList] = useState<UserDomain.List[]>([]);
  const [domainListResult, setDomainListResult] = useState<UserDomain.ListResult>({
    list: [],
    defaultPrimaryDomain: '',
    cnameDomain: '',
  });
  const [shareDomain, setShareDomain ] = useState('');
  const [shareDomain2, setShareDomain2 ] = useState('');
  const selectFileRef = useRef<File>();
  const [selectWeQrUrl, setSelectWeQrUrl] = useState('');

  const { run: runDomain, loading: loadingDomain } = useRequest(
    () => UserDomainController.list(),
    {
      manual: true,
      onSuccess(result) {
        setDomainListResult( result );
        setShareDomain( `http://${ shareId }.${ result.defaultPrimaryDomain }` );
        setDomainList(result.list);
      },
    },
  );

  const { run: runSave, loading: loadingSave } = useRequest(
    (data) => UserController.saveWeQrUrl(data),
    {
      manual: true,
      onSuccess(result) {
        toast('保存成功');
        setSelectWeQrUrl(result.weQrUrl);
      },
    },
  );

  const { run, loading, error } = useRequest(() => UserController.getInfo(), {
    manual: true,
    onSuccess(result) {
      setSelectWeQrUrl(result?.weQrUrl || '');
    },
  });

  const upProps = {
    name: 'file',
    disabled: loadingSave,
    // listType: "picture-card",
    accept: [
      '.png',
      '.jpg',
      '.jpeg',
      '.webp',
      'image/png',
      'image/x-png',
      'image/jpg',
      'image/jepg',
    ].join(','),
    showUploadList: false,
    maxCount: 1,
    multiple: false,
    extra: '',
    action: `${ getBaseConfigItemApi() }user/qr/reader?_token_=${ getLocalUserInfo().sid }`,
    // customRequest() {
    //   onUrlFromImage();
    // },
    beforeUpload(file: File) {
      selectFileRef.current = file;
    },
    onChange(info: UploadChangeParam<UploadFile>) {
      if (info.file.status === 'done') {
        const response = info.file.response;

        console.log("info 2:", response )

        if( ! response?.success ){
          toastError( '不能识别二维码:'+ response?.message === 'empty' ? '' : response?.message )
          return;
        }

        const url = response?.data;
        // 微信： https://u.wechat.com/MDA8pNKUYg2YI
        // 企业微信：https://work.weixin.qq.com/u/vc1c86accd72a6c6f3?v=3.1.20.18331
        if (
          !/^https:\/\/[a-z0-9-_]+\.wechat\.com\//i.test(url) &&
          !/^https:\/\/work\.weixin\.qq\.com\//i.test(url)
        ) {
          toastError('这似乎不是微信的联系二维码吧？');
          return;
        }
        runSave({
          weQrUrl: url,
        });
      } else if (info.file.status === 'error') {
        toastError(`上传失败`);
      }
    },
  };

  const onDelUrl = () => {
    runSave({
      weQrUrl: '',
    });
  };


  const onQr = ( url: string ) => {
    drawer({
      content: (
        <UserShareImage
          qrUrl={ url }
        />
      ),
      width: 600,
    })
  }

  const onInit = () => {
    let domain2 = `${ shareId }.${ getLocalSiteInfo().domain }`;
    setShareDomain2( `http://${ domain2 }` );

    runDomain();
    run();
  }

  useEffect(() => {
    onInit();
  }, []);

  return (
    <UserLayout>
      <PageContentWarp
        title=""
        className={styles.userShare}
        loading={ loadingDomain || loading }
      >
        <Card title="我的推广链接" className={ styles.shareLinks }>
          <Form
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 10 }}
          >
            <Form.Item label="提示">
              <Tag color="blue">下面的链接任选一个，喜欢哪个就用那个</Tag>
            </Form.Item>
            {domainList.length > 0 && (
              <>
                {domainList.map((items) => {
                  const url = `http://${items.domain}`;
                  return (
                    <Form.Item label="自定义链接" key={items.id}>
                      {/*<Input*/}
                      {/*  readOnly={true}*/}
                      {/*  value={ url }*/}
                      {/*  addonAfter={(*/}
                      {/*    <>*/}
                      {/*      <Copy content={ url } />*/}
                      {/*      <Divider type="vertical" />*/}
                      {/*      <Tooltip title="查看二维码">*/}
                      {/*        <a onClick={ () => onQr( url ) }><QrcodeOutlined /></a>*/}
                      {/*      </Tooltip>*/}
                      {/*    </>*/}
                      {/*  )}*/}
                      {/*/>*/}
                    </Form.Item>
                  )
                })}
                <Divider />
              </>
            )}

            {/*<Form.Item label="默认推广链接1">*/}
            {/*  <Input*/}
            {/*    addonBefore={(*/}
            {/*      <ContactAdmin*/}
            {/*        title={<a><QuestionCircleOutlined /></a>}*/}
            {/*        alertTitle="如果需要 https:// 协议，请联系管理员手动配置"*/}
            {/*      />*/}
            {/*    )}*/}
            {/*    addonAfter={(*/}
            {/*      <>*/}
            {/*        <Copy content={ shareDomain } />*/}
            {/*        <Divider type="vertical" />*/}
            {/*        <Tooltip title="查看二维码">*/}
            {/*          <a onClick={ () => onQr( shareDomain ) }><QrcodeOutlined /></a>*/}
            {/*        </Tooltip>*/}
            {/*      </>*/}
            {/*    )}*/}
            {/*    readOnly={true}*/}
            {/*    value={ shareDomain }*/}
            {/*  />*/}
            {/*</Form.Item>*/}

            <Form.Item label="默认推广链接">
              {
                shareDomain2 &&
                <Input
                  addonBefore={(
                    <ContactAdmin
                      qrType="admin"
                      title={<a><QuestionCircleOutlined /></a>}
                      alertTitle="如果需要 https:// 协议，请联系管理员手动配置"
                    />
                  )}
                  addonAfter={(
                    <>
                      <Copy content={ shareDomain2 } />
                      <Divider type="vertical" />
                      <Tooltip title="查看二维码">
                        <a onClick={ () => onQr( shareDomain2 ) }><QrcodeOutlined /></a>
                      </Tooltip>
                    </>
                  )}
                  readOnly={true}
                  value={ shareDomain2 }
                />
              }
            </Form.Item>
          </Form>
        </Card>

        <Card title="我的微信" className={ styles.myWechatQr }>
          <Form labelCol={{ span: 3 }} wrapperCol={{ span: 12 }}>
            <Form.Item
              label="上传微信码"
              extra={
                <div className={styles.weUrlFiled}>
                  填写后，网站展示你的二维码
                  {selectWeQrUrl && (
                    <Popconfirm
                      title="确定要删除？"
                      onConfirm={ () => onDelUrl() }
                    >
                      <a className={styles.delQrUrl} onClick={onDelUrl}>
                        <CloseCircleOutlined />
                      </a>
                    </Popconfirm>
                  )}
                </div>
              }
            >
              <Upload
                {...upProps}
              >
                {selectWeQrUrl ? (
                  <MakeQrImage url={ selectWeQrUrl } fgColor="#0bc160" size={ 100 } />
                ) : (
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>微信二维码</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Form>
        </Card>
        <UserShareMyUpInfo />
      </PageContentWarp>
    </UserLayout>
  );
};

export default UserShare;
