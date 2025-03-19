import React, {useEffect, useState} from 'react';
import styles from './contact.less';
import {Button, Col, ConfigProvider, Form, Input, Popover, Row} from "antd";
import {
  GithubOutlined,
  InfoCircleOutlined, LikeFilled, WarningFilled,
  WechatOutlined,
  WeiboOutlined
} from "@ant-design/icons";
import * as MailSubscribeController from "@/service/api/MailSubscribeController";
import {useRequest} from "@umijs/hooks";
import getSiteInfo from "@/lib/getSiteInfo";
import getWebTitle from "@/lib/getWebTitle";

interface Props{

}

interface FormInfo{
  mail: string;
}

const Contact: React.FC<Props> = ( ) => {
  const [ form ] = Form.useForm();
  const [ mailMessage, setMailMessage ] = useState('');
  const [ mailSuccess, setMailSuccess ] = useState(false);


  const {
    loading: loadingMail,
    run: runMail,
  } = useRequest(( mail: string ) => MailSubscribeController.create({
    mail,
    domain: document.location.hostname,
  }), {
    manual: true,
    onSuccess() {
      setMailSuccess( true );
    },
  });

  const onFinish = ( values: FormInfo ) => {
    //   pattern: ,
    const mail = values.mail?.replace(/^\s+|\s+$/g, '') || '';
    if( ! /^([a-z0-9]+[_\-.]?)*[a-z0-9]+@([a-z0-9]+[_\-.]?)*[a-z0-9]+\.[a-z]{2,22}$/i.test( mail ) ){
      setMailMessage('似乎不是正确的电子邮箱？')
      return;
    }
    runMail( values.mail );
  }

  // useEffect(() => {
  //   set( window.screen.width > 480 ? 12 : 24 );
  // }, []);

  return (
    <div className={styles.contact }>
      <div className="page-warp">
          <div className={ styles.contactLeft }>
            <div className={ styles.title }>
              抢先获得更新和特别优惠
            </div>
            {
              mailSuccess ?
                <div className={ styles.mailSuccess }>
                  <LikeFilled /> 感谢您提交请求！
                </div>
                :
                <Form
                  form={ form }
                  disabled={ loadingMail }
                  onFinish={ onFinish }
                >
                  <Form.Item
                    name="mail"
                    // rules={[
                    //   {
                    //     pattern: /^([a-z0-9]+[_\-.]?)*[a-z0-9]+@([a-z0-9]+[_\-.]?)*[a-z0-9]+\.[a-z]{2,22}$/i,
                    //     message: '似乎不是正确的邮箱？',
                    //   }
                    // ]}
                    extra={(
                      <div className={ styles.mailAlt }>
                        提交此表单，即表示我同意
                        <Popover
                          title="隐私政策"
                          content={(
                            <div className={ styles.moveVideoContactPrivacyPolicy}>
                              提交此表单，即表示我同意「{ getWebTitle() }」可以使用我的姓名、电子邮件地址向我发送简报（包括商业通讯）并为此目的处理我的个人数据。我同意 「{ getWebTitle() }」 可以为此目的根据 「{ getWebTitle() }」 隐私政策使用第三方服务处理上述数据。
                            </div>
                          )}
                        >
                          <a> { getWebTitle() } 隐私政策 <InfoCircleOutlined /></a>
                        </Popover>
                      </div>
                    )}
                  >
                    <Input
                      className={ styles.mail }
                      placeholder="输入电子邮件地址"
                      onClick={ e => setMailMessage('') }
                      onChange={ e => setMailMessage('') }
                    />
                  </Form.Item>

                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          colorPrimary: '#FFF',
                          primaryColor: '#000',
                        },
                      },
                    }}
                  >
                    <Button type="primary" shape="round" htmlType="submit" loading={ loadingMail }>
                      提交
                    </Button>
                  </ConfigProvider>
                  {
                    mailMessage &&
                    <div className={ styles.mailMessage }>
                      <WarningFilled /> { mailMessage }
                    </div>
                  }
                </Form>
            }

          </div>

          <div className={ styles.followUs}>
            <h3>关注我们</h3>
            <Row gutter={ 26 }>
              <Col span={ 12 }>
                <div className={ styles.items }>
                  <a href="" target="_blank" title={ `${ getSiteInfo().webTitle } 微博` }>
                    <WeiboOutlined className={ styles.icon } /> { getSiteInfo().webTitle } 微博
                  </a>
                </div>
              </Col>
              <Col span={ 12 }>
                <div className={ styles.items }>
                  <a><WechatOutlined className={ styles.icon } /> 微信公众号</a>
                </div>
              </Col>
              <Col span={ 12 }>
                <div className={ styles.items }>
                  <a><span className={ styles.douyin } /> { getSiteInfo().webTitle } 抖音</a>
                </div>
              </Col>
              <Col span={ 12 }>
                <div className={ styles.items }>
                  <a className="disabled">
                    <GithubOutlined className={ styles.icon } /> Bug/问题反馈
                  </a>
                </div>
              </Col>
            </Row>
          </div>

      </div>
    </div>
  );
}
export default Contact;
