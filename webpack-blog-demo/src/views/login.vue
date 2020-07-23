<template>
  <div class="ccc" data-my>
    login
  </div>
</template>

<script>
import fun from '../util/index';
import { con } from '../util/dd';
export default {
  name: 'login',
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

<style>

</style>
