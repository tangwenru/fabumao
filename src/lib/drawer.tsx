import event from "@/lib/event";
import { createRoot } from 'react-dom/client';
import DialogDrawer from '@/ui/DialogDrawer';

const drawer = (query: any = {}) => {
  // 搞一个 放抽屉的 容器
  const drawer = document.createElement('div');
  const id = `__drawer__${new Date().getTime()}`;
  drawer.id = id;
  query.id = id;

  document.body.appendChild(drawer);

  // ReactDOM.render(<DialogDrawer {...query} />, document.getElementById(id));

  const root = createRoot( drawer ); // createRoot(container!) if you use TypeScript
  root.render(<DialogDrawer {...query} />);

  const outData = {
    // onClose(){
    //
    // },
    // 销毁
    destroy() {
      event.run(`drawer-close.${id}`);
    },
  };

  // Tool.event.on( `drawer-close.${id}`, () => {
  //   outData.onClose();
  // });

  return outData;
}

export default drawer;

export const drawerAllClose = () => {
  event.run(`drawer-close`);
}