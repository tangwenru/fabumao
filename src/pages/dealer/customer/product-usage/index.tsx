import React, {useEffect, useState} from 'react';
import {
  Divider, Select, Space, Button, Form, Table, Tag,
} from 'antd';
import styles from './index.less';
import * as DealerController from "@/service/api/DealerController";
import {useRequest} from "@umijs/hooks";
import PageContentWarp from "@/ui/PageContentWarp";
import {AlignLeftOutlined} from "@ant-design/icons";

interface Props{
  userId: number;
}
const  DealerCustomerProductUsage: React.FC<Props>
  = ({
       userId,
     }) => {
  const [ form ] = Form.useForm();
  const [ formData, setFormData ] = useState<Dealer.CustomerProductUsageQuery>({
    userId,
    productType: '',
    timeType: 'day',
  });

  const [ listData, setListData ] = useState<Dealer.CustomerProductUsageList[]>([]);

  const columns: Global.Columns<Dealer.CustomerProductUsageList>[] = [
    {
      title: '日期',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '失败数量',
      dataIndex: 'failCount',
      key: 'failCount',
      render( failCount ){
        return !failCount ?
          <div className={styles.zero}>0</div>
          :
          <Tag color="red">{failCount}</Tag>
      }
    },
    {
      title: '成功数量',
      dataIndex: 'finishCount',
      key: 'finishCount',
      render( finishCount ){
        return ! finishCount ?
          <div className={ styles.zero }>0</div>
          :
          <Tag color="green">{ finishCount }</Tag>
      }
    },
  ];

  const {
    run,
    loading,
    error,
  } = useRequest(( data = formData ) => DealerController.productUsage(data),
    {
      manual: true,
      onSuccess( list ){
        setListData( list );
      }
    },
  );

  const onFinish = ( data: Dealer.CustomerProductUsageQuery ) => {
    run({
      ...data,
      userId
    });
  }

  return (
    <PageContentWarp
      className={ styles.productUsage }
    >
      <Form
        form={ form }
        initialValues={{
          ...formData,
        }}
        onFinish={ ( e ) => onFinish( e ) }
      >
        <Space>
          <Form.Item
            name="productType"
            className={ styles.productType }
          >
            <Select
              onChange={ productType => {
                formData.productType = productType;
                setFormData({...formData});
              }}
            >
              <Select.Option value="">
                <AlignLeftOutlined /> 选择产品
              </Select.Option>

              <Select.Option value="long-video-sales">
                长视频带货
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="timeType"
            className={ styles.timeType }
          >
            <Select>
              <Select.Option value="day">
                按天
              </Select.Option>
              <Select.Option value="month">
                按月
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              loading={ loading }
              disabled={ ! formData.productType }
              htmlType="submit"
            >
              确定
            </Button>
          </Form.Item>
        </Space>

      </Form>

      <Divider />

      <Table<VipCardOrder.List>
        bordered={true}
        size="small"
        rowKey={(record) => `${record.idKey}`}
        loading={loading}
        columns={columns}
        dataSource={listData}
        pagination={ false }
      />



    </PageContentWarp>
  )
};

export default  DealerCustomerProductUsage;
