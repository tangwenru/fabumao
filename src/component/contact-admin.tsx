import React, {useEffect, useState} from 'react';
import { Divider, Popover } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import styles from './contact-admin.less'
import ContactWechat from "@/component/contact-wechat";

interface Props{
  qrType: '' | 'user'  | 'admin' | 'dealer';
  title?: React.ReactNode;
  alertTitle?: React.ReactNode;
}
const ContactAdmin: React.FC<Props>
  = ({
       qrType ,
       title = '',
       alertTitle = '',
     }) => {

  return (
    <Popover
      content={(
        <ContactWechat
          qrType={ qrType }
          title={ title }
          alertTitle={ alertTitle }
        />
      )}
      title={ alertTitle ? alertTitle : "遇到任何问题、商业合作，请联系我"  }
    >
      {
        title &&
        <>
          <a>
            <WechatOutlined />
          </a> { title }
        </>

      }
    </Popover>
  )
}

export default ContactAdmin;
