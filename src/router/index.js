import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      //重定向到home界面
      redirect: "/user"
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/Main.vue'),
      children: [
        {
          path: '',
          name: 'user',
          redirect: "/user/home"
        },
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'history',
          name: 'history',
          component: () => import('../views/History.vue')
        },
        {
          path: 'manage',
          name: 'manage',
          component: () => import('../views/Manage.vue')
        },
        {
          path: 'setting',
          name: 'setting',
          component: () => import('../views/Setting.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/About.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
  ]
})
/**
 * 全局前置路由守卫，每一次路由跳转前都进入这个 beforeEach 函数
 */
router.beforeEach((to, from, next) => {
  if (to.path == '/login' || to.path == '/register') {
    // 登录或者注册才可以往下进行
    next();
  } else {
    // 获取 token
    const token = localStorage.getItem('token');
    // token 不存在
    if (token === null || token === '') {
      ElMessage.error('您还没有登录，请先登录');
      next('/login');
    } else {
      next();
    }
  }
});
export default router
