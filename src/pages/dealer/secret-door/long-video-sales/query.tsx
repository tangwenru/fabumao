import React, {useEffect, useState} from 'react';
import {
  Form, Select, Space, DatePicker, Button, Input,
} from 'antd';
import styles from './query.less';
import dayjs from "dayjs";
import {useRequest} from "@umijs/hooks";
import * as DealerController from "@/service/api/DealerController";
import {productCountEdit} from "@/service/api/DealerController";
import toast from "@/lib/toast";

interface Props{
  // userIdKey: string;
  query: DealerSecretDoorLongVideoSales.ListQuery;
  onSubmit: ( query: DealerSecretDoorLongVideoSales.ListQuery ) => void;
}


const  DealerSecretDoorLongVideoSalesListQuery: React.FC<Props>
  = ({
       // userIdKey,
       query,
       onSubmit = () => {},
     }) => {
  const [form] = Form.useForm();
  const [ formData, setFormData ] = useState({
    ...query,
  });

  // const {
  //   run,
  //   loading,
  //   error,
  // } = useRequest(( formQuery = query ) => DealerController.productCountEdit({
  //     ...formQuery,
  //     productType: 'long-video-sales',
  //     userIdKey,
  //   }),
  //   {
  //     manual: true,
  //     onSuccess(){
  //       toast('已经保存')
  //     }
  //   },
  // );

  const onKeyword = ( keyword: string ) => {
    query.keyword = keyword?.replace(/^\s+|\s+$/ig, '') || ''

    setFormData({
      ...query,
    });

    if( ! query.keyword ){
      onSubmit({...query});
    }
  }

  const onFinish = ( values: DealerSecretDoorLongVideoSales.ListQuery ) => {
    values.keyword = values.keyword?.replace(/^\s+|\s+$/ig, '') || '';
    // run( values );

    onSubmit(values);
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
            name="keyword"
          >
            <Input
              placeholder="用户编号/卡密"
              className={ styles.keyword }
              allowClear
              onChange={ e => onKeyword( e.target.value )  }
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" disabled={ ! formData.keyword }>
            搜索
          </Button>
        </Space>
      </Form>
    </div>
  )
};

export default  DealerSecretDoorLongVideoSalesListQuery;
