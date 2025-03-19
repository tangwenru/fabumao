import React, { useEffect, useState } from 'react';
import {Button, DatePicker, Form, Input, Select, Space, Table, Tag} from 'antd';
import styles from './query.less';
import {AlignLeftOutlined, SearchOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useRequest} from "@umijs/hooks";
import toast from "@/lib/toast";
import * as ShopController from "@/service/api/ShopController";
import dayjs from "dayjs";

interface Props{
  defaultQuery: DetectionTask.ShopStatisticsQuery;
  onQuery: ( query: DetectionTask.ShopStatisticsQuery ) => void;
  // onChange: ( query: DetectionTask.ShopStatisticsQuery ) => void;
}
const DetectionQuery: React.FC<Props>
  = ({
       defaultQuery,
       onQuery = () => {},
       // onChange  = () => {},
     }) => {
  const [ form ] = Form.useForm();

  const onFinish = ( values: any ) => {
    console.log('dash query values:', values );
    onQuery({
      ...defaultQuery,
      ...values,
      startTime: values.date?.[0]?.startOf('day').valueOf(),
      endTime: values.date?.[1]?.endOf('day').valueOf(),
    });
  }

  return (
    <div className={`${ styles.query } `}>
      <Form
        form={ form }
        initialValues={{
          ...defaultQuery,
          date: [dayjs( defaultQuery.startTime ), dayjs( defaultQuery.endTime ) ],
        }}
        // onChange={ e => onChange( form.getFieldsValue() ) }
        onFinish={ onFinish }
      >
        <Space wrap>
          <Form.Item
            name="date"
          >
            <DatePicker.RangePicker
              disabledDate={ e => {
                return e.valueOf() > dayjs().endOf('day').valueOf() ;
              }}
              onChange={ e => {
                form.submit();
              }}
            />
          </Form.Item>

          {/*<Button*/}
          {/*  type="primary"*/}
          {/*  htmlType="submit"*/}
          {/*  loading={ loading }*/}
          {/*  // disabled={ loadingCustomerOrganization }*/}
          {/*  icon={ <SearchOutlined /> }*/}
          {/*>*/}
          {/*  搜索*/}
          {/*</Button>*/}
        </Space>
      </Form>
    </div>
  );
};

export default DetectionQuery;

