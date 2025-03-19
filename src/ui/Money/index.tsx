import styles from './index.less';
import React from "react";
import moneySimple from "@/lib/moneySimple";

interface Props{
  value?: number;
  pre?: React.ReactNode;
  end?: React.ReactNode;
  precision?: number;
  className?: string;
}
const Money: React.FC<Props>
  = ({
       pre= <>&yen;</>,
       end= '元',
       value,
       precision = 2,
       className,
     }) => {
  return (
    <span
      className={ `${ className } ${ styles.money }` }
    >
      <span className={ styles.yen }>{ pre }</span>
      <span className={ `${ styles.value } ${ value === 0 ? styles.zero : '' } money-value` }>
        { typeof value ==='number' ? moneySimple( parseFloat( value.toFixed( precision ) ) ) : '' }
      </span>
      <span className={ styles.yen }>{ end }</span>
    </span>
  );
}
export default Money;
