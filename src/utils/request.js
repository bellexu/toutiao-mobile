import axios from 'axios'
//在非组件模块中获取 store 必须通过这种方式
//这里单独加载store 和在组件中 this.$store 是一个东西
import store from '@/store/'

const request = axios.create({
    baseURL : 'http://api-toutiao-web.itheima.net'
})

//请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config)
    const { user } = store.state
    //如果用户已登录，统一给接口设置 token 信息
    if(user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    
    //处理完之后一定要把 config 返回，否则请求就会停在这里
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })

export default request