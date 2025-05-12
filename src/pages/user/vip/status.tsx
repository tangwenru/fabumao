import React, { useEffect, useState } from 'react';
import {Card, Table, Tag} from 'antd';
import LayoutContent from '@/ui/LayoutContent';
import styles from './status.less';
import Time from "@/ui/Time";

interface Props{
  isVip: boolean;
  title: string;
  expired: number;
}
const UserVipStatus: React.FC<Props>
  = ({
  isVip,
       title,
       expired = 0,
     }) => {

  return (
    title && expired > 0 ?
    <span className={ `${ styles.vipStatus } ${ isVip ? styles.isVip : '' }` }>
      <span className={`${ styles.title } `}>
        { title }
      </span>
      { expired * 1000 > Date.now() ?
        <span className={ styles.time }><Time time={ expired } />到期</span>
        :
        <span className={ styles.expired }>已过期</span>
      }
    </span>
      :
      null
  );
};

export default UserVipStatus;
