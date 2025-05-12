import styles from "./adClassifyListSelect.less";
import {Form, Select} from "antd";
import React, {useState} from "react";
import {useRequest} from "@umijs/hooks";
import * as DealerAdClassifyController from "@/service/dealer/AdClassifyController";
import AdFrom from "@/pages/dealer/adClassify/from";

interface Props{
	label?: string;
	width?: number | string;
}
const AdClassifyListSelect: React.FC<Props>
	= ({
			 label,
			 width,
		 }) => {
	const [ adClassifyListData, setAdClassifyListData ] = useState<DealerAdClassify.List[]>([]);
	const {
		run,
		loading,
		error,
	} = useRequest(() => DealerAdClassifyController.list({
			productType: '',
			from: '',
			current: 1,
			pageSize: 100,
		}),
		{
			onSuccess( result ){
				setAdClassifyListData([...result.list]);
			}
		},
	);

	return (
		<Form.Item
			name="adClassifyId"
			label={ label }
			style={{
				width,
			}}
		>
			<Select
				popupClassName={ styles.adClassifyList }
				className={ styles.adClassifyList }
				loading={ loading }
			>
				<Select.Option value={ 0 }>
					全部广告分类
				</Select.Option>
				{
					adClassifyListData.map( item => (
						<Select.Option value={ item.id } key={ item.id }>
							<span className={ styles.logoUrl } style={{ backgroundImage: `url('${ item.productBaseInfo.logoUrl }')` }} />
							{ item.productBaseInfo.name } <AdFrom from={ item.from } />
							<span>
								<span className={ styles.position }>{ item.position }</span>
							</span>
						</Select.Option>
					))
				}
			</Select>
		</Form.Item>
	)
}

export default AdClassifyListSelect;