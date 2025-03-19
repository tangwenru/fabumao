import React from 'react';
import { Tooltip } from 'antd';
import formatTime from "@/lib/formatTime";
import getFriendlyTime from "@/lib/getFriendlyTime";

interface Props{
  time?: string | number;
  serverTime?: number; // 毫秒
}

const Time: React.FC<Props> = ({ time= '', serverTime = Date.now() }) => {
  return (
    <Tooltip title={ formatTime( time, 'YYYY-MM-DD HH:mm:ss' ) }>
      <span>{ getFriendlyTime( time, serverTime ) }</span>
    </Tooltip>
  );
}

export default Time;



