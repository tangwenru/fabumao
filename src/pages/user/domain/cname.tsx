import React, { useEffect, useState } from 'react';

import { Tag } from 'antd';
import styles from './cname.less';
import LayoutContent from '@/ui/LayoutContent';

interface Props{
  cnameDomain: string;
}
const UserDomainCname:React.FC<Props> = ({ cnameDomain, }) => {
  return (
    <div className={styles.cname}>
      <div className={styles.titles}>
        我们进入
        <a
          href="https://dc.console.aliyun.com/next/index?#/domain-list/all"
          target="_blank"
        >
          阿里云域名列表页面
        </a>
        ，假设你购买了域名 <Tag color="blue">qq.com</Tag>，点击“解析”：
        <ul>
          <li>
            <label>①</label>：添加记录
          </li>
          <li>
            <label>②</label>：”记录类型“ 选择 <strong>CNAME</strong> 类型
          </li>
          <li>
            <label>③</label>：填写二级域名的值；第一次为空，做完整个流程；需要第二次再做一个新的记录 填写：*
          </li>
          <li>
            <label>④</label>：固定值, 请填写：
            <Tag color="red">{ cnameDomain || '_cname.tiangongjian.com'}</Tag>
          </li>
        </ul>
        保存即可，一般生效需要 几分钟 到 数小时不等；
      </div>

      <img
        src="https://shipinlv.oss-cn-hangzhou.aliyuncs.com/www/source/image/cname.jpg"
        alt=""
        className={ styles.demoImage }
      />
    </div>
  );
};

export default UserDomainCname;
