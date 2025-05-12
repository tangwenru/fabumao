import React, {useEffect, useState} from 'react';
import styles from './share-image.less';
import PageContentWarp from "@/ui/PageContentWarp";
import {LoadingOutlined} from "@ant-design/icons";
import isInServer from "@/lib/isInServer";
import toastError from "@/lib/toastError";

interface Props{
  qrUrl: string;
}

interface ImageList{
  src: string;
  qrInfo: {
    top: number;
    left: number;
    width: number;
    height: number;
    opacity?: number;
    rotate?: number;
  },
  inviteInfo: {
    top: number;
    left: number;
    font: string;
    color: string;
  }
}

const ImageList: ImageList[] = [
  {
    src: 'https://wechat-groups.oss-cn-hangzhou.aliyuncs.com/share/0.jpg',
    qrInfo: { top: 1518, left: 180, width: 300, height: 300, opacity: 0.8 },
    inviteInfo: { top: 1770, left: 760, font: '45px Arial', color: '#FFF' }
  },
  // {
  //   src: 'https://wechat-groups.oss-cn-hangzhou.aliyuncs.com/share/1.jpg',
  //   qrInfo: { top: 680, left: 750, width: 300, height: 300, opacity: 0.9 }
  // },
  // {
  //   src: 'https://wechat-groups.oss-cn-hangzhou.aliyuncs.com/share/2.jpg',
  //   qrInfo: { top: 1590, left: 740, width: 240, height: 240,  rotate: - Math.PI / 5.2, opacity: 0.9  }
  // },
  // {
  //   src: 'https://wechat-groups.oss-cn-hangzhou.aliyuncs.com/share/3.jpg',
  //   qrInfo: { top: 1580, left: 485, width: 240, height: 240, opacity: 0.8  }
  // },
  // {
  //   src: 'https://wechat-groups.oss-cn-hangzhou.aliyuncs.com/share/4.jpg',
  //   qrInfo: { top: 1480, left: 850, width: 260, height: 260, opacity: 0.8  }
  // },
  // {
  //   src: 'https://wechat-groups.oss-cn-hangzhou.aliyuncs.com/share/5.jpg',
  //   qrInfo: { top: 1268, left: 426, width: 270, height: 270, opacity: 0.8  }
  // }
];

const UserShareImage: React.FC<Props>
  = ({
       qrUrl,
     }) => {

  const screenMultiple = 2;
  const winWidth = ! isInServer() ? ( document.documentElement.clientWidth || window.innerWidth ) : 0;

  const [ index, setIndex ] = useState( 0 );
  const [ canvasHeight, setCanvasHeight ] = useState(0 );
  const [ error, setError ] = useState<Error | null >();
  const [ loading, setLoading ] = useState( false );

  const [ shareImageUrl, setShareImageUrl ] = useState('');


  const [ itemData, setItemData ] = useState<ImageList>( ImageList[ index ] );
  const canvas = React.useRef<HTMLCanvasElement|null>(null);

  const onImage = async () => {
    if( ! canvas || ! canvas.current ){
      setTimeout( () => {
        onImage();
      }, 1e3 );
      return;
    }

    setError( null );
    setLoading( true );

    const $canvas: HTMLCanvasElement = canvas.current;
    const ctx = $canvas.getContext('2d');
    if( ! ctx ){
      setTimeout( () => {
        onImage();
      }, 1e3 );
      return;
    }

    const img = new Image();
    const imgLoad = await getDataUrlBySrc( itemData.src ).catch()
    const imgLoadResult = await new Promise(( resolve, reject ) => {
      img.onload = function(){
        resolve( true );
      }
      img.onerror = ( e ) => {
        // Tool.toastError("imgLoadResult 2:"+JSON.stringify( e ))
        reject( e );
      }
      img.crossOrigin = "Anonymous";
      img.src = imgLoad;
    });

    if( ! imgLoadResult ){
      const err = new Error('背景图加载失败');
      err.name = 'bg-image-load-error';
      setError( err );
      setLoading( false );
      return ;
    }

    const radio = winWidth / img.width;
    const canvasH = img.height * radio;
    const qrInfo = itemData.qrInfo;
    const inviteInfo= itemData.inviteInfo;
    setCanvasHeight( canvasH );

    // 背景
    ctx.drawImage( img, 0, 0, img.width, img.height, 0, 0, winWidth * 2, canvasH * 2 );

    // 二维码；
    const qrImage = await getQrImage();

    // 二维码透明度
    if( qrInfo.opacity ){
      ctx.globalAlpha = qrInfo.opacity;
    }

    // 检查是否需要旋转
    if( qrInfo.rotate ){
      ctx.translate(qrInfo.left * radio * screenMultiple, qrInfo.top * radio * 2 )
      ctx.rotate(qrInfo.rotate );
      ctx.drawImage( qrImage, 0, 0,
        qrImage.width , qrImage.height ,
        0, 0,
        qrInfo.width * radio * 2, qrInfo.height * radio * 2,
      );
      // 还原画布
    }else{
      ctx.drawImage( qrImage, 0, 0,
        qrImage.width , qrImage.height ,
        qrInfo.left * radio * screenMultiple, qrInfo.top * radio * 2,
        qrInfo.width * radio * 2, qrInfo.height * radio * 2,
      );
    }
    // 还原透明度
    ctx.globalAlpha = 1;


    //邀请码
    ctx.font = inviteInfo.font;
    ctx.fillStyle = inviteInfo.color;
    ctx.fillText(
      'get Invite Code',
      inviteInfo.left * radio * screenMultiple,
      inviteInfo.top * radio * screenMultiple,
    )
    // ctx.fillText( 'a12332ff ', 200, 200  )

    console.log('wo:',
      inviteInfo.left * radio * screenMultiple,
      inviteInfo.top * radio * screenMultiple,
    );

    // 变为图片
    const imageUrl = $canvas.toDataURL("image/png");
    setShareImageUrl( imageUrl );

    setLoading( false );
    setError( null );
  }

  const getDataUrlBySrc = ( src: string) => {
    return new Promise<string>((resolve, reject) => {
      const xmlHTTP = new XMLHttpRequest();
      xmlHTTP.open("GET", src, true);
      // 以 ArrayBuffer 的形式返回数据
      xmlHTTP.responseType = "arraybuffer";

      xmlHTTP.onload = function(e) {

        // 1. 将返回的数据存储在一个 8 位无符号整数值的类型化数组里面
        const arr = new Uint8Array(xmlHTTP.response);

        // 2. 转为 charCode 字符串
        const raw = Array.prototype.map
          .call(arr, charCode => String.fromCharCode(charCode))
          .join("");

        // 3. 将二进制字符串转为 base64 编码的字符串
        const b64 = btoa(raw);

        const dataURL = "data:image/jpeg;base64," + b64;
        resolve(dataURL);
      };
      xmlHTTP.onerror = function(err) {
        reject(err);
      };
      xmlHTTP.send();
    });
  }

  const getQrImage = async () => {
    const url = 'http;;;;;;;';// makeQrUrl( qrUrl, '#000', 400 );

    const img = new Image();
    await new Promise(( resolve, reject ) => {
      img.onload = function(){
        resolve( true );
      }
      img.onerror = ( event, source, lineno, colno, error) => {
        toastError(JSON.stringify( error ));
        reject( error  );
      }

      img.src = url;
    }).catch( err => {
      // todo
    });
    return img;
  }

  const onNext = () => {
    if( loading ){
      return;
    }
    let nextIndex = index + 1;
    if( nextIndex >= ImageList.length ){
      nextIndex = 0;
    }
    setIndex( nextIndex );
    setItemData( ImageList[ nextIndex ] );
  }

  const onSave = async () => {
    // let path = shareImageUrl;
    //
    // const pathInfo = await Tool.base64ToFile( path, `${ Date.now() }` +'.jpg' ).catch( err => {
    //   // Tool.toastError('保存图片失败，请用手机截屏功能吧');
    // });
    // if( ! pathInfo ){
    //   Tool.toastError('需要您长按图片保存');
    //   return;
    // }
    // Tool.toast('已保存到相册');
  }

  const onInit = async () => {
    // onImage();
    const qrImage = await getQrImage().catch( err => {
      console.log('err:', err );
    });

    if ( ! qrImage ){
      return;
    }

    setShareImageUrl( qrImage.src );
  }

  useEffect(() => {
    onInit();
  }, [ ] );

  return (
    <PageContentWarp
      className={ styles.shareImage }
      error={ error }
      onReload={ onImage }
    >
      <div className={ styles.canvasBox }>
        <canvas
          ref={ canvas }
          className={ styles.canvas }
          width={ winWidth * 2 }
          height={ canvasHeight * 2 }
        />
      </div>
      <div className={ styles.imageBox }>
        <img
          src={ shareImageUrl }
          className={ styles.image }
          alt=""
        />
        {/*{*/}
        {/*  ! loading &&*/}
        {/*    <a*/}
        {/*        className={ `${ styles.download } ${ ( loading ) ? styles.disabled : '' } ` }*/}
        {/*        onClick={ onSave }*/}
        {/*    >*/}
        {/*        /!*<span>保存到相册</span>*!/*/}
        {/*    </a>*/}
        {/*}*/}

      </div>
      {
        loading &&
          <div
              className={ styles.loading }
              style={{
                height: canvasHeight,
              }}
          >
              <div className={ styles.main }>
                  <LoadingOutlined />
              </div>
          </div>
      }
      {
        ImageList.length > 1 &&
          <a
              onClick={ () => onNext() }
              className={ `${ styles.next } ${ loading ? styles.disabled : '' }` }
          >
              <span>换一张</span>
          </a>
      }
    </PageContentWarp>
  );
};

export default UserShareImage;