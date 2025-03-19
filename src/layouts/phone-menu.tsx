import React, {useEffect, useState} from 'react';
import {ConfigProvider, Menu} from 'antd';
import styles from './phone-menu.less';
import {go, store} from "@/lib";
import RouterDealer from "@/config/route-dealer";
import RouterCustomer from "@/config/route-customer";

interface Props{
  role: 'user' | 'dealer' | string;
  onMenu: ( key: string ) => void;
}

const LayoutPhoneMenu: React.FC<Props>
  = ({
       role,
       onMenu = () => {},
     }) => {

  const onMenuChange = ( key: string ) => {
    console.log('e', key );
    go( key );
    onMenu( key );
  }

  return (

    <div
      className={ `${ styles.layoutPhoneMenu }` }
    >
      <Menu
        mode="inline"
        // defaultSelectedKeys={ defaultSelectedKeys }
        // defaultOpenKeys={['sub1']}
        style={{ height: '100%' }}
        items={ role === 'dealer' ?  RouterDealer : RouterCustomer }
        className={ styles.menu }
        onClick={ e => onMenuChange( e.key )}
      />
    </div>
  );
}


export default LayoutPhoneMenu;
