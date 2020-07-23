<template>
  <div class="home">
    home hot --
  </div>
</template>

<script>
import fun from '../util/index';
import { con } from '../util/dd';
export default {
  name: 'home',
  data () {
    return {
      c: 's'
    };
  },
  methods: {
    go () {
      fun();
      con();
    }
  }
};
</script>

<style lang="scss" scoped>
.home{
  font-size: 20px;
  color: red;
}
</style>
