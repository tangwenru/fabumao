import { message } from 'antd';

const toast  = ( content = '', duration = 3, onClose = () => {} ) => {
  return content && message.info(content, duration, onClose);
}

export default toast;