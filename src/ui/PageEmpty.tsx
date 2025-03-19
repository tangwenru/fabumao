import React from 'react';
import { CoffeeOutlined } from '@ant-design/icons';

import styles from './PageEmpty.module.scss';

interface Props{
  title?: React.ReactNode,
}
const PageEmpty: React.FC<Props>
  = ({
       title = '没有了',
     }) => {
  return (
    <div className={  styles.tableEmpty } >
      <CoffeeOutlined className={ styles.icon } />
      <p>{ title }</p>
    </div>
  );
}
export default PageEmpty;
