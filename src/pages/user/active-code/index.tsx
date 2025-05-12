import React, { useEffect, useState } from 'react';
import {Radio, Button, Form, Input, Card} from 'antd';

import {CrownOutlined, UserOutlined} from '@ant-design/icons';
import { useRequest } from '@umijs/hooks';

import styles from './index.less';
import * as VipCardController from '@/service/api/VipCardController';
import toast from "@/lib/toast";
import UserLayout from "@/pages/user/_layout";
import LayoutContent from "@/ui/LayoutContent";
import updateUserInfo from "@/lib/updateUserInfo";


interface Props{
  onActive: () => void;
}
const UserProfileVipCard: React.FC<Props>
  = ({
       onActive,
     }) => {
  const [form] = Form.useForm();

  const { run, loading, error } = useRequest(( vipCardCode: string ) => VipCardController.activate({ vipCardCode }), {
    manual: true,
    onSuccess(data) {

      form.resetFields();
      toast('已经激活');
      updateUserInfo();

      onActive?.();

    },
    onError(){

    }
  });

  const onFinish = (postData: any ) => {
    const vipCardCode = postData.vipCardCode?.replace(/^\s*AI\d?-/i, '')
      .replace(/\s+/g, '').toLocaleUpperCase();
    if( ! vipCardCode ){
      return;
    }
    run( vipCardCode );
  };

  const onupdateUserInfo = () => {
    updateUserInfo();
  }

  return (
    <UserLayout>
      <LayoutContent
        title="激活码"
        subtitle="激活会员"
        className={styles.activeCode}
      >
        {/*AIx-AAAA-BBBB-CCCC: x 表示会员等级，仅用来方便肉眼可见，无其他意义； */}
        <div className={styles.form}>
          <Form
            form={form}
            disabled={loading}
            onFinish={onFinish}
          >
            <Form.Item
              name="vipCardCode"
              rules={[
                {required: true, message: '请输入'},
                {pattern: /^\s*(AI\d-)?[A-Z0-9-]{14,}\s*$/i, message: '类似：AI-AAAA-BBBB-CCCC'},
              ]}
            >
              <Input
                addonAfter={(
                  <Button
                    htmlType="submit"
                    type="link"
                    icon={<CrownOutlined/>}
                    size="small"
                    loading={loading}
                  >
                    激活
                  </Button>
                )}
                allowClear
                placeholder="类似: AI-AAAA-BBBB-CCCC"
              />
            </Form.Item>
          </Form>
        </div>
      </LayoutContent>
    </UserLayout>
  );
};

export default UserProfileVipCard;
