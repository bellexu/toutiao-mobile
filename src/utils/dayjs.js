// 初始化 dayjs 相关配置

import Vue from 'vue'
import dayjs from 'dayjs'
//加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
//配置使用处理相对时间
dayjs.extend(relativeTime)
//配置使用中文语言包
dayjs.locale('zh-cn') 

//把处理相对时间的代码包装为全局过滤器
//然后就可以在任何组件的模版中使用了
//所谓的过滤器其实就是一个可以在模版中调用的函数而已

//在组件的模版中使用过滤器 : {{xxx | relativeTime}}
//管道符前面的内容会作为参数传给过滤器函数
//过滤器返回值会渲染到使用过滤器的模版中
Vue.filter('relativeTime', value => {
    console.log(value)
    return dayjs(value).from(dayjs())
})


//例如时间日期格式化
// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

// console.log(dayjs('2022-01-01').from(dayjs()))