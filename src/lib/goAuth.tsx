import React from 'react';
import Auth from "@/pages/auth";
import pageDialog from "@/lib/pageDialog";


export default async function goAuth( authType = '' ){
  if( typeof window === 'undefined'){
    return ;
  }
  if( window._openAuth_ ){
    console.log('goAuth window. _openAuth_!');
    return Promise.reject( false );
  }
  window._openAuth_ = true;

  return new Promise(( resolve, reject ) => {
    const dialog = pageDialog({
      content: (
        <Auth
          onSuccess={ () => {
            window._openAuth_ = false;
            resolve(true);
            dialog.destroy();
          }}
        />
      ),
      width: 580,
      onOk(){
        console.log('goAuth onOk!');

      },
      onCancel(){
        console.log('goAuth onCancel!');
      },
      afterClose(){
        console.log('goAuth afterClose!');
        window._openAuth_ = false;
        reject( false );
      }
    })
  });
}


