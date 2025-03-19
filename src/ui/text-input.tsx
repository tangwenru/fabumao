import React, {useEffect, useState} from 'react';
import {Input, Progress} from 'antd';
import {
  EditOutlined, CheckOutlined,
} from '@ant-design/icons'
import styles from './text-input.less';

interface Props{
  disabled?: boolean;
  className?: string;
  label: React.ReactNode;
  value: string;
  maxLength?: number;
  onFinish: ( text: string ) => void;

}
const TextInput: React.FC<Props>
  = ({
       disabled,
       className,
       label = '',
       value = '',
       maxLength = 1000,
       onFinish = () => {},
     }) => {
  const [ isEdit, setIsEdit ] = useState( false );
  const [ inputText, setInputText ] = useState( value );
  const onEdit = ( isEdit: boolean ) => {
    if( disabled ){
      return;
    }
    setIsEdit( isEdit );
  }

  const onInput = ( value: string ) => {
    setInputText( value );
  }

  const onPost = () => {
    onEdit( false );
    if( inputText != value ){
      onFinish( inputText );
    }
  }

  useEffect(() => {
    setInputText( value );
  }, [ value ]);

  return (
    <>
      {
        isEdit ?
          <div className={ className }>
            <Input
              onPressEnter={ e => {
                onPost();
              }}
              className={ styles.input }
              disabled={ disabled }
              maxLength={ maxLength }
              value={ inputText }
              onChange={ e => onInput( e.target.value ) }
              addonAfter={ <a onClick={ onPost }><CheckOutlined /></a> }
              autoFocus
            />
          </div>
          :
          <div  className={ `${ className } ${ styles.showBox } ${ disabled ? 'disabled' : '' }` }>
            <label className="content">{ label }</label>
            {
              ! disabled &&
              <a
                className={`${styles.editIcon} ${ label ?  '' : styles.labelEmpty }  edit-icon`}
                onClick={() => onEdit(true)}
              >
                <EditOutlined/>
              </a>
            }

          </div>
      }
    </>
  );
}
export default TextInput;
