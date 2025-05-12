import React, {useEffect, useState} from 'react';
import {
  LikeOutlined,
} from '@ant-design/icons';
import styles from './commend.module.scss';
interface Props{
  commend?: number;
}

const VipCommend: React.FC<Props>
  = ({
       commend = 0,
     }) => {

  const [ list, setList ] = useState<number[]>( [] );

  useEffect(() => {
    const dataList: number[] = [];
    for ( let i = 0; i < commend ; i++ ){
      dataList.push( i );
    }
    setList( dataList );
  }, [ commend ]);

  return (
    <span
      className={ styles.vipCommend }
    >
      {
        list.map( ( num, i ) => (
          <LikeOutlined key={ i } className={ styles.icon } />
        ))
      }
    </span>
  );
}

export default VipCommend;
