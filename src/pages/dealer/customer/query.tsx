import React, {useEffect, useState} from 'react';
import {
  Form, Select, Space, DatePicker, Button, Input,
} from 'antd';
import styles from './query.less';
import dayjs from "dayjs";

interface Props{
  query: Dealer.CustomerListQuery;
  onChange: ( query: Dealer.CustomerListQuery ) => void;
}

interface FormData{
  friendType: Dealer.FriendType;
  day: [ dayjs.Dayjs | undefined, dayjs.Dayjs | undefined ];
  keyword: string;
}

const  DealerCustomerListQuery: React.FC<Props>
  = ({
       query,
       onChange = () => {},
     }) => {
  const [form] = Form.useForm();

  const onFinish = ( values: FormData ) => {
    const day0 = parseInt( `${ values.day?.[0]?.valueOf() }` ) || 0;
    const day1 = parseInt( `${ values.day?.[1]?.valueOf() }` ) || 0;
    const keyword = values.keyword?.replace(/^\s+|\s+$/ig, '') || '';

    const data: Dealer.CustomerListQuery = {
      friendType: values.friendType,
      day: [ day0, day1 ],
      keyword,
    };
    onChange(data);
  }

  return (
    <div className={ styles.query }>
      <Form
        form={ form }
        initialValues={{
          friendType: query.friendType,
          keyword: '',
        }}
        onFinish={ onFinish }
      >
        <Space wrap>
          <Form.Item
            name="friendType"
          >
            <Select className={ styles.friendType }>
              <Select.Option value="">全部好友</Select.Option>
              {/*<Select.Option value="down-1">仅一级好友</Select.Option>*/}
              {/*<Select.Option value="down-2">仅二级好友</Select.Option>*/}
              <Select.Option value="agent">所有代理</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="day"
          >
            <DatePicker.RangePicker
              className={ styles.day }
              dateFormat="YYYY/MM/DD"
              disabledDate={ ( currentDate ) => {
                if( currentDate.valueOf() > Date.now() + 864000 ){
                  return true;
                }
                if( currentDate.valueOf() < 1514736000000 ){
                  return true;
                }
              }}
            />
          </Form.Item>

          <Form.Item
            name="keyword"
          >
            <Input
              placeholder="账号名/用户编号/卡密"
              className={ styles.keyword }
              allowClear
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Space>
      </Form>
    </div>
  )
};

export default  DealerCustomerListQuery;
