import React, {useEffect, useState} from 'react';
import {
  Table, Divider, Button, Tag,
} from 'antd';
import * as DealerController from "@/service/api/DealerController";
import {useRequest} from "@umijs/hooks";
import PageContentWarp from "@/ui/PageContentWarp";
import {userPassword} from "@/service/api/DealerController";
import Copy from "@/ui/copy";

interface Props{
  targetUserId: number;
}
const  DealerCustomerPassword: React.FC<Props>
  = ({
       targetUserId,
     }) => {
  const [ result, setResult ] = useState<Dealer.CustomerUserPasswordResult>({
    password: '',
  });

  const {
    run,
    loading,
  } = useRequest(() => DealerController.userPassword({
      targetUserId,
    }),
    {
      manual: true,
      onSuccess( result ){
        setResult( result );
      }
    },
  );

  return (
    <PageContentWarp

    >
      <Button
        type="primary"
        disabled={ !! result.password }
        loading={ loading }
        onClick={ run }
      >
        重置用户密码
      </Button>

      {
        result.password &&
        <div>
          <Divider />

          密码已经修改为：
          <Copy content={ result.password }>
            <Tag color="green">{ result.password }</Tag>
          </Copy>
        </div>
      }

    </PageContentWarp>
  )
};

export default  DealerCustomerPassword;
