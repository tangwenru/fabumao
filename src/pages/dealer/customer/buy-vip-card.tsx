import React, {useEffect, useState} from 'react';
import {
  Table,
  Avatar,
  Tag, Button, Space, Switch,
} from 'antd';
import LayoutContent from "@/ui/LayoutContent";
import styles from './list.less';
import * as UserPermissionController from "@/service/api/UserPermissionController";
import {useRequest} from "@umijs/hooks";
import Time from "@/ui/Time";
import DealerCustomerListQuery from "./query";
import DealerCustomerDetail from "./detail";
import DealerCustomerDetailAgent from "./agent";
import drawer from "@/lib/drawer";

interface Props{
  targetUserId: number;
  canBuyVipCard: boolean;
  onCanBuyVipCard: ( checked: boolean ) => void;
}
const  DealerCustomerListBuyVipCard: React.FC<Props>
  = ({
       targetUserId = 0,
        canBuyVipCard,
       onCanBuyVipCard = () => {},
     }) => {
  // 是 复制的概念
  const [ checked, setChecked ] = useState( !( ! canBuyVipCard ) );
  const {
    run,
    loading,
    error,
  } = useRequest(( targetUserId: number, canBuyVipCard: boolean ) => UserPermissionController.create({
      targetUserId,
      canBuyVipCard,
    }),
    {
      manual: true,
      onSuccess( result ){
        setChecked( ! checked );
        onCanBuyVipCard( checked );
      }
    },
  );

  const onBuyVipCardPowerSwitch = ( checked: boolean ) => {
    console.log('onBuyVipCardPower:', checked );
    run( targetUserId, checked );
  }


  return (
    <>
      <Switch
        checkedChildren="可以购买卡密"
        unCheckedChildren="禁止购买卡密"
        loading={ loading }
        value={ checked }
        onChange={ ( e ) => onBuyVipCardPowerSwitch( e ) }
      />
    </>
  )
};

export default  DealerCustomerListBuyVipCard;
