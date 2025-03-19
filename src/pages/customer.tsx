import React, { useEffect, useRef, useState } from 'react';
import CustomerLayout from "./user/_layout";
import { Outlet } from '@umijs/max';

const CustomerInLayoutPage = () => {
  return (
    <CustomerLayout>
      <Outlet />
    </CustomerLayout>
  )
};

export default CustomerInLayoutPage;
