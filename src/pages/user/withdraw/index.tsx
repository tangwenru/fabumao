import React, {useEffect, useState} from 'react';
import UserLayout from "@/pages/user/_layout";
import WithdrawList from "./list";


const WithdrawIndex: React.FC
  = ({

     }) => {

  return (
    <UserLayout>
      <WithdrawList />
    </UserLayout>
  )
};

export default WithdrawIndex;
