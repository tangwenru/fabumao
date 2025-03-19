import {Tag} from "antd";
import React from "react";

interface Props{
  industryBaseInfo: Industry.BaseInfo;
}
const Industry: React.FC<Props>
  = ({
       industryBaseInfo,
     }) => {
  return (
    industryBaseInfo?.name ?
      <Tag
        color={ industryBaseInfo?.color }
      >
        { industryBaseInfo?.name }
      </Tag>
      :
      null
  );
}

export default Industry;
