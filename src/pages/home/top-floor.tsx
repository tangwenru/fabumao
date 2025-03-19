
import styles from './top-floor.less';
import {CheckOutlined, DesktopOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {go} from "@/lib";
const HomeTopFloor = () => {
  return (
		<div
			className={ styles.homeTopFloor }
		>
			<div className={ styles.background }>
				<video
					autoPlay muted playsInline loop
					poster="//portal.volccdn.com/obj/volcfe-scm/web-feilian/static/media/banner_poster.917fe0c8.webp">
					<source
						src="//portal.volccdn.com/obj/volcfe-scm/web-feilian/static/media/banner.9bf903cc.webm"
						type="video/webm"
					/>
					<source
						src="//portal.volccdn.com/obj/volcfe-scm/web-feilian/static/media/banner.e488572b.mp4"
						type="video/mp4"
					/>
				</video>
				<div className="mask-WkhD"></div>
			</div>
			<div className={ styles.bannerItemContent }>
				<div className={ styles.pageWarp }>
					<div className={ styles.title }>
						<div>发布就用 <span className={ styles.high }>发发猫</span></div>
						<div className={ styles.subtitle }>短视频全自动发布平台</div>
					</div>
					<div className={ styles.features }>
						<ul>
							<li><CheckOutlined className={ styles.supportIcon } /> 最真实的模拟用户手工操作</li>
							<li><CheckOutlined className={ styles.supportIcon } /> 矩阵账号批量挂小黄车</li>
							<li><CheckOutlined className={ styles.supportIcon } /> 全自动、可批量、可定时发布视频</li>
						</ul>
					</div>

					<div className={ styles.submits }>
						<a onClick={ () => go('/download')}>
							<Button
								size="large"
								type="primary"
								icon={ <DesktopOutlined /> }
							>
								下载试用
							</Button>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomeTopFloor;