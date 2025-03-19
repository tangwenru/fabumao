import styles from './trademark.less';
import React from 'react';
import Markdown from "@/component/markdown";

const content = `
## 商标 
网站使用的商标均已经申请注册 （ <a href="https://sbj.cnipa.gov.cn/" target="_blank">国家知识产权局商标局</a> ）

<br />
## 版权
对应的程序都已经申请计算机软件著作权 （ <a href="https://www.ncac.gov.cn/" target="_blank">国家版权局</a> ）
`;
export default function WebSiteTrademarkPage() {
  return (
    <div className={ styles.trademark }>
      <div className={ styles.warp  }>
        <div className="markdown">
          <h1 className={ styles.pageTitle }>商标与版权</h1>
          <Markdown
            content={ content }
          />
        </div>
      </div>
    </div>
  );
}
