declare namespace FileUpload {
  type UploadType = 'employee-avatar' | 'camera-image';
  interface UploadToken {
    uploadToken: string;
    region: string; //cn-east-2,
    prePath: string; // user-avatar/2022/10/11/1/,
    domain: string; //https://ixs-test.shanren.wang/
  }

  interface UploadSuccess {}
}
