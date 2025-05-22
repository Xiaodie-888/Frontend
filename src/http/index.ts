import axios from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
    // 后端url地址
    baseURL: import.meta.env.VITE_API_BASEURL,
    timeout: 6000, //设置超时
    headers: { // 请求头
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

instance.interceptors.request.use(function (config) {
// 添加请求之前的逻辑
    return config;
}, function (error) {
// 当请求出现错误的逻辑
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
// 对响应数据进行处理
    // 判断响应数据中的status
    if(response.data.status||response.data.message){
        if(response.data.status==0){
            ElMessage({
                message: response.data.message, // 返回的message，如注册成功
                type: 'success', // 成功状态为绿色消息提示
            })
        }else{
            ElMessage.error(response.data.message) // 错误状态为红色消息提示
        }
    }
    return response.data;
}, function (error) {
// 当响应出现错误的逻辑
    if (error && error.response){
        switch (error.response.status){
            case 400:
                ElMessage.error('请求错误')
                break
            case 401:
                ElMessage.error('未授权，请登录')
                break
            case 403:
                ElMessage.error('拒绝访问')
                break
            case 404:
                ElMessage.error(`请求地址出错: ${error.response.config.url}`)
                break
            case 500:
                ElMessage.error('服务器内部错误')
                break
            default:
                ElMessage.error(`连接出错:${error.response.status}`)
        }
    }
    return Promise.reject(error);
});

export default instance