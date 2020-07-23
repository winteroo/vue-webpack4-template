<template>
  <div class="ccc" data-my>
    detail
  </div>
</template>

<script>
import { con, cc } from '../util/dd';
export default {
  name: 'detail',
  data () {
    return {
      c: 's'
    };
  },
  methods: {
    go () {
      con();
      cc();
    }
  }
};
</script>

<style>

</style>
