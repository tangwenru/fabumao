import React from 'react';
import {CheckCircleOutlined, StopOutlined, WomanOutlined} from "@ant-design/icons";
interface Props {
  enabled?: boolean;
  enabledText?: React.ReactNode;
  disabledText?: React.ReactNode;
}

const Enabled: React.FC<Props>
  = ({
       enabled ,
       enabledText= ' 已启用',
       disabledText= ' 已禁用',
     }) => {

  return (
    <span className="enabled">
       {
         enabled ?
           <span style={{ color: 'green' }} className="enabled"><CheckCircleOutlined /> { enabledText }</span>
           :
           <span  style={{ color: '#C00' }} className="disabled"><StopOutlined /> { disabledText }</span>
       }
    </span>
  );
};
export default Enabled;
