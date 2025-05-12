import React from 'react';
import styles from './index.less';
import { } from 'antd';
import UserDashboardFinance from "./finance-month";
import UserLayout from '../_layout';

const UserDashboardPage = () => {
  return (
    <UserLayout>
      <div className={ styles.userDashboard}>
        <UserDashboardFinance />
      </div>
    </UserLayout>
  );
}

export default UserDashboardPage;
