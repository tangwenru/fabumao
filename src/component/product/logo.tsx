interface Props{
  productType?: string;
  size?: number;
}
import styles from './logo.less';

const LogoDict = {
  'video-publish': 'https://shipinlv.oss-cn-hangzhou.aliyuncs.com/www/product/video-publish.svg',
  'mixed-cut': 'https://shipinlv.oss-cn-hangzhou.aliyuncs.com/www/product/video-donkey.png',
  "video-template": 'https://shipinlv.oss-cn-hangzhou.aliyuncs.com/www/product/video-template.png',
  'long-video-sales': 'https://shipinlv.oss-cn-hangzhou.aliyuncs.com/www/product/long-video-sales.svg',
  'long-video-sales-publish': 'https://shipinlv.oss-cn-hangzhou.aliyuncs.com/www/product/long-video-sales.svg',
};

const ProductLogo: React.FC<Props>
  = ({
       productType = '',
  size= 16,
     }) => {
  const imageUrl = LogoDict[ productType ];
  return (
    <span
      className={ `${ styles.productLogo } ${ productType }` }
      style={{
        width: size,
        height: size,
        backgroundImage: imageUrl
          ?  `url('${ imageUrl }')`
          :
          undefined,
      }}
    />
  )
}

export default ProductLogo;