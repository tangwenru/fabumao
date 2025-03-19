// 二次封装 hooks request ;
// 参数详见：https://github.com/umijs/umi-request/blob/master/README_zh-CN.md
import request from 'umi-request';

import goAuth from '@/lib/goAuth';
import toastError from "@/lib/toastError";
import getLocalUserInfo from "@/lib/getLocalUserInfo";
import {getBaseConfigItemApiUrl} from "../../web-base-config";


type RequestMethods = <T>(url: string, options: any) => Promise<T>;
const requestApi: RequestMethods = (api = '', options: Global.RequestOptions = {}) => {
  // 要请求的 url
  let  optionDomain = options.domain || '';
  optionDomain = optionDomain.match(/\/$/) ? optionDomain : optionDomain + '/';
  let url = getBaseConfigItemApiUrl( optionDomain +  api?.toLocaleLowerCase() );

  console.log('makeAjax int 20 111 url:', url, options);

  // const params = options.method === 'GET' ? options.data : {};

  const token = getLocalUserInfo().sid;
  let postUrl = url ;

  if( ! options.disabledToken ){
    postUrl += (url.indexOf('?') === -1 ? '?' : '&') + '_token_=' + token
  }

  // 追加环境参数
  // const env = getApiEnv();
  // if( env !== 'prod' ){
  //   postUrl += `&_env=${ env }`;
  // }

  const pageUrl = document.location.href;

  return new Promise((resolve, reject) => {
    const requestData = request(postUrl, {
      // method: options.method,
      // data: options.data,
      // params,
      ...options,
      timeout: options.timeout || 15e3,
      // requestType: options.payload === false ? 'form' : 'json',
      // onSuccess( data: ApiResult ){
      //   console.log('ajax 1:', data );
      //   if( ! data?.success ){
      //     const error = new Error( data.message || '发生了一些问题' );
      //     error.name = 'api-not-success';
      //     throw error;
      //   }
      //   options.onSuccess( data );
      // },
    });

    requestData
      .then((result: any = {}) => {
        console.log('ajax requestData then:', result);
        if (result.success) {
          resolve(result.data);
        } else {
          const error = new Error(
            result?.message || '发生了一些问题，请稍后重试',
          );
          error.name = result.code;
          error.stack = result.data;

          if (['staff-not-login', 'not-login'].includes(result?.code)) {
            // 未登录，跳走；
            goAuth(result.authType);
            reject(error);
          } else {
            onError(
              pageUrl,
              url,
              error.message,
              JSON.stringify(error),
              options?.silent,
            );
            reject(error);
            if (!options?.silent) {
              toastError(result.message);
            }
          }
        }
      })
      .catch((err) => {
        console.log('ajax error:', err);
        console.log('ajax error 2:', JSON.stringify( err ) );
        // if (['Failed to fetch', 'http error'].includes(err?.message)) {
        //   err.message = '发生了一些问题，请稍后重试.';
        // }
        const msg = err?.data?.message || err?.message || '发生了一些问题，请稍后重试';
        toastError( msg );
        const error = new Error( msg );
        onError(
          pageUrl,
          url,
          msg,
          JSON.stringify(err),
          options?.silent,
        );
        reject( error );
      });
  });
};

const onError = (
  pageUrl: string,
  apiUrl: string = '',
  title: string,
  content: string,
  silent = false,
) => {
  if (silent) {
    return;
  }

  if( typeof window === 'undefined'){
    return ;
  }
  window.__recordError?.create([
    {
      title,
      siteUserId: getLocalUserInfo().id,
      errorLevel: 1, //'1:严重，2：警告；3：提示；',
      errorType: 'HTTP', //'HTTP: 网络错误; LOGICAL：逻辑错误；‘’: 不能定义的错误；',
      language: 'JavaScript', //Go','JavaScript','')
      pageUrl,
      content,
      apiUrl,
    },
  ]);
};

export default requestApi;
