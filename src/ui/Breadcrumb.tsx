import React from 'react';
import {Breadcrumb as Bread} from 'antd';
import styles from './Breadcrumb.less';

interface BreadcrumbList{
  name: string;
  icon?: React.ReactNode;
  onClick?: Function;
}

interface Props {
  lists: BreadcrumbList[];
  rightContent?: React.ReactNode;
}

const Breadcrumb: React.FC<Props>
  = ({
       lists = [],
       rightContent = '',
     }) => {
  const isMenuEmpty = lists.length === 0 && !rightContent
  ;
  return (
    <div className={`${styles.breadcrumbs} ${isMenuEmpty ? ' empty' : ''}`}>
      {
        isMenuEmpty ?
          ''
          :
          <>
            <Bread>
              {
                lists.map((item, index) => {
                  return (
                    <Bread.Item
                      key={item.name + '-' + index}
                      onClick={e => {
                        if (typeof item.onClick === 'function') {
                          item.onClick(e, item, index);
                        }
                      }}
                      className={item.onClick ? styles.link : ''}
                    >
                      {
                        item.icon &&
                          <>
                            {item.icon}&nbsp;
                          </>
                      }
                      {
                        index === lists.length - 1 ?
                          <strong>{item.name}</strong>
                          :
                          <span>{item.name}</span>
                      }
                    </Bread.Item>
                  );
                })
              }
            </Bread>
            {lists.length === 0 && <span>&nbsp;</span>}
          </>
      }
      <div className={ styles.rightContent }>{rightContent}</div>
      <div className="clear"/>
    </div>
  );
}

export default Breadcrumb;