import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */'@/views/login')
    },
    // 登录超时
    {
      path: '/home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */'@/views/home')
    }
  ]
});

export default router;
