'use client';

import React, {useEffect,  useState} from 'react';
import styles from './JsonViewer.less';

interface Props{
  json: any;
  collapsed?: boolean;
}

const JsonViewer: React.FC<Props>
  = ({
       json,
       collapsed = false,
     }) => {
  const [ jsonData, setJsonData ] = useState({});
  const [ isShowJson, setIsShowJson ] = useState( false );

  const onJson = ( jsonData = {} ) => {
    if( typeof window === 'undefined'){
      console.log('no window');
      return JSON.stringify( jsonData, null, 2 );
    }

    const ReactJson = require('react-json-view').default;
    return (
      <ReactJson
        collapsed={ collapsed }
        src={ jsonData }
        name={ null }
      />
    )
  }

  useEffect(() => {
    setJsonData( json );
  }, [ json ]);

  useEffect(() => {
    setIsShowJson( true );
  }, []);

  return (
    <div className={ styles.json }>
      {
        isShowJson && onJson( jsonData )
      }
    </div>
  );
};

export default JsonViewer;
