import React, {useEffect, useState} from 'react';
import {Button, Card, Divider, Form, InputNumber, Switch, Table, Tag} from "antd";
import styles from './create.less';
import * as ProductTryController from '@/service/dealer/ProductTryController';
import { useRequest } from '@umijs/hooks';
import toast from "@/lib/toast";
import PageContentWarp from "@/ui/PageContentWarp";
import DialogDrawerFooter from "@/ui/DialogDrawerFooter";

interface Props{
  itemData: DealerProductTry.List;
  onSuccess: () => void;
  // onFinish: () => void;
}
const DealerProductTryCreate: React.FC<Props>
  = ({
  itemData,
       onSuccess ,
       // onFinish = () => {},
     }) => {

  const [ form ] = Form.useForm();
  const [ formData, setFormData ] = useState<DealerProductTry.List>({
    ...itemData,
  });
  const { run: runPost, loading: loadingPost } = useRequest(
    ( data: DealerProductTry.Create ) =>
      ProductTryController.create( data ),
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
      productType: itemData.productBaseInfo.productType,
    });
  }

  return (
    <PageContentWarp
      className={`${ styles.create } `}
    >
      <Form
        form={ form }
        disabled={ loadingPost }
        initialValues={{
          ...itemData,
        }}
        labelCol={{
          span: 5,
        }}
        onFinish={ onFinish }
      >
        <Form.Item
          label="产品名称"
        >
          <Tag color="blue">{ itemData.productBaseInfo.name }</Tag>
        </Form.Item>

        <Form.Item
          label="试用时长"
          name="tryHour"
        >
          <InputNumber
            addonBefore=""
            addonAfter="小时"
            min={ 0 }
            max={ 360 }
            precision={ 0 }
          />
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

export default DealerProductTryCreate;
