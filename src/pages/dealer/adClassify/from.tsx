import React from 'react';
import {
  Table,
  Badge, Tag,
} from 'antd';
import {ChromeOutlined, DesktopOutlined, LinkOutlined, PictureOutlined} from "@ant-design/icons";
interface Props{
  from: Ad.From;
}
interface AdFromDict{
  [ name: string ]: AdFromList
}

interface AdFromList {
  from: Ad.From;
  title: string;
  icon: React.ReactNode;
  color: string;
}

export const AdFromList: AdFromList[] = [
  {
    from: 'client',
    title: '客户端',
    icon: <DesktopOutlined />,
    color: '#000',
  },
  {
    from: 'web',
    title: '网页',
    icon: <ChromeOutlined />,
    color: 'purple',
  }
];

export const AdFromDict = (() => {
  const dict: AdFromDict = {};
  AdFromList.forEach( item => {
    dict[ item.from ] = item;
  })
  return dict;
})();

const  AdFrom: React.FC<Props>
  = ({
       from ,
     }) => {

  const itemData = AdFromDict[ from ] || {
    title: from,
  }
  return (
    <Tag color={ itemData.color }>{ itemData.icon } { itemData.title || from }</Tag>
  )
};

export default AdFrom;
