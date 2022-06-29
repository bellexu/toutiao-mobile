import Vue from 'vue'
import App from './App.vue'
//加载路由对象
import router from './router'
import store from './store'

//加载 vant 核心组件库
import Vant from 'vant'
//加载 vant 全局样式
import 'vant/lib/index.css'
//加载动态设置 rem 基准值
import 'amfe-flexible'

//加载全局样式,放到最后，避免优先级
import './style/index.less'


//注册使用vant组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({ 
  router,
  store,
  render: h => h(App),
}).$mount('#app')
