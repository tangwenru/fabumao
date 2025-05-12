import React, { useEffect, useState } from 'react';
import {Radio, Button, Form, Input, Row, Col, Divider, Card} from 'antd';

import {LockOutlined, UserOutlined} from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';

import styles from './password.less';
import * as UserController from '@/service/api/UserController';
import UserPasswordUserVip from '@/pages/user/profile/user-vip';
import PageContentWarp from "@/ui/PageContentWarp";
import getLocalUserInfo from "@/lib/getLocalUserInfo";
import {store } from "@/lib";
import event from "@/lib/event";
import toast from "@/lib/toast";
import Tool from "component-shipinlv/dist/lib/Tool";
import {savePassword} from "@/service/api/UserController";

const UserPassword = () => {
  const [ siteInfo, setSiteInfo ] = useState( Tool.getLocalSiteInfo() );
  const [form] = Form.useForm();

  const { run: runSave, loading: loadingSave } = useRequest(
    (data) => UserController.savePassword(data),
    {
      manual: true,
      onSuccess(result) {
        toast('保存成功');
        form.resetFields();
      },
    },
  );

  const onFinish = (postData: any) => {
    console.log('onFinish postData:', postData );
    if( postData.password != postData.password2 ){
     Tool.toastError('两次新密码不一样, 请检查')
      return
    }
    runSave({
      ...postData,
    });
  };
 

  return (
    // siteInfo.loginType?.includes( 'account' ) &&
    <div className={styles.userPassword}>
      <Card title="修改密码">
        <div className={styles.form}>
          <Form
            form={form}
            labelCol={{span: 6}}
            onFinish={onFinish}
          >
            <Form.Item
              label="旧密码"
              name="oldPassword"
              rules={[
                {required: true, message: '请输入密码'},
                {min: 6, message: '最少6个字符'},
                {max: 60, message: '最多60个字符'},
              ]}
            >
              <Input.Password
                disabled={loadingSave}
                prefix={<LockOutlined className="input-prefix-icon"/>}
                placeholder="最少6个字符"
              />
            </Form.Item>

            <Form.Item
              label="新密码"
              name="password"
              rules={[
                {required: true, message: '请输入密码'},
                {min: 6, message: '最少6个字符'},
                {max: 60, message: '最多60个字符'},
              ]}
            >
              <Input.Password
                disabled={loadingSave}
                prefix={<LockOutlined className="input-prefix-icon"/>}
                placeholder="最少6个字符"
              />
            </Form.Item>

            <Form.Item
              label="再输入新密码"
              name="password2"
              rules={[
                {required: true, message: '请输入密码'},
                {min: 6, message: '最少6个字符'},
                {max: 60, message: '最多60个字符'},
              ]}
            >
              <Input.Password
                disabled={loadingSave}
                prefix={<LockOutlined className="input-prefix-icon"/>}
                placeholder="最少6个字符"
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{span: 6, offset: 6}}
            >
              <Button
                className={styles['submit']}
                htmlType="submit"
                type="primary"
                loading={loadingSave}
              >
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default UserPassword;
