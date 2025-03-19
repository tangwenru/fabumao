import { Divider, Input } from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './avatar.module.scss';
import event from "@/lib/event";
import {
	CaretDownOutlined,
} from '@ant-design/icons';

interface Props{
  defaultAvatarUrl: string;
  onChange: ( url: string, avatarKey: string ) => void;
}


const AvatarList = [
  [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
  [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
  [ 0,1,2,3,4,5,6,7,8,9 ],
];

const avatarLists = ( () => {
  const list: string[][] = [];
  AvatarList.forEach( ( items, index ) => {
    const itemList: string[] = [];
    items.forEach( item => {
      itemList.push( `https://douzhuli.oss-cn-hangzhou.aliyuncs.com/avatar/${ index }-${ item }.png`)
    });
    list.push( itemList );
  });
  return list;
})()

const UserAvatar: React.FC<Props>
  = ({
       defaultAvatarUrl = '',
       onChange = () => {},
     }) => {
  const [ currentAvatarUrl, setCurrentAvatarUrl ] = useState( defaultAvatarUrl );
  const [ isOpenLists, setOpenLists ] = useState( false );
  const showListsEvent = () => {
    event.run('user-avatar-close');
  }
  const onSelect = ( url: string, urlKey: string ) => {
    setCurrentAvatarUrl( url );
    onChange( url, urlKey );
  }

  useEffect(() => {
    document.body.addEventListener( 'click', showListsEvent  , false );

    event.on('user-avatar-close', () => {
      setOpenLists( false )
    });

    event.on('user-info', userInfo => {
      // setState({
      //   currentAvatarUrl: userInfo.avatarUrl,
      //   currentAvatarId: userInfo.avatarId
      // });
    });

    return () => {
      document.body.removeEventListener( 'click', showListsEvent  , false );
      event.off('user-avatar-close');
      event.off('user-info');
    };
  }, []);

  return (
    <div
      className={ `${ styles['userAvatar'] } ${ isOpenLists ? styles['openLists'] : '' } ` }
    >
      <div
        className={ styles['avatar-box'] }
        onClick={ ( e ) => {
          setOpenLists( true );
          e.stopPropagation();
        }}
      >
        <img src={ currentAvatarUrl } alt="" />
        <span className={ styles['down'] }>
						<CaretDownOutlined />
					</span>
      </div>

      <div className={ styles['lists'] }>
        {
          avatarLists.map( ( items, index ) => (
            <div key={ index }>
              <div className={ styles['items'] }>
                {
                  items.map( ( url, i ) => (
                    <a
                      className={ styles['item'] }
                      key={ `${ index }-${ i }` }
                      onClick={ e => onSelect( url, `${ index }-${ i }` ) }
                    >
                      <img src={ url } alt="" />
                    </a>
                  ))
                }
              </div>
              {
                index < avatarLists.length - 1 &&
                <Divider />
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default UserAvatar ;
