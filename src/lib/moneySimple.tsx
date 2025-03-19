import {Tooltip} from "antd";

const moneySimple = ( money = 0, isTip = false ) => {
  let out;
  if (money >= 100000) {
    out = parseFloat((money / 10000).toFixed(2)) + '万';
  } else if (money >= 10000) {
    out = parseFloat((money / 10000).toFixed(2)) + '万';
  } else {
    out = money;
  }

  if (isTip) {
    return <Tooltip title={money + '元'}>{out}</Tooltip>;
  }

  return out;
}

export default moneySimple;