import React, {useEffect, useState} from 'react';
import styles from './hide-home.less';
import ContactWechat from "@/component/contact-wechat";
import FooterMini from "@/ui/footer-mini";

const LayoutHideHome: React.FC = () => {

  return (
    <div
      className={`${styles.layoutsHideHome}`}
    >
      <ContactWechat
        qrType="admin"
        size={ 260 }
      />

      <div className={ styles.hr }/>

      <FooterMini />
    </div>
  );
}


export default LayoutHideHome;
