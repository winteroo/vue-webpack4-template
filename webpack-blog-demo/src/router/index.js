import Vue from 'vue';
import Router from 'vue-router';
import login from '../views/login.vue';
import home from '../views/home.vue';
import detail from '../views/detail.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    // // 登录
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import( /* webpackChunkName: "login" */ '../views/login')
    // },
    // // 登录超时
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: () => import( /* webpackChunkName: "home" */ '../views/home')
    // },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // 登录超时
    {
      path: '/home',
      name: 'Home',
      component: home
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    }
  ]
});

export default router;
