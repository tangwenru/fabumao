import React, {useEffect, useState} from 'react';
import {
  Form, Select, Space, DatePicker, Button, Input,
} from 'antd';
import styles from './query.less';
import dayjs from "dayjs";
import {useRequest} from "@umijs/hooks";
import * as DealerAdClassifyController from "@/service/dealer/AdClassifyController";
import ProductLogo from "@/component/product/logo";
import * as ProductController from "@/service/api/ProductController";

interface Props{
  query: DealerAdClassify.ListQuery;
  onChange: ( query: DealerAdClassify.ListQuery ) => void;
}

const  DealerAdListQuery: React.FC<Props>
  = ({
       query,
       onChange = () => {},
     }) => {
  const [form] = Form.useForm();
  const [ productList, setProductList ] = useState<Product.List[]>([]);

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

  const onFinish = ( data: DealerAdClassify.ListQuery ) => {
    onChange( data );
  }

  return (
    <div className={ styles.query }>
      <Form
        form={ form }
        initialValues={{
          ...query,
        }}
        onFinish={ onFinish }
      >
        <Space wrap>
          <Form.Item
            name="productType"
            className={ styles.productList }
          >
            <Select
              popupClassName={ styles.productList }
            >
              <Select.Option value="">全部产品</Select.Option>
              {
                productList.map( item => (
                  <Select.Option value={ item.productType } key={ item.productType }>
                    <span className={ styles.logoUrl } style={{ backgroundImage: `url('${ item.logoUrl }')` }} />
                    { item.name }
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Space>
      </Form>
    </div>
  )
};

export default  DealerAdListQuery;
