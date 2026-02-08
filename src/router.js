import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from './firebase/auth'
import Login from './components/Login.vue'
import Home from './components/Home.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false }
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 인증 가드
router.beforeEach((to, from, next) => {
    const currentUser = getCurrentUser()
    const requiresAuth = to.meta.requiresAuth

    if (requiresAuth && !currentUser) {
        // 인증이 필요한 페이지인데 로그인하지 않은 경우
        next('/login')
    } else if (to.path === '/login' && currentUser) {
        // 이미 로그인한 사용자가 로그인 페이지 접근 시 홈으로
        next('/')
    } else {
        next()
    }
})

export default router
