import dayjs from 'dayjs';
const formatTime = (time: number | string, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!time) {
    return '';
  }

  if (typeof time === 'number') {
    if (String(time).length === 10) {
      time = time * 1000;
    }
  }
  return dayjs(time).format(format);
}

export default formatTime;