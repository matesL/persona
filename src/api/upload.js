import request from "./request";

// 请求上传图片接口
export const uploadimage = (data) => { 
  return request.post('/api/upload',
  data,
  {
    headers:{ 'Content-Type': 'multipart/form-data'}
  })
};

// 请求pdf文件
export const requestPDF = () => { 
  // { url: 'http://example.com/sample.pdf', httpHeaders: { 'X-CustomHeader': '40359820958024350238508234' }, withCredentials: true }

  return request.get('/api/requestPDF',
       {
        responseType: 'blob', //必写！
       },
      {
        headers: {

          'Content-Type': 'application/pdf'
        }
  })
  }
