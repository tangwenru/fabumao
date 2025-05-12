import React, { useState } from 'react';
import { Button, Popover, Divider, Alert, Tag } from 'antd';
import styles from './apply.less';
import {
  QuestionCircleOutlined,
  WalletOutlined,
  AlipayCircleOutlined, WechatOutlined,
} from '@ant-design/icons';
import LayoutContent from '@/ui/LayoutContent';
import * as WithdrawController from '@/service/api/WithdrawController';
import WithdrawBindAccount from '@/pages/user/withdraw/bind-account';
import {useRequest} from "@umijs/hooks";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";
import notification from "@/lib/notification";
import toastError from "@/lib/toastError";
import sleep from "@/lib/sleep";
import drawer from "@/lib/drawer";
import UserLayout from "@/pages/user/_layout";

interface DetailData {
  balance: number;
  handlingFeePercent: number;
  hasApplyTask: boolean;
  applyTaskCreated: number;
}

const Apply = () => {
  const [configData, setConfigData] = useState<Withdraw.Config>({
    balance: 0,
    freezeMoney: 0,
    canWithdraw: 0,
    handlingFeePercent: 0,
    applyTaskCreated: 0,
    canTodayApply: true,
    hasApplyTask: 0,
    hasBindReceiptAccount: false,
  });

  const { loading, error, run } = useRequest(
    () => WithdrawController.config(),
    {
      onSuccess(result) {
        setConfigData(result);
      },
    },
  );

  const { loading: formLoading, run: formRun } = useRequest(
    () => WithdrawController.apply({
      wechatAppId: getLocalSiteInfo().wechatAppId,
    }),
    {
      manual: true,
      onSuccess() {
        notification.success(
          '已经提交申请',
          '我们会尽快处理，请耐心等待一会呀',
        );
        run();
      },
    },
  );

  const onFinish = async () => {
    if (!configData.hasBindReceiptAccount) {
      toastError('你还没有绑定提现账号');
      await sleep(600);
      const bindWithdraw = await onBindWithdraw().catch((err) => {});
      if (bindWithdraw) {
        formRun();
      }
      return;
    }
    formRun();
  };

  const onBindWithdraw = async () => {
    return new Promise((resolve, reject) => {
      const dialog = drawer({
        title: <>绑定提现账号 <Tag color="orange">只需要填其中一项即可</Tag></>,
        content: (
          <WithdrawBindAccount
            hasBindReceiptAccount={configData.hasBindReceiptAccount}
            onSuccess={() => {
              dialog.destroy();
              // 更新资料；
              run();
              resolve(true);
            }}
          />
        ),
        width: 500,
      });
    });
  };

  return (
    <UserLayout>
      <LayoutContent
        loading={loading}
        title="收款"
        extInfo={
          <a onClick={onBindWithdraw}>
            <WechatOutlined /> 收款账号
          </a>
        }
        error={error}
        onReload={run}
        className={styles.withdraw}
      >
        <div className={styles.withdrawWarp}>
          <div className={styles.moneyBox}>
            <h5>可提现金额</h5>
            <small>￥</small>
            <strong className={styles.balance}>
              {configData.canWithdraw.toFixed(2)}
            </strong>
            <h6>
              不可用余额 ：<strong>{configData.freezeMoney}</strong>元
              <Popover title="不可用余额" content="指正在提现审核中的资金">
              <span>
                {' '}
                <QuestionCircleOutlined />
              </span>
              </Popover>
              <Divider type="vertical" />
              <span className={styles.feeBox}>
              提现手续费 ：
                {configData.handlingFeePercent <= 0 ? (
                  <Tag color="green">免费</Tag>
                ) : (
                  configData.handlingFeePercent
                )}
                <small>%</small>
            </span>
              <Popover
                title="手续费的组成"
                content={<>是“微信支付平台”收取的手续费 <Tag color="orange">本平台提现免手续费</Tag></>}
              >
              <span>
                {' '}
                <QuestionCircleOutlined />
              </span>
              </Popover>
            </h6>
          </div>

          <div className={styles.contents}>
            {configData.hasApplyTask && (
              <Alert
                className={styles.alt}
                message="请等等财务，正在处理中..."
                showIcon={true}
                type="warning"
              />
            )}

            {/*<Alert*/}
            {/*  className={styles.alt}*/}
            {/*  message="系统已改为支付宝提现！目前内测中，4月21号发布新程序"*/}
            {/*  showIcon={true}*/}
            {/*  type="warning"*/}
            {/*/>*/}

            <div className={styles.submits}>
              <Button
                type="primary"
                disabled={
                  formLoading || !configData.canWithdraw || !configData.canTodayApply
                }
                loading={formLoading}
                onClick={onFinish}
                icon={<WalletOutlined />}
              >
                立即提现
              </Button>
              {!configData.canTodayApply && ! configData.hasApplyTask && (
                <p className={styles.disabledAlt}>今天不能再次申请提现了</p>
              )}
            </div>
          </div>
        </div>
      </LayoutContent>
    </UserLayout>
  );
};
export default Apply;
