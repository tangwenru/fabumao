import React, {useEffect, useState} from 'react';
import {Button, Card, Divider, Form, Input, InputNumber, Radio, Select, Switch, Table, Tag} from "antd";
import styles from './create.less';
import stylesQuery from './query.less';
import { useRequest } from '@umijs/hooks';
import toast from "@/lib/toast";
import PageContentWarp from "@/ui/PageContentWarp";
import DialogDrawerFooter from "@/ui/DialogDrawerFooter";
import * as DealerAdClassifyController from "@/service/dealer/AdClassifyController";
import AdClassifyListSelect from "@/pages/dealer/adClassify/adClassifyListSelect";
import AdOpenTarget, {AdOpenTargetList} from "@/pages/dealer/ad/open-target";
import * as ProductController from "@/service/api/ProductController";
import {UnorderedListOutlined} from "@ant-design/icons";
import AdFrom, {AdFromList} from "@/pages/dealer/adClassify/from";

interface Props{
  id: number;
  onSuccess: () => void;
}
const AdClassifyCreate: React.FC<Props>
  = ({
       id,
       onSuccess ,
     }) => {

  const [ form ] = Form.useForm();
  const [ productList, setProductList ] = useState<Product.List[]>([]);

  const {
    run: runDetail,
    loading: loadingDetail,
    error: errorDetail
  } = useRequest(() => DealerAdClassifyController.detail({
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

  const { run: runProductList, loading: loadingProductList } = useRequest(
    () => ProductController.list({
      // productType,
      domain: document.location.hostname,
    }),
    {
      onSuccess(result) {
        setProductList( result );
      },
    },
  );


  const { run: runPost, loading: loadingPost } = useRequest(
    ( data: DealerAdClassify.CreateQuery ) =>
      DealerAdClassifyController.create({
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

  const onFinish = ( values: DealerAdClassify.CreateQuery ) => {
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
          position: '',
          productType: '',
        }}
        labelCol={{
          span: 5,
        }}
        onFinish={ onFinish }
      >
        <Form.Item
          name="productType"
          label="产品"
          rules={[
            { required: true, message: '请选择', }
          ]}
        >
          <Select
            disabled={ id > 0 }
            popupClassName={ stylesQuery.productList }
            className={ stylesQuery.productList }
          >
            <Select.Option value=""><UnorderedListOutlined /> 选择产品</Select.Option>
            {
              productList.map( item => (
                <Select.Option value={ item.productType } key={ item.productType }>
                  <span className={ stylesQuery.logoUrl } style={{ backgroundImage: `url('${ item.logoUrl }')` }} />
                  { item.name }
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>


        <Form.Item
          name="from"
          label="端类型"
        >
          <Radio.Group
            disabled={ id > 0 }
          >
            {
              AdFromList.map( item => (
                <Radio value={ item.from }>
                  <AdFrom from={ item.from } />
                </Radio>
              ))
            }
          </Radio.Group>
        </Form.Item>

        {/*<Form.Item*/}
        {/*  name="title"*/}
        {/*  label="名称"*/}
        {/*>*/}
        {/*  <Input*/}
        {/*    placeholder="输入展示名称"*/}
        {/*  />*/}
        {/*</Form.Item>*/}

        <Form.Item
          label="位置"
          name="position"
          rules={[
            { required: true, message: '请选择', }
          ]}
        >
          <Select>
            <Select value=""><UnorderedListOutlined /> 请选择</Select>
            <Select value="顶部">顶部</Select>
          </Select>
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

export default AdClassifyCreate;
