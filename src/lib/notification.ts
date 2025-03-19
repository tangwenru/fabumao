import {
  notification as Notification,
} from 'antd';
import React from 'react';

const notification = {
  notification(
    type: 'success' | 'info' | 'warning' | 'error',
    message: string, description?: React.ReactNode,
    duration: number = 8,
    options: NotificationOptions = {},
  ){
    Notification[ type ]({
      ...options,
      message,
      duration,
      description,
    });
  },
  success( message: string, description?: React.ReactNode, duration = 8, options: NotificationOptions = {} ){
    this.notification( 'success', message, description, duration, options);
  },
  error( message: string, description?: React.ReactNode, duration = 180, options: NotificationOptions = {} ){
    console.log('options 2：', options );
    this.notification( 'error', message, description, duration, options);
  },
  warning( message: string, description?: React.ReactNode, duration = 60, options: NotificationOptions = {} ){
    this.notification( 'warning', message, description, duration, options);
  },
  info( message: string, description?: React.ReactNode, duration = 8, options: NotificationOptions = {} ){
    this.notification( 'info', message, description, duration, options);
  },
  destroy(){
    Notification.destroy();
  },
}

export default notification;
