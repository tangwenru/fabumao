import React, {useEffect, useState} from 'react';
import {Button, Card, Divider, Form, Input, InputNumber, Radio, Switch, Table, Tag} from "antd";
import styles from './create.less';
import { useRequest } from '@umijs/hooks';
import toast from "@/lib/toast";
import PageContentWarp from "@/ui/PageContentWarp";
import DialogDrawerFooter from "@/ui/DialogDrawerFooter";
import * as DealerAdController from "@/service/dealer/AdController";
import AdClassifyListSelect from "@/pages/dealer/adClassify/adClassifyListSelect";
import AdOpenTarget, {AdOpenTargetList} from "@/pages/dealer/ad/open-target";

interface Props{
  id: number;
  onSuccess: () => void;
}
const AdCreate: React.FC<Props>
  = ({
     id,
       onSuccess ,
     }) => {

  const [ form ] = Form.useForm();

  const {
    run: runDetail,
    loading: loadingDetail,
    error: errorDetail
  } = useRequest(() => DealerAdController.detail({
      id,
    }),
    {
      manual: id == 0,
      onSuccess( result ){
        form.setFieldsValue({
          ...result,
        });
      }
    },
  );

  const { run: runPost, loading: loadingPost } = useRequest(
    ( data: DealerAd.CreateQuery ) =>
      DealerAdController.create({
        ...data,
        id,
      }),
    {
      manual: true,
      onSuccess(result) {
        toast('已经保存');
        onSuccess()
      },
    },
  );

  const onFinish = ( values: DealerProductTry.Create ) => {
    runPost({
      ...values,
    });
  }

  return (
    <PageContentWarp
      loading={ loadingDetail }
      error={ errorDetail}
      onReload={ () => runDetail() }
      className={`${ styles.create } `}
    >
      <Form
        form={ form }
        disabled={ loadingPost }
        initialValues={{
          adClassifyId: 0,
        }}
        labelCol={{
          span: 5,
        }}
        onFinish={ onFinish }
      >

        <AdClassifyListSelect
          label="分类"
        />

        <Form.Item
          name="title"
          label="名称"
          rules={[
            { required: true, message: '请输入', }
          ]}
        >
          <Input
            placeholder="输入展示名称"
          />
        </Form.Item>

        <Form.Item
          label="类型"
          name="openTarget"
        >
          <Radio.Group>
            {
              AdOpenTargetList.map( item => (
                <Radio value={ item.openTarget }>
                  <AdOpenTarget openTarget={ item.openTarget } />
                </Radio>
              ))
            }
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="网址"
          name="url"
          rules={[
            { required: true, message: '请填写', }
          ]}
        >
          <Input placeholder="请输入网址" />
        </Form.Item>

        <Form.Item
          label="是否启用"
          name="enabled"
        >
          <Switch
            checkedChildren="已启用"
            unCheckedChildren="已禁用"
          />
        </Form.Item>

        <DialogDrawerFooter>
          <Button
            type="primary"
            loading={ loadingPost }
            htmlType="submit"
          >
            确定
          </Button>
        </DialogDrawerFooter>
      </Form>
    </PageContentWarp>
  );
};

export default AdCreate;
