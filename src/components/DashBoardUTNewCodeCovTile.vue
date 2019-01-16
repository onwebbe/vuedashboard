<template>
  <div class="newCodeCovTileContent">
    <div class="todayCoverage" v-bind:class="[]">
      Today Coverage: <span style='font-weight: bold;'>75%</span>
    </div>
    <div>
      <div class="newCodeCoverage" ref="coverageChart">
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'DashBoardUTNewCodeCovTile',
  props: {
    msg: String
  },
  data() {
    return {
      todayCoverageColorClass: 'okColor'
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let tileHeight = $(this.$el).parent().parent().height();
      let tileTitleHeight = $(this.$el).parent().parent().find('.dashBoardTileTitle').outerHeight();
      this.chart = echarts.init(this.$refs.coverageChart, null, {
        renderer: 'svg',
        height: (tileHeight - tileTitleHeight - 20) + 'px'
      });
      // 把配置和数据放这里
      this.chart.setOption({
          title: {
              text: ''
          },
          tooltip: {},
          xAxis: {
              data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
          }]
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
@import '../themeing/themings';
@import '../../node_modules/bulma';
.todayCoverage {
  font-size: 1.2rem;
}
.newCodeCoverage {
  margin-top: 5px;
}
</style>
