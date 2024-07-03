import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        // 进入home页面的时候加载所有路由
        component: Layout,
        redirect: '/article',
        children: [
            {
                path: 'article',
                name: '文章管理',
                meta: {
                    requiresAuth: true,
                    icon: 'user'
                },
                redirect: '/article/all',
                children: [
                    {
                        path: '/article/all',
                        name: '全部文章',
                        meta: {
                            requiresAuth: true,
                            icon: 'avatar',
                        },
                        component: () => import("@/views/articles/AllArticles.vue")
                    },
                    {
                        path: '/article/me',
                        name: '我的文章',
                        meta: {
                            requireAuth: true,
                            icon: 'avatar'
                        },
                        component: () => import("@/views/articles/MyArticles.vue")
                    }
                ]
            }
        ]
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("@/views/register/index.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
