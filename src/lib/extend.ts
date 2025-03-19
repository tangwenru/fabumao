const extend = ( arg1: {}, ...args: any[] ) => { //# 对象扩展
  console.log("extend arguments:", args )
  let target = arg1 || {}
    , i = 1
    , length = args.length + 1
    , options
  ;
  if ( typeof target !== "object" && typeof target !== "function" )
    target = {};
  for ( ; i < length; i++ ){
    if ( (options = args[ i ]) != null ){
      for ( let name in options ) {
        let copy = options[ name ];
        if ( target === copy ){
          continue;
        }
        if ( copy !== undefined ){
          // @ts-ignore
          target[ name ] = copy;
        }
      }
    }
  }
  return target;
}

export default extend;