import React, { useEffect, useState } from 'react';
import {Radio, Button, Form, Input, Row, Col, Divider, Card} from 'antd';

import { UserOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';

import styles from './index.less';
import UserAvatar from '@/component/user/avatar';
import * as UserController from '@/service/api/UserController';
import UserProfileUserVip from '@/pages/user/profile/user-vip';
import PageContentWarp from "@/ui/PageContentWarp";
import getLocalUserInfo from "@/lib/getLocalUserInfo";
import {store } from "@/lib";
import event from "@/lib/event";
import toast from "@/lib/toast";
import UserLayout from "@/pages/user/_layout";
import UserPassword from "@/pages/user/profile/password";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<User.UserInfo>(
    getLocalUserInfo(),
  );
  const [avatarKey, setAvatarKey] = useState(
    userInfo.avatarUrl?.match(/\/([0-9-]+)\.[a-z]+$/i)?.[1] || '',
  );

  const [form] = Form.useForm();

  const { run, loading, error } = useRequest(() => UserController.getInfo(), {
    onSuccess(data) {
      setUserInfo({
        ...userInfo,
        ...data,
      });
      form.setFieldsValue({
        ...data,
      });
    },
  });

  const { run: runSave, loading: loadingSave } = useRequest(
    (data) => UserController.saveInfo(data),
    {
      manual: true,
      onSuccess(result) {
        toast('保存成功');
        let data = {
          ...userInfo,
          ...result,
        };
        setUserInfo({
          ...data,
        });
        form.setFieldsValue({
          ...data,
        });
        store.set('user-info', data);
        event.run('user-info', data);
      },
    },
  );

  const onFinish = (postData: FormData) => {
    runSave({
      ...postData,
      avatarKey,
    });
  };

  const onAvatarChange = (avatarUrl: string, avatarKey: string) => {
    setAvatarKey(avatarKey);
  };

  useEffect(() => {
    form.setFieldsValue({
      nickname: userInfo.nickname,
      gender: userInfo.gender,
      avatarUrl: userInfo.avatarUrl,
    });
  }, []);

  return (
    <UserLayout>
      <PageContentWarp
        // title="我的资料"
        className={ styles.profile }
        loading={loading}
        error={error}
        onReload={() => run()}
      >
        <div className={ styles.profileContent }>
          <UserProfileUserVip />

          <Card title="我的资料">
            <div className={ styles.form }>
              <Form
                form={form}
                labelCol={{ span: 6 }}
                onFinish={onFinish}
              >
                <Form.Item label="用户编号" name="userId">
                  <strong>{userInfo.id?.toString(36).toLocaleUpperCase()}</strong>
                </Form.Item>

                <Form.Item label="登录账户">
                  { userInfo.accountName }
                </Form.Item>

                <Form.Item
                  label="昵称"
                  name="nickname"
                  rules={[
                    { required: true, message: '请输入昵称' },
                    { max: 12, message: '最多12个字符' },
                  ]}
                >
                  <Input
                    disabled={loadingSave}
                    prefix={<UserOutlined className="input-prefix-icon" />}
                    placeholder="最多20个字符"
                  />
                </Form.Item>

                <Form.Item label="头像">
                  <UserAvatar
                    defaultAvatarUrl={userInfo.avatarUrl}
                    onChange={(avatarUrl, avatarKey) =>
                      onAvatarChange(avatarUrl, avatarKey)
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="gender"
                  label="性别"
                >
                  <Radio.Group disabled={loadingSave}>
                    <Radio value={1}>男</Radio>
                    <Radio value={0}>女</Radio>
                    <Radio value={2}>不告诉你</Radio>
                  </Radio.Group>
                </Form.Item>


                <Form.Item
                  wrapperCol={{ span: 6, offset: 6 }}
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

          <UserPassword />
        </div>
      </PageContentWarp>
    </UserLayout>
  );
};

export default UserProfile;
