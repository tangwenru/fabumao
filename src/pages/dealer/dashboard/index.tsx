import styles from './index.less';
import {Button, Card, Space} from 'antd';
import {useState} from "react";
import getLocalUserInfo from "@/lib/getLocalUserInfo";
import go from "@/lib/go";

export default function IndexPage() {
  const [ whiteUserIdList ] = useState([
    1, 18,
  ]);
  const [ userInfo ] = useState( getLocalUserInfo() );
  return (
    <div>
      <h1>欢迎，经销商</h1>
      {
        whiteUserIdList.includes( userInfo.id ) &&
        <Card
          title="贵宾秘密入口"
        >
          <Space wrap>
            <a onClick={ () => go('/dealer/secret-door/long-video-sales')}>
              长视频
            </a>
          </Space>
        </Card>
      }
    </div>
  );
}
