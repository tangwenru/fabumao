import styles from "./FormRangeLabel.module.scss";
import {SwapRightOutlined} from "@ant-design/icons";
import React from "react";
import MyTooltip from "@/component/my-tooltip";
interface Props{
  label: React.ReactNode;
  tooltipTitle?: React.ReactNode;
  unit?: string;
  startValue?: number;
  endValue?: number;
  sameValue?: number;
}
const FormRangeLabel: React.FC<Props>
  = ({
       label,
       tooltipTitle,
       unit = '',
       startValue,
       endValue,
       sameValue,
     }) => {
  return (
    <div className={ styles.formItemLabel }>
      { label }
      {
        tooltipTitle &&
          <MyTooltip title={ tooltipTitle } />
      }
      <div className={ styles.labTag }>
        {
          ( sameValue === startValue && sameValue === endValue ) ?
            '不变'
            :
            (
              startValue === endValue ?
                <>
                  { startValue }<small>{ unit }</small>
                </>
                :
                <>
                  { startValue }<small>{ unit }</small>
                  <SwapRightOutlined className={ styles.hr } />
                  { endValue }<small>{ unit }</small>
                </>
            )
        }
      </div>
    </div>
  )
}

export default FormRangeLabel;
