import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/myLogin.vue'
import Layout from '@/views/layout/myLayout.vue'
import Home from '@/views/home/myHome'
import Qa from '@/views/qa/myQa'
import Me from '@/views/my/myMe'
import Video from '@/views/video/myVideo'

Vue.use(VueRouter)

const routes = [
    {
        path : '/login',
        name : 'login',
        component : Login
    },
    {
        path : '/',
        component : Layout,
        children : [
            {
                path : '', //默认子路由
                name : 'home',
                component : Home,
            },
            {
                path : '/qa',
                name : 'qa',
                component : Qa,
            },
            {
                path : '/my',
                name : 'my',
                component : Me,
            },
            {
                path : '/video',
                name : 'video',
                component : Video,
            },
        ]
    },

]

const router = new VueRouter({
    routes
})

export default router