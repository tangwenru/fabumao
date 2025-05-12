import React, { useEffect, useState } from 'react';
import {
  Tag,
  Form,
  Input,
  Divider,
  Tooltip,
} from 'antd';

import {
  QuestionCircleFilled,
  BarsOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';

import styles from './index.less';
import * as UserDomainController from '@/service/api/UserDomainController';
import LayoutContent from '@/ui/LayoutContent';
import UserDomainCname from '@/pages/user/domain/cname';
import getLocalUserInfo from "@/lib/getLocalUserInfo";
import toast from "@/lib/toast";
import drawer from "@/lib/drawer";
import MakeQrImage from "@/lib/makeQrUrl";
import UserLayout from "@/pages/user/_layout";

const maxDomainCount = 3;

const UserDomain = () => {
  const [userInfo, setUserInfo] = useState<User.UserInfo>(
    getLocalUserInfo(),
  );
  const [domainList, setDomainList] = useState<UserDomain.List[]>([]);
  const [ cnameDomain, setCnameDomain] = useState('');

  const [form] = Form.useForm();

  const { run, loading, error } = useRequest(
    () => UserDomainController.list(),
    {
      onSuccess(result) {
        if (result.list.length === 0) {
          // onAdd();
        } else {
          setDomainList( result.list );
        }
        setCnameDomain( result.cnameDomain );
      },
    },
  );

  const { run: runSave, loading: loadingSave } = useRequest(
    (data) => UserDomainController.save(data),
    {
      manual: true,
      onSuccess(result) {
        toast('保存成功');
        run();
      },
    },
  );

  const onFinish = (postData: FormData) => {
    const list = domainList.map((item) => {
      return {
        id: item.id,
        domain: item.domain.replace(/\s+/, ''),
      };
    });

    runSave({
      domainList: list,
    });
  };

  const onDel = (index: number) => {
    domainList.splice(index, 1);
    setDomainList([...domainList]);
  };

  const onDomainChange = (index: number, value: string) => {
    domainList[index].domain = value;
    setDomainList([...domainList]);
  };

  const onAdd = () => {
    domainList.push({
      id: Date.now(),
      domain: '',
    });
    setDomainList([...domainList]);
  };

  const onCnameQA = () => {
    drawer({
      title: 'CNAME 设置帮助',
      content: <UserDomainCname cnameDomain={ cnameDomain } />,
      width: 820,
    });
  };

  useEffect(() => {}, []);

  return (
    <UserLayout>
      <LayoutContent
        title="绑定自定义域名"
        subtitle={
          <>
            可以使用自己的域名，对外进行推广
            <Tooltip title="仅支持http，如需支持 https，请联系技术人员">
              <a>
                {' '}
                <QuestionCircleOutlined />
              </a>
            </Tooltip>
          </>
        }
        loading={loading}
        error={error}
        onReload={() => run()}
        className={styles.userDomain}
      >
        <Form
          form={form}
          className={ styles.form }
          // labelCol={{ span: 5 }}
          layout="vertical"
          onFinish={onFinish}
        >
          <article>
            <h2 className={styles.stepTitle}>
              <BarsOutlined /> 第一步 购买域名
            </h2>
            <Divider style={{ margin: '6px 0' }} />
            <Form.Item>
              <div className={styles.noBeiAn}>
                域名无须备案（可在任意域名商购买，比如在阿里云
                <a
                  href="https://wanwang.aliyun.com/domain/searchresult/#/?keyword=test-yuming&suffix=com"
                  target="_blank"
                >
                  购买域名
                </a>
                ）
              </div>

              {domainList.map((items, index) => (
                <div className={styles.domainInput} key={`${items.id}`}>
                  <Input
                    value={items.domain}
                    disabled={items.id > 0 || loadingSave}
                    addonBefore="http://"
                    placeholder="请输入域名，支持中文域名"
                    onChange={(e) => onDomainChange(index, e.target.value)}
                  />
                  {/*<Popconfirm*/}
                  {/*  title="确定要删除？"*/}
                  {/*  onConfirm={() => onDel(index)}*/}
                  {/*  okText="确定"*/}
                  {/*  cancelText="取消"*/}
                  {/*  disabled={loadingSave}*/}
                  {/*>*/}
                  {/*  <Button type="link">*/}
                  {/*    <MinusCircleOutlined />*/}
                  {/*  </Button>*/}
                  {/*</Popconfirm>*/}
                </div>
              ))}

              {/*<Button*/}
              {/*  className={styles.add}*/}
              {/*  type="link"*/}
              {/*  icon={<PlusCircleOutlined />}*/}
              {/*  disabled={domainList.length >= maxDomainCount || loadingSave}*/}
              {/*  onClick={onAdd}*/}
              {/*>*/}
              {/*  新增*/}
              {/*</Button>*/}
            </Form.Item>

            {/*<Form.Item*/}
            {/*>*/}
            {/*  <div className={ styles.submits }>*/}
            {/*    <Button*/}
            {/*      className={styles['submit']}*/}
            {/*      htmlType="submit"*/}
            {/*      type="primary"*/}
            {/*      loading={loadingSave}*/}
            {/*    >*/}
            {/*      保存*/}
            {/*    </Button>*/}
            {/*  </div>*/}
            {/*</Form.Item>*/}
          </article>

          <article>
            <h2 className={styles.stepTitle}>
              <BarsOutlined /> 第二步 绑定CNAME
            </h2>
            <Divider style={{ margin: '6px 0' }} />
            <Form.Item>
              <Tag color="red">{ cnameDomain || '_cname.tiangongjian.com' }</Tag>
              <a onClick={onCnameQA}>
                {' '}
                <QuestionCircleFilled />
              </a>
            </Form.Item>
          </article>

          <article>
            <h2 className={styles.stepTitle}>
              <BarsOutlined /> 第三步 联系管理员微信开通
            </h2>
            <Divider style={{ margin: '6px 0' }} />
            <Form.Item
              extra="管理员仅处理需求，网站Bug等技术问题"
            >
              <MakeQrImage
                url="https://u.wechat.com/MP_reDBVS54nn6VEQI3J5H4"
                fgColor="#0cc260"
                size={ 120 }
              />
            </Form.Item>
          </article>
        </Form>
      </LayoutContent>
    </UserLayout>
  );
};

export default UserDomain;
