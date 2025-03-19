import React from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import toastError from "@/lib/toastError";
// import { BrowserQRCodeReader } from '@zxing/browser';


interface ImageDataResult{
  image: HTMLImageElement;
  // data: Uint8ClampedArray;
  width: number;
  height: number;
}

class QrReader  {
  constructor() {

  }
  async read( url: string ){

// 创建二维码读取器
    const codeReader = new BrowserQRCodeReader();

    // const imageDataResult = await new Promise<ImageDataResult>(( resolve, reject ) => {
    //   const image = new Image();
    //   image.onload = () => {
    //     resolve({
    //       image,
    //       width: image.width,
    //       height: image.height,
    //     });
    //   }
    //   image.onerror = ( event, source, lineno, colno, error) => {
    //     reject( error );
    //   }
    //   image.src = url;
    // }).catch( err => {
    //   console.log('read qr:', err );
    // });
    //
    // if( ! imageDataResult ){
    //   Tool.toastError('似乎不是图片？');
    //   return
    // }

    // 识别二维码
    const qrResult = await codeReader.decodeFromImageUrl( url ).catch(err => {
      console.error(err); // 输出错误信息
      toastError('似乎不是二维码？');
    });

    if( ! qrResult ){
      return ;
    }

    return qrResult.getText();

    // const hints = new Map();
    // const formats = [BarcodeFormat.QR_CODE ];
    //
    // hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    //
    // const reader = new MultiFormatReader();
    //
    // const luminanceSource = new RGBLuminanceSource(imageDataResult.data, imageDataResult.width, imageDataResult.height);
    // const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));
    //
    // const qrResult = reader.decode(binaryBitmap, hints);
    // console.log("qrResult:", qrResult );
    // return ;
    /////////-------------------------------
    //
    // console.log("imageDataResult.data:", imageDataResult )
    // const codeData = jsQR( imageDataResult.data, imageDataResult.width, imageDataResult.height );
    //
    // if ( codeData ) {
    //   console.log("Found QR code", codeData );
    //   return codeData.data;
    // }else{
    //   Tool.toastError('似乎不是二维码？');
    // }

    return '';
  }
}

export default QrReader;

