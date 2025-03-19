import styles from './about-us.less';
import React, {useEffect, useState} from 'react';
import {Row, Col, Space} from "antd";
import {MailOutlined, PhoneOutlined } from "@ant-design/icons";
import MakeQrImage from "@/lib/makeQrUrl";
import getLocalSiteInfo from "@/lib/getLocalSiteInfo";
import goTop from "@/component/goTop";

interface Props{
}

const AboutUsPage: React.FC<Props> = ({} ) => {

// export default function AboutUsPage() {
  const [ siteInfo, setSiteInfo] = useState( getLocalSiteInfo() );
  const [ visionMissionColSpan, setVisionMissionColSpan ] = useState( 12 );
  const [ contactColSpan, setContactColSpan ] = useState( 8 );
  const [ isMobile, setIsMobile ] = useState( false );
  const [ isClient ,setIsClient  ] = useState( false );

  const onInit = () => {
    setIsMobile( window.screen.width <= 480  );
    setVisionMissionColSpan( window.screen.width > 480 ? 12 : 24 );
    setContactColSpan( window.screen.width > 480 ? 8 : 24 );

    // const siteInfoData = {
    //   ...siteInfo,
    //   // ...getLocalSiteInfo(),
    // };
    //
    // siteInfoData.domainUserWeContactQrUrl = siteInfoData.domainUserWeContactQrUrl
    //   || siteInfoData.dealerWeContactQrUrl
    //   || 'https://u.wechat.com/MDA8pNKUYg2YIqckdiImRFE';
    // setSiteInfo({...siteInfoData});
    setIsClient( true );

    setTimeout(() => {

    }, 1e3 );

  }

  useEffect(() => {
    onInit();
    goTop();
  }, []);
  return (
    <div className={styles.aboutUs}>
      <div className={ styles.pageTitle}>
        <div className="page-warp">
          <h1>企业级短视频发布平台</h1>
          <h3>让发布。。。。。。。</h3>
        </div>
        {
          ! isMobile &&
          <div
            className={ styles.bgVideo }
          >
            <video
              loop={ true }
              autoPlay={ true }
            >
              {/*<track kind="captions2" />*/}
              <source
                src="https://gw.alipayobjects.com/mdn/rms_824a36/afts/file/A*zELQRKo2gOcAAAAAAAAAAAAAARQnAQ?abc=.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        }
      </div>

      {
        isClient &&
        <>
          <div className="page-warp">
            <div className={styles.companyInfo}>
              <h2>
                {siteInfo.companyName}
              </h2>
              <div className={styles.content}>
                <pre>{siteInfo.companyIntroduction}</pre>
                {/*我们是一家视频智能创意技术提供商，专注于为内容商业生态提供服务。我们基于内容元素解构方法论、人工智能、云计算和创意内容大数据等核心技术，通过一站式SaaS解决方案，实现创意智能生产、运营优化、标签洞察和协作管理。我们的目标是连接全球数字化内容商业生态的全链路，帮助上千万品牌商家、互联网企业和内容服务商实现商业增长。*/}
              </div>
            </div>
          </div>
          <div className={styles.visionMission}>
            <div className="page-warp">

              <h2>愿景 & 使命 & 企业文化</h2>
              <Row gutter={visionMissionColSpan === 24 ? 0 : 52}>
                <Col span={visionMissionColSpan}>
                  <div className={styles.itemVisionMission}>
                    <div className={styles.toBeOne}/>
                    <h3>愿景&使命</h3>
                    <p>成为全球领先的AI巡检提供商</p>
                  </div>
                </Col>
                <Col span={visionMissionColSpan}>
                  <div className={styles.itemVisionMission}>
                    <div className={styles.hope}/>
                    <h3>核心价值观</h3>
                    <p>客户成功、快速创新、高效易用</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <div className={styles.officeAddress}>
            <div className="page-warp">
              <h2>办公地点</h2>
              <div className={styles.content}>
                <h3>{siteInfo.companyCity || '杭州'}</h3>
                <p>{siteInfo.companyAddress || '杭州市 余杭区 梦想小镇 1号楼'}</p>
              </div>

              <div className={styles.contact}>
                <Space size={32}>

                </Space>
              </div>
            </div>
          </div>

          <div className={styles.contactInfo}>
            <div className="page-warp">
              <div className={styles.contactInfoWarp}>
                <div className={styles.logoBox}>

                </div>

                <div className={styles.contactWarp}>
                  <Row>
                    <Col span={contactColSpan}>
                      <div className={styles.contactItem}>
                        <h3>法律与合规</h3>
                        <a target="_blank" href="/website/privacy-statement" title="隐私声明">
                          隐私声明
                        </a>
                      </div>
                    </Col>
                    <Col span={contactColSpan}>
                      <div className={styles.contactItem}>

                        <h3>联系我们</h3>
                        {
                          siteInfo.phoneNumber &&
                          <div>
                            <PhoneOutlined className={styles.icon}/> {siteInfo.phoneNumber}
                          </div>
                        }

                        {
                          siteInfo.email &&
                          <div className={styles.email}>
                            <MailOutlined className={styles.icon}/> {siteInfo.email}
                          </div>
                        }
                      </div>
                    </Col>
                    <Col span={contactColSpan}>
                      <div className={styles.contactItem}>

                        {
                          ! siteInfo.disabledContact &&  siteInfo.domainUserWeContactQrUrl &&
                          <div className={styles.contactQr}>
                            <MakeQrImage url={siteInfo.domainUserWeContactQrUrl} size={120} fgColor="#33ad6a"/>
                            <div className={styles.alt}>
                              使用手机微信，扫一扫
                            </div>
                          </div>
                        }
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default AboutUsPage;