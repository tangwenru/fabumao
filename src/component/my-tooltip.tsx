import {QuestionCircleOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import React from "react";

interface Props{
  title: React.ReactNode;
}
const MyTooltip: React.FC<Props> = ({ title }) => {
  return (
    <Tooltip title={ title }>
      <a style={{ paddingLeft: 4 }}><QuestionCircleOutlined /> </a>
    </Tooltip>
  )
};

export default MyTooltip;
