import React from 'react';
import {
  Table,
  Badge, Tag,
} from 'antd';
import {LinkOutlined, PictureOutlined} from "@ant-design/icons";
interface Props{
  openTarget: Ad.OpenTarget;
}
interface AdOpenTargetDict{
  [ name: string ]: AdOpenTargetList
}

interface AdOpenTargetList {
  openTarget: Ad.OpenTarget;
  title: string;
  icon: React.ReactNode;
  color: string;
}

export const AdOpenTargetList: AdOpenTargetList[] = [
  {
    openTarget: 'image',
    title: '图片',
    icon: <PictureOutlined />,
    color: 'orange',
  },
  {
    openTarget: 'url',
    title: '网址',
    icon: <LinkOutlined />,
    color: 'blue',
  }
];

export const AdOpenTargetDict = (() => {
  const dict: AdOpenTargetDict = {};
  AdOpenTargetList.forEach( item => {
    dict[ item.openTarget ] = item;
  })
  return dict;
})();

const  AdOpenTarget: React.FC<Props>
  = ({
       openTarget = '',
     }) => {

  const itemData = AdOpenTargetDict[ openTarget ] || {
    title: openTarget,
  }
  return (
    <Tag color={ itemData.color }>{ itemData.icon } { itemData.title || openTarget }</Tag>
  )
};

export default  AdOpenTarget;
