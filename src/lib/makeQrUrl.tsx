import {QRCodeSVG, QRCodeCanvas } from 'qrcode.react';

interface Props{
  url: string;
  fgColor?: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  className?: string;
}
const MakeQrImage: React.FC<Props>
  = ({
       url = '',
       fgColor = '#000',
       size = 600,
       level = 'L',
       className = '',
     }) => {
    if (!url) {
      return '';
    }
    return (
      <QRCodeCanvas
        className={ className }
        value={ url }
        size={ size }
        fgColor={ fgColor }
        level={ level }
      />
    );
}

export default MakeQrImage;