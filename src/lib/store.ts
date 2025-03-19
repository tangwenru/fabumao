import WebBaseConfig from "../../web-base-config";

const store = {
  key(){
    return ``; // _shipinlv_
  },
  get( name: string ){
    let getData: any;
    if( typeof window === 'undefined'){
      return '';
    }
    try{
      getData = window.localStorage.getItem( this.key()+ name );
      if( getData ){
        getData = JSON.parse( getData );
      }
    }catch( e ){
      console.error('LocalStorage get Error:', e );
    }

    let out;
    if( ! getData ){
      out = '';
    }else{
      out = getData.value ;
    }
    return out;
  },
  set( name: string, value: any  ){
    value = typeof value === 'undefined' ? '' : value ;

    if( typeof window === 'undefined'){
      return ;
    }

    let saveData = {
      value : value
    };
    try{
      window.localStorage.setItem( this.key()+ name, JSON.stringify( saveData ) );
    }catch( e ){
      console.error('LocalStorage set Error:', e );
    }
  }
};

export default store;