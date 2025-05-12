import React, {useEffect, useState} from 'react';
import {
  Form, InputNumber, Slider, Tag,
} from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import styles from './list.less';
import * as UserDealerRatioController from "@/service/dealer/UserDealerRatioController";

interface Props{
  itemData: UserDealerRatio.List;
}
const  DealerRatioForm: React.FC<Props>
  = ({
       itemData,
     }) => {
  const [ form ] = Form.useForm();
  const maxPercent = Math.floor( itemData.dealerRatioPercent * 0.5 );
  const minPercent = itemData.id === 0 ? 1 : itemData.agentMaxRatioPercent;
  const [ formData, setFormData ] = useState({
    agentMaxRatioPercent: itemData.agentMaxRatioPercent,
  });

  const [ marks, setMarks ] = useState<SliderMarks>({});


  const onFinish = ( index = 0 ) => {

  }

  const onMarkInit = () => {
    const maxPercent05 = Math.floor( maxPercent * 0.5 );
    const maxPercent1 = Math.floor( maxPercent );
    const marks: SliderMarks = {};

    if ( maxPercent > 15 ) {
      marks[ minPercent ] = `${ minPercent }%`;
      marks[ maxPercent05 ] = `${ maxPercent05 }%`;
      marks[ maxPercent1 ] = `${ maxPercent1 }%`;
    }
    setMarks(marks);
  }

  useEffect(() => {
    onMarkInit();
  }, [])

  return (
    <div className={ styles.listForm }>
      <Form
        form={ form }
        initialValues={{
          ...formData,
        }}
        layout="vertical"
        onFinish={ onFinish }
      >
        <Form.Item
          name="agentMaxRatioPercent"
          label={<>代理<strong>提成和</strong>最大比例</>}
          extra={(
            <>当前比例：<Tag color="orange"><strong>{ formData.agentMaxRatioPercent }</strong><small> %</small></Tag></>
          )}
        >
          <Slider
            marks={marks}
            min={ 1 }
            max={ maxPercent }
            step={ 1 }
            onChange={ v => {
              formData.agentMaxRatioPercent = v;
              setFormData({...formData});
            }}
          />
        </Form.Item>
      </Form>
    </div>
  )
};

export default  DealerRatioForm;
