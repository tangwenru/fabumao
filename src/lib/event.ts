interface EventItem {
  name: string;
  fn: (data?: any) => void;
}

if( typeof window !== 'undefined' ){
  if( ! window.__events ){
    window.__events = [];
  }
}

const event = {
  run(name: string, data?: any) {
    console.log('Reg event run:', name, data);
    if (!name) {
      return;
    }

    if( typeof window === 'undefined' ){
      return;
    }

    window.__events.forEach((item) => {
      // 命中 子集事件
      if (item.name === name || `${item.name}.`.indexOf(name) === 0) {
        item.fn(data);
      }
    });
  },
  on(name: string, fn: (data: any) => void, isGlobalOnly = true) {
    console.log('Reg event do:', name);
    const eventItem: EventItem = {
      name,
      fn,
    };

    if( typeof window === 'undefined' ){
      return;
    }
    window.__events.push(eventItem);
  },
// 只绑定一次，但会运行多次；
  one(name: string, fn: (data: any) => void) {
    let isBind = false;
    if( typeof window === 'undefined' ){
      return;
    }
    window.__events.forEach((items) => {
      if (items.name === name) {
        isBind = true;
      }
    });
    if (isBind) {
      console.log('event bind:', name);
      return;
    }
    this.on(name, fn);
  },
// 删除事件
  off(name: string) {
    if( typeof window === 'undefined' ){
      return;
    }
    window.__events.forEach((item: any, index) => {
      let isDel;
      // 匹配到子集事件
      if (`${item.name}.`.indexOf(name) > -1) {
        isDel = true;
      } else if (name === item.name) {
        // 一级，子集的子集
        isDel = true;
      }
      if (isDel) {
        item.fn = () => {};
        window.__events.splice(index, 1);
      }
    });
  },
}

export default event;