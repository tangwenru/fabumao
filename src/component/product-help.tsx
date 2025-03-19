
import styles from './product-help.less';
import React, {useEffect, useState} from 'react';
import {Col, Collapse, ConfigProvider, Row } from "antd";
import type { CollapseProps } from 'antd';

interface Props{
  title?: React.ReactNode;
  themeType?: 'light' | 'dark'
  list: CollapseProps['items'];
  className?: string;
}
const ProductHelp: React.FC<Props>
  = ({
       title,
       themeType= 'light' ,
       list= [],
       className = '',
     }) => {
  const [ colSpan, setColSpan ] = useState( 12 );

  const leftLength = Math.max( 0, Math.ceil( list.length / 2 ) ) ;
  const leftList = list.slice( 0, leftLength );

  const rightList = list.slice( leftLength  );

  useEffect(() => {
    setColSpan( window.screen.width > 480 ? 12 : 24 );

  }, []);

  return (
    <div className={ `${ styles.productHelp } ${ styles[ themeType ] } ${ className }` }>
      <div className="page-warp">
        <div className={ styles.title }>
          { title || '常见问题解答' }
        </div>

        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                colorTextHeading: themeType === 'dark' ? '#E9E9E9' : '#333',
              }
            }
          }}>

          <div className={ styles.list }>
            <Row gutter={ 32 }>
              <Col span={ colSpan }>
                <Collapse accordion items={ leftList } className={ styles.collapse } />
              </Col>
              <Col span={ colSpan }>
                {
                  rightList.length > 0 &&
                  <Collapse accordion items={ rightList } />
                }
              </Col>
            </Row>
          </div>
        </ConfigProvider>
      </div>
    </div>
  );

}
export default ProductHelp;