import React, { useEffect, useState } from 'react';
import { Table, Avatar, Tag } from 'antd';
import LayoutContent from '@/ui/LayoutContent';
import styles from './list.less';
import * as InviteController from '@/service/api/InviteController';
import { useRequest } from '@umijs/hooks';
import Time from '@/ui/Time';
import UserLayout from "@/pages/user/_layout";

const UserInviteList: React.FC = ({}) => {
  const [pagination, setPagination] = useState<Global.Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
    simple: true,
    showSizeChanger: false,
  });

  const columns: Global.Columns<Invite.List>[] = [
    {
      title: '好友',
      dataIndex: 'userIdKey',
      key: 'userIdKey',
      render(userIdKey, record) {
        return (
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <Avatar
                size={40}
                className={styles.avatarBox}
                src={record?.avatarUrl}
              />
            </div>
            <div className={styles.info}>
              <strong className={styles.nickname}>
                {record?.nickname || '-'}
              </strong>
              <div className={styles.userIdKey}>
                ID: {parseInt(userIdKey).toString(36).toLocaleUpperCase()}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: '好友层级',
      dataIndex: 'level',
      key: 'level',
      render(level) {
        return (
          <div>
            {level === 1 && <Tag color="red">一级</Tag>}
            {level === 2 && <Tag color="blue">二级</Tag>}
          </div>
        );
      },
    },
    {
      title: '加入时间',
      dataIndex: 'joinCreated',
      key: 'joinCreated',
      render(joinCreated) {
        return <Time time={joinCreated} />;
      },
    },
  ];

  const [listData, setListData] = useState<Invite.List[]>([]);
  const { run, loading, error } = useRequest(
    (pager = pagination) =>
      InviteController.list({
        friendType: '',
        day: '',
        current: pager.current,
        pageSize: pager.pageSize,
      }),
    {
      manual: true,
      onSuccess(result) {
        setListData(result.list);
        setPagination({
          ...pagination,
          ...result.pagination,
        });
      },
    },
  );

  useEffect(() => {
    run();
  }, []);

  return (
    <UserLayout>
      <div className={styles.list}>
        <LayoutContent title={<>我邀请的好友</>} extInfo={<></>} leftExtInfo="">
          <Table<Invite.List>
            size="small"
            bordered={true}
            rowKey={(record) => `${record.userIdKey}`}
            loading={loading}
            columns={columns}
            dataSource={listData}
            pagination={pagination}
            onChange={({ current }) => {
              pagination.current = current || 1;
              run(pagination);
            }}
          />
        </LayoutContent>
      </div>
    </UserLayout>
  );
};

export default UserInviteList;
