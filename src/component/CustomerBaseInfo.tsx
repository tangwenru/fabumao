
import styles from './CustomerBaseInfo.less';
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Divider, Space, Tag} from "antd";
import Gender from "@/component/gender";
interface Props{
	userInfo: User.UserInfo;
}
const CustomerBaseInfo: React.FC<Props>
	= ({
			 userInfo,
		 }) => {
	return (
		<div className={ styles.userInfo }>
			<div className={ styles.avatar }>
				{ ! userInfo?.avatarUrl ?
					<div className={ styles.emptyAvatarUrl }>
						<UserOutlined />
					</div>
					:
					<Avatar
						size={ 40 }
						shape="circle"
						src={ userInfo.avatarUrl }
					/>
				}
			</div>
			<div className={styles.names}>
				<div className={styles.name}>
					<Gender gender={userInfo?.gender}/> {userInfo?.nickname || '-'}
				</div>
				<Space>
					<span className={ styles.id }>
						{ userInfo.id }
					</span>
					<Divider type="vertical" style={{ margin: '0' }} />
					<div className={styles.phoneNumber}>
						{userInfo?.phoneNumber}
					</div>
				</Space>
			</div>
		</div>
	);
}

export default CustomerBaseInfo;