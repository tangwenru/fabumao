import React from 'react';
import { Space } from 'antd';
import styles from './DialogDrawerFooter.less';

interface Props{
  children: React.ReactNode;
}
const DialogDrawerFooter: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.dialogDrawerFooter}>
      <div className={styles.warp}>
        <div className={styles.warpChildren}>
          <Space>{children}</Space>
        </div>
      </div>
      <div className={styles.pos} />
    </div>
  );
};

export default DialogDrawerFooter;
