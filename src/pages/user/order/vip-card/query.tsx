import React, {useState} from 'react';
import {
  Form, Select, Space, Button, Input, Tag,
} from 'antd';
import styles from './query.less';
import * as VipCardController from '@/service/api/VipCardController';
import {useRequest} from "@umijs/hooks";
import {UnorderedListOutlined} from "@ant-design/icons";
import ProductLogo from "@/component/product/logo";

interface Props{
  query: VipCard.ListQuery;
  onQuery: ( query: VipCard.ListQuery ) => void;
}

const  VipCardListQuery: React.FC<Props>
  = ({
       query,
       onQuery = () => {},
     }) => {
  const [form] = Form.useForm();
  const [listKind, setListKind] = useState<VipCard.ListKind[]>([]);
  const { run, loading, error } = useRequest(
    () =>
      VipCardController.listKind(),
    {
      onSuccess( result) {
        setListKind( result );
      },
    },
  );

  const onFinish = ( values: VipCard.ListQuery ) => {
    values.keyword = values.keyword.replace(/^AI-/ig, '');
    if( values.keyword ){
      form.setFieldsValue({
        targetTypeId: 0,
      });
    }
    onQuery( values );
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
            name="targetTypeId"
            className={ styles.targetTypeId }
          >
            <Select
              loading={ loading }
            >
              <Select.Option value={ 0 }><UnorderedListOutlined /> 所有类别</Select.Option>
              {
                listKind.map( items => {
                  let color = undefined;
                  if( items.vipMonthTitle === '年卡' ){
                    color = '#C00';
                  }else if( items.vipMonthTitle === '半年卡' ) {
                    color = 'blue';
                  }
                  return (
                    <Select.Option value={ items.targetTypeId } key={ items.targetTypeId }>
                      <ProductLogo productType={ items.productType } /> { items.productName } <small style={{ color, }}>{ items.vipMonthTitle }</small>
                    </Select.Option>
                  );
                })
              }
            </Select>
          </Form.Item>

          {/*<Form.Item*/}
          {/*  name="used"*/}
          {/*  className={ styles.used }*/}
          {/*>*/}
          {/*  <Select*/}
          {/*  >*/}
          {/*    <Select.Option value=""><UnorderedListOutlined /> 所有状态</Select.Option>*/}
          {/*    <Select.Option value="1">*/}
          {/*      <Tag color="orange">已使用</Tag>*/}
          {/*    </Select.Option>*/}
          {/*    <Select.Option value="0">*/}
          {/*      <Tag color="green">未使用</Tag>*/}
          {/*    </Select.Option>*/}
          {/*  </Select>*/}
          {/*</Form.Item>*/}

          <Form.Item
            name="keyword"
          >
            <Input
              placeholder="搜索卡密"
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

export default  VipCardListQuery;
