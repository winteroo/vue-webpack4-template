<template>
  <div class="demo">
    <button @click="change">测试按钮123</button>
    <div>
      <img :src="imgsrc" alt="" width="200">
    </div>
    <router-link to='login'>login</router-link> |
    <router-link to='home'>home</router-link> |
    <router-view></router-view>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es';
const imgsrc = require('./images/login-img.png');
export default {
  name: 'App',
  data () {
    return {
      imgsrc
    };
  },
  methods: {
    change () {
      const c = Math.random();
      const a = '就是' + c;
      const d = cloneDeep(a);
      console.log(a);
      console.log('Vue 执行123');
      console.log(process.env);
      console.log(d);
      document.body.style.setProperty('--main', '#108adf');
    }
  }
};
</script>
<style lang="scss" scoped>
.demo {
  width: 100vw;
  height: 100vh;
  text-align: center;
  padding-top: 30px;
  box-sizing: border-box;
  font-size: 30px;
}
button {
  background-color: #108adf;
  padding: 10px;
  line-height: 20px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
