import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/layout/index.vue'
import {useUserStore} from "@/store/user";

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
                    icon: 'operation'
                },
                redirect: '/article/all',
                children: [
                    {
                        path: '/article/all',
                        name: '全部文章',
                        meta: {
                            requiresAuth: true,
                            icon: 'document',
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
            },
            {
                path: 'personal',
                name: '个人设置',
                meta: {
                    requiresAuth: true,
                    icon: 'operation'
                },
                children: [
                    {
                        path: '/personal/me',
                        name: '个人信息',
                        meta: {
                            requiresAuth: true,
                            icon: 'user'
                        },
                        component: () => import('@/views/personal/index.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("@/views/register/index.vue")
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/login/index.vue")
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to) => {
    const useStore = useUserStore();
    const {isLogin} = useStore;
    if (to.meta.requiresAuth && !isLogin) {
        return {
            name: 'Login'
        }
    }
})
export default router
