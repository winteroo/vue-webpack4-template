<template>
  <div ref="chartId" class="chart"></div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'EChart',
  props: {
    option: {
      type: Object,
      required: true
    },
    theme: {
      type: String,
      default: 'light' // dark暗黑主题
    }
  },
  data () {
    return {
      chart: null
    };
  },
  mounted () {
    this.initChart();
    window.addEventListener('resize', this.resizeEvent, false);
  },
  watch: {
    option: {
      handler (n, o) {
        this.chart.setOption(n);
      },
      deep: true
    }
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$refs.chartId, 'light');
      this.chart.setOption(this.option);
    },
    resizeEvent () {
      this.chart.resize();
    }
  }
};
</script>

<style lang="scss" scoped>
.chart{
  height: 300px;
}
</style>
