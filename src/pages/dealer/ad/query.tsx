import React, {useEffect, useState} from 'react';
import {
  Form, Select, Space, DatePicker, Button, Input,
} from 'antd';
import styles from './query.less';
import dayjs from "dayjs";
import {useRequest} from "@umijs/hooks";
import ProductLogo from "@/component/product/logo";
import adClassifyListSelect from "@/pages/dealer/adClassify/adClassifyListSelect";
import AdClassifyListSelect from "@/pages/dealer/adClassify/adClassifyListSelect";

interface Props{
  query: DealerAd.ListQuery;
  onChange: ( query: DealerAd.ListQuery ) => void;
}

const  DealerAdListQuery: React.FC<Props>
  = ({
       query,
       onChange = () => {},
     }) => {
  const [form] = Form.useForm();


  const onFinish = ( data: DealerAd.ListQuery ) => {
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
          <AdClassifyListSelect
            width={ 300 }
          />

          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Space>
      </Form>
    </div>
  )
};

export default  DealerAdListQuery;
