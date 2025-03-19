import React, { useRef, useState } from 'react';
import styles from './index.less';
import { Button, Upload, UploadProps, Empty, Popconfirm } from 'antd';
import FileUpload from '../file-upload';
import {
  CloseCircleFilled,
  PlusOutlined,
} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import toastError from "@/lib/toastError";

interface Props {
  title?: React.ReactNode;
  defaultUrl?: string;
  fileKeyName?: string;
  uploadType: FileUpload.UploadType;
  disabledCrop?: boolean;
  accept?: string[];
  acceptTitle?: string;
  imageWidth?: number;
  imageHeight?: number;
  viewRatio?: number;
  onSuccess?: (url: string, urlKey: string ) => void;
}

const Thumb: React.FC<Props>
  = ({
  title = '上传',
  fileKeyName = 'file',
  defaultUrl = '',
       uploadType,
  accept = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    '.png',
    '.jpg',
  ],
       disabledCrop,
  acceptTitle= 'PNG、JPG、WEBP',
  imageWidth = 300,
  imageHeight = 300,
  viewRatio = 1,
  onSuccess = () => {},
}) => {
  const fileUploadRef = useRef<FileUpload>(new FileUpload(true));
  const [currentUrl, setCurrentUrl] = useState(defaultUrl);
  const [loading, setLoading] = useState(false);
  const upProps: UploadProps = {
    name: fileKeyName,
    maxCount: 1,
    accept: accept?.join(','),
    headers: {},
    disabled: loading,
    customRequest: async (antdUploadQuery) => {
      console.log('file customRequest:');
      setLoading(true);
      // 压缩
      const compressOptions = {
        quality: 0.9,
        // noCompressIfLarger: false,
        maxWidth: imageWidth,
        maxHeight: imageHeight,
      };

      const uploadResult = await fileUploadRef.current.upload({
        uploadType,
        compressOptions,
        antdUploadQuery,
      }).catch( err => {
        toastError( err?.message )
      });
    },
    // <ImgCrop 不允许 <Upload 存在 beforeUpload 属性；
    // beforeUpload() {
    //
    // },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(
          'file on Change:',
          info.file.status,
          info.file,
          info.fileList,
        );
      }
      if (info.file.status === 'done') {
        // on Change();
        const url = info.file.response.url || '';
        setCurrentUrl(url);
        setLoading(false);
        onSuccess(url, info.file.response?.key || '' );
      } else if (info.file.status === 'error') {
        setLoading(false);
      }
    },
  };

  const onDel = () => {
    setCurrentUrl('');
    onSuccess('', '');
  };

  const getUplaod = () => {
    return (
      <Upload {...upProps}>
        <div className={styles.uploadContent}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            loading={loading}
            ghost
          >
            {currentUrl ? '重新上传' : title}
          </Button>
          <div className={styles.alt}>
            <p className="ant-upload-text">
              支持格式：{ acceptTitle }
            </p>
            {/*<p className="ant-thumb-hint">建议竖向图</p>*/}
          </div>
        </div>
      </Upload>
    )
  }

  return (
    <div className={styles.thumb}>
      <div className={styles.showBox}>
        <div
          style={{
            width: imageWidth * viewRatio,
            height: imageHeight * viewRatio,
          }}
          className={styles.thumbImageBox}
        >
          {currentUrl ? (
            <div
              className={styles.imageBox}
              style={{
                width: imageWidth * viewRatio,
                height: imageHeight * viewRatio,
                backgroundImage: `url('${ currentUrl }')`,
              }}
            >
              <Popconfirm title="确定要删除？" onConfirm={onDel} okText="确定">
                <a className={styles.del}>
                  <CloseCircleFilled />
                </a>
              </Popconfirm>
              {/*<img src={currentUrl} alt="" className={styles.thumbImage} />*/}
            </div>
          ) : (
            <div className={styles.emptyUpload}>
              {
                disabledCrop ?
                  getUplaod()
                  :
                  <ImgCrop
                    aspect={imageWidth / imageHeight}
                    quality={1}
                    minZoom={0.2}
                    maxZoom={3}
                    rotationSlider={true}

                    modalWidth={720}
                    onModalOk={(file) => {
                      console.log('file onModalOk:', file);
                    }}
                    onModalCancel={() => {
                      console.log('file onModalCancel');
                    }}
                  >
                    { getUplaod() }
                  </ImgCrop>
              }

            </div>
          )}
        </div>
      </div>
      <div className={styles.operate}></div>
    </div>
  );
};
export default Thumb;
