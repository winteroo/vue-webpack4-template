import Vue from 'vue';
import './style/index.css';
import './style/add.scss';

import App from './App.vue';
import router from '../src/router/index';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  router,
  template: '<App/>'
});
