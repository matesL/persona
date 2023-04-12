import axios from "axios";

const API_BASE_URL = "http://localhost:8080/";
const instance = {
  baseURL: API_BASE_URL,
  withCredentials: true, // 开启跨域请求
} 
class AxiosHttp {
  service = ''
  constructor(config) {
    this.service = axios.create(config)
    console.log("请求处理");
    //请求处理
    this.service.interceptors.request.use(
      (config) => {
        console.log(config,"config");
        return { ...config, headers: { ...config.headers } }
      },
      (err) => {
        console.log(err);
        return Promise.reject(err)
      }
    )
    //响应处理
    this.service.interceptors.response.use(
      (response) => {
        console.log(response,"response");
        const { data } = response
        if (response.status!== 200) {
          // console.log(data,"data");
          return Promise.reject(response)
        }
        // console.log(data,"data");
        return data
      },
      (err) => {
        console.log(err,"err");
        return Promise.reject(err)
      }
    )
  }
  get(url, params, _object) {
    console.log(url,"url");
    return this.service.get(url, { params, ..._object })
  }
  post(url, params, _object) {
    
    return this.service.post(url, params, _object)
  }
  put(url, params, _object) {
    return this.service.put(url, params, _object);
  }

  delete(url, params, _object) {
    return this.service.delete(url, { params, ..._object });
  }

  patch(url, params, _object) {
    return this.service.patch(url, params, _object);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AxiosHttp(instance);