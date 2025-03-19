import * as FileUploadController from '@/service/api/FileUploadController';
import type {
  RcFile as OriRcFile,
  UploadProps as RcUploadProps,
  UploadRequestOption as RcCustomRequestOptions,
  UploadRequestError,
} from 'rc-upload/lib/interface';
import * as qiNiu  from 'qiniu-js';
import getFileExt from "@/lib/getFileExt";

interface UploadQuery {
  fileKey?: string;
  compressOptions?: any;
  uploadType: FileUpload.UploadType; // 这参数 后端废除，不再使用；
  antdUploadQuery: RcCustomRequestOptions;
}

class FileUpload {
  constructor(isMock = false) {
    if (isMock) {
      return;
    }
  }
  uploadToken = {} as FileUpload.UploadToken;
  async upload(query: UploadQuery) {
    const uploadToken = await this.getUploadToken(query.uploadType).catch(
      (err) => {},
    );
    if (!uploadToken) {
      const errorQuery: UploadRequestError = {
        status: 0,
        method: query.antdUploadQuery.method,
        url: query.antdUploadQuery.action,
        name: 'thumb-token',
        message: '',
      };
      query.antdUploadQuery.onError?.(errorQuery);
      return Promise.reject(new Error('获取 uploadToken 失败'));
    }
    console.log('query thumb:', query);

    // @ts-ignore
    let file: File = query.antdUploadQuery.file;
    const fileLocalName = file.name;

    // 压缩；
    const compressOptions = query.compressOptions;

    if (compressOptions) {
      const compressResult = await qiNiu
        .compressImage(file, compressOptions)
        .catch((err) => {});
      if (compressResult) {
        // @ts-ignore
        file = compressResult.dist;
      }
    }

    let fileKey =
      query.fileKey ||
      Math.floor(Date.now() * 0.001) +
        '-' +
        file.size +
        '-' +
        Math.random().toString(36).slice(2);

    const extName = getFileExt(fileKey).toLocaleLowerCase();
    if (!extName) {
      const fileExtName = getFileExt(fileLocalName);
      fileKey = fileKey + (fileExtName ? '.' + fileExtName : '');
    }

    const fullUrl = uploadToken.domain + uploadToken.prePath + fileKey;

    const uploadFilePath = uploadToken.prePath + fileKey;


    // 开始上传；
    const observable = qiNiu.upload(
      file,
      uploadFilePath,
      uploadToken.uploadToken,
      {},
      {},
    );
    const subscription = observable.subscribe({
      next(res) {
        query.antdUploadQuery.onProgress?.({
          percent: res.total.percent,
        });
      },
      error(err) {
        query.antdUploadQuery.onError?.({
          status: 500,
          method: query.antdUploadQuery.method,
          url: fullUrl,
          name: err.name || 'upload',
          message: err.message,
        });
      },
      complete(res) {
        query.antdUploadQuery.onSuccess?.({
          hash: res?.hash,
          key: res?.key,
          url: uploadToken.domain + res?.key,
        });
      },
    });
    // subscription.unsubscribe() // 上传取消
    return subscription;
  }

  async del( uploadType: FileUpload.UploadType, url: string ){
    await FileUploadController.del({
      uploadType,
      url,
    }).catch((err) => {
      console.log("FileUploadController.del:", err )
    });
  }

  async getUploadToken(
    uploadType: FileUpload.UploadType,
  ): Promise<FileUpload.UploadToken> {
    if (this.uploadToken.uploadToken) {
      return this.uploadToken;
    }

    let error = new Error('');
    const uploadToken = await FileUploadController.getUploadToken({
      uploadType,
    }).catch((err) => {
      error = err;
    });

    console.log('uploadToken thumb:', uploadToken);

    if (!uploadToken) {
      return Promise.reject(error);
    }

    this.uploadToken = uploadToken;
    return uploadToken;
  }
}

export default FileUpload;
