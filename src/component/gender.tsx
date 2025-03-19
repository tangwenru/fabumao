import React, { useRef, useState } from 'react';
import {ManOutlined, WomanOutlined} from "@ant-design/icons";
interface Props {
  gender?: Global.Gender;
}

const Gender: React.FC<Props> = ({
  gender ,
}) => {

  return (
    <span className="gender">
       { gender === 1 && <><ManOutlined style={{ color: 'blue' }} /></> }
      { gender === 0 && <><WomanOutlined  style={{ color: 'red' }} /></> }
    </span>
  );
};
export default Gender;
