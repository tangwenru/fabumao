import styles from './title-thumb.less';
import React from 'react';

interface Props{
  title: string;
  subtitle?: string;
  ratio?: number;
  className?: string;
}

const TitleThumb: React.FC<Props>
  = ({
       title,
       subtitle,
       ratio = 1,
       className,
     }) => {
  return (
    <div
      className={ `${ styles.titleThumb } ${ className }` }
      style={{
        transform: `scale(${ ratio })`,
      }}
    >
      <div className={ styles.warp }>
        <div className={ styles.title }>{ title }</div>
        <div className={ styles.subtitle }>{ subtitle }</div>
        <div className={ styles.hr } />
      </div>
    </div>
  );
}

export default TitleThumb;
