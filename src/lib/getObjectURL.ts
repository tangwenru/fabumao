import isInServer from "./isInServer";

const getObjectURL = ( file: File ) => {
  if( isInServer() ){
    return '';
  }
  let url = window.URL || window.webkitURL;
  return url.createObjectURL(file);
}

export default getObjectURL;