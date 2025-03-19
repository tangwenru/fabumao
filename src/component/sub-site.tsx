import styles from './sub-site.less';
import React from 'react';
interface Props{
  productUrl?: string;
  productType?: Global.ProductName;
}

const SubSite: React.FC<Props>
  = ({
       productUrl = '',
       productType = '-' ,
     }) => {
  const now = Date.now();

  return (
    <div className={styles.productWeb}>
      <iframe
        src={ productUrl ? productUrl : `/_product-app/${ productType }/?t=${ now }` }
        className={ styles.iframe }
      />
    </div>
  );
}

export default SubSite;
