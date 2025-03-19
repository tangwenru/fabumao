import { message } from 'antd';

const toastError = ( content = '', duration = 3, onClose = () => {} ) => {
  return content && message.error(content, duration, onClose);
}

export default toastError;