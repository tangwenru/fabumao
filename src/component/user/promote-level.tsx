import React from 'react';
import { Tag } from 'antd';
interface Props{
  title?: string;
  color?: string;
}
const UserPromoteLevel: React.FC<Props>
  = ({
       title,
       color,
     }) => {
  return (
    <Tag color={ color }>
      { title || '体验推广' }
    </Tag>
  );
};

export default UserPromoteLevel;
