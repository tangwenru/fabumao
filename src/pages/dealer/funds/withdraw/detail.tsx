import React, { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {Divider, Button, Tabs, Row, Col, Form, Popconfirm} from 'antd';

import styles from './detail.less';
import WithdrawState from './state';
import PageContentWarp from '@/ui/PageContentWarp';
import {useRequest} from "@umijs/hooks";
import * as DealerWithdrawController from "@/service/dealer/WithdrawController";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 6,
    },
    sm: {
      span: 24,
      offset: 6,
    },
  },
};
interface Props {
  withdrawId: number;
  onSaved: () => void;
  // onStatusChange: () => void;
}

const WithdrawDetail: React.FC<Props>
  = ({
       withdrawId,
       onSaved,
  }) => {
  const [form] = Form.useForm();
  const [ isStatusChange , setStatusChange ] = useState( false );
  const [formLoading, setFormLoading] = useState(false);
  const [detailData, setDetailData] = useState<DealerWithdraw.Detail>({
    id: 0,
    userId: 0,
    dealerId: 0,
    money: 0,
    staffId: 0,
    status: '',
    created: 0,
    updated: 0,
  });
  const {
    run,
    loading,
    error,
  } = useRequest(
    () =>
      DealerWithdrawController.detail({
        withdrawId,
      }),
    {
      onSuccess(result) {
        setDetailData( result );
      },
    },
  );

  const {
    run: runVerify,
    loading: loadingVerify,
  } = useRequest(
    ( isPass: boolean ) =>
      DealerWithdrawController.verify({
        withdrawId,
        isPass,
      }),
    {
      manual: true,
      onSuccess(result) {
        onSaved();
      },
    },
  );

  const onOperate = (isPass: boolean) => {
    runVerify( isPass );
  };

  return (
    <PageContentWarp
      loading={loading}
      error={error}
      onReload={run}
      className={styles.adminStaffFundsWithdrawDetail}
    >
      <Form
        form={form}
        autoComplete="off"
        disabled={ loading || loadingVerify }
      >
        <Form.Item {...formItemLayout} label="用户编号">
          {detailData.userId}
        </Form.Item>

        <Form.Item {...formItemLayout} label="提款金额">
          <span className={styles.outMoney}>{detailData.money}</span>元 &nbsp;
          &nbsp; &nbsp;
          <WithdrawState status={detailData.status} />
        </Form.Item>

        <Form.Item {...formItemLayout} label="手续费">
          {/*3<small>%</small>*/}
          后台设定
        </Form.Item>

        {/*<Form.Item {...formItemLayout} label="申请时间">*/}
        {/*<Tooltip title={ Tool.formatTime(  detailData.created, 'YYYY-MM-DD HH:mm' ) }>*/}
        {/*{*/}
        {/*Tool.getFriendlyDay(  detailData.created )*/}
        {/*}*/}
        {/*</Tooltip>*/}
        {/*</Form.Item>*/}

        {/*<Form.Item {...formItemLayout} label="打款到对方账户">*/}
        {/*  <UserWithdrawAccount*/}
        {/*    url={detailData.account}*/}
        {/*    accountType={detailData.accountType}*/}
        {/*  />*/}
        {/*</Form.Item>*/}

        <Divider />

        <Form.Item {...tailFormItemLayout}>
          <div className="operate">
            <Button
              loading={ loading || loadingVerify }
              disabled={detailData.status !== 'wait-check' || isStatusChange }
              type="primary"
              onClick={(e) => {
                onOperate(true);
              }}
              className={styles.success}
            >
              <CheckOutlined /> 同意提现
            </Button>

            <Popconfirm
              title="你确定要拒绝本次申请？"
              disabled={detailData.status !== 'wait-check' || isStatusChange }
              cancelText="取消"
              okText="确定"
              onConfirm={ () => onOperate(false) }
            >
              <Button
                type="link"
                danger
                loading={ loading || loadingVerify  }
                disabled={detailData.status !== 'wait-check' || isStatusChange }
                className={styles.reject}
              >
                <CloseOutlined /> 拒绝
              </Button>
            </Popconfirm>
          </div>
          <p className={styles.noEditAlt}>
            选择之后，不可以再次更改
          </p>
        </Form.Item>
      </Form>
    </PageContentWarp>
  );
};

export default WithdrawDetail;
