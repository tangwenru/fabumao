import request from '@/lib/Request';
export async function getUploadToken(
  body: {
    uploadType: FileUpload.UploadType;
  },
  options?: Global.RequestOptions,
) {
  return request<FileUpload.UploadToken>(`user/file/uploadToken`, {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
    },
    params: {
      ...body,
    },
    ...(options || {}),
  });
}

//
export async function del(
  body: {
    url: string;
    uploadType: FileUpload.UploadType;
  },
  options?: Global.RequestOptions,
) {
  return request<FileUpload.UploadToken>(`user/file/del`, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/json',
    },
    data: {
      ...body,
    },
    ...(options || {}),
  });
}
