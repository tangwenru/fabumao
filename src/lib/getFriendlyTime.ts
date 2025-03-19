import dayjs from 'dayjs';
import getFriendlyTimeFuture from "./getFriendlyTimeFuture";

const getFriendlyTime = (str: string | number = '', now: number | string ) => {
    if (!str) {
      return '';
    }

    let strValue = 0;
    if (typeof str === 'number' || /^\d{10}$/.test(str)) {
      if (String(str).length === 10) {
        // str *= 1000;
        strValue = parseInt( `${ str }` ) * 1000;
      }
    }

    const currentTime = now ? new Date(now) : new Date();
    let oldTime;
    let delta;

    const getWidthString = function (num: number) {
      return num < 10 ? `0${num}` : num;
    };

    oldTime = new Date(dayjs( strValue || str).valueOf());

    delta = currentTime.getTime() - oldTime.getTime();

    if (delta < 0) {
      return getFriendlyTimeFuture(delta);
    } else if (delta <= 20000) {
      return '刚才';
    }
    if (delta <= 60000) {
      return '1分钟内';
    }
    if (delta < 60 * 60 * 1000) {
      return `${Math.floor(delta / (60 * 1000))}分钟前`;
    }
    if (delta < 24 * 60 * 60 * 1000) {
      return `${Math.floor(delta / (60 * 60 * 1000))}小时前`;
    }
    if (delta < 3 * 24 * 60 * 60 * 1000) {
      return `${Math.floor(delta / (24 * 60 * 60 * 1000))}天前`;
    }
    if (currentTime.getFullYear() !== oldTime.getFullYear()) {
      return [
        getWidthString(oldTime.getFullYear()),
        getWidthString(oldTime.getMonth() + 1),
        getWidthString(oldTime.getDate()),
      ].join('-');
    }
    return [
      getWidthString(oldTime.getMonth() + 1),
      getWidthString(oldTime.getDate()),
    ].join('-');
}

export default getFriendlyTime;