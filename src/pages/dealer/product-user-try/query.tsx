import React, {useEffect, useState} from 'react';
import {
  Form, Select, Space, DatePicker, Button, Input,
} from 'antd';
import styles from './query.less';

interface Props{
  query: DealerProductUserTry.ListQuery;
  onSubmit: ( query: DealerProductUserTry.ListQuery ) => void;
}

const  DealerProductUserTryListQuery: React.FC<Props>
  = ({
       // userIdKey,
       query,
       onSubmit = () => {},
     }) => {
  const [form] = Form.useForm();
  const [ formData, setFormData ] = useState({
    ...query,
  });

  const onFinish = ( values: DealerSecretDoorLongVideoSales.ListQuery ) => {
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

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  )
};

export default  DealerProductUserTryListQuery;
