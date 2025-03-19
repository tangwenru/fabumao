import {Select, Form, Divider} from "antd";
import {UnorderedListOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {useRequest} from "@umijs/hooks";
import * as IndustryController from "@/service/api/IndustryController";
import Industry from "./industry";
import Enabled from "@/ui/Enabled";
import styles from './industry-select.less';

interface Props{
  // industryId: number;
  disabledRequired?: boolean;
  disabledLabel?: boolean;
  className?: string;
  onChange?: ( industryId: number ) => void;
}
const IndustrySelect: React.FC<Props>
  = ({
       // industryId,
       className,
       disabledRequired,
       disabledLabel,
       onChange = () => {},
     }) => {
  const [ industryList, setIndustryList ] = useState<Industry.List[]>([]);

  const { run , loading } = useRequest(() =>
      IndustryController.list({
        current: 1,
        pageSize: 200,
      }),
    {
      onSuccess(result) {
        setIndustryList([...result.list]);
      },
    },
  );

  return (
    <Form.Item
      label={ ! disabledLabel ? "行业" : undefined  }
      name="industryId"
      className={ `${ className } ${ styles.industryId }` }
      rules={
        disabledRequired ?
          []
          :
          [
            { required: true, message: '请选择行业', },
          ]}
    >
      <Select
        loading={ loading }
        // value={ industryId }
        onChange={ ( industryId ) => {
          onChange( industryId )
        }}
      >
        <Select.Option value={ 0 }>
          <UnorderedListOutlined /> 请选择行业
        </Select.Option>
        {
          industryList.map( item => (
            <Select.Option value={ item.id } key={ item.id }>
              {
                ! item.enabled &&
                <>
                  <Enabled enabled={ item.enabled } />
                  <Divider type="vertical" />
                </>
              }
              <Industry
                industryBaseInfo={{
                  ...item,
                }}
              />
            </Select.Option>
          ))
        }
      </Select>
    </Form.Item>
  )
}

export default IndustrySelect;
