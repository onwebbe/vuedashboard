<template>
  <div class="newCodeCovTileContent">
    <div class="todayCoverage" :class="todayCoverageColorClass">
      Today<span>({{newCodeCoverageData[newCodeCoverageData.length - 1].date}})</span> Coverage: <span style='font-weight: bold;'>75%</span>
      <div style="display:inline-block; width: 20px; height:20px;text-align: center;font-size: 1.5rem;" class="fa fa-angle-up"/>
      <div style="display:inline-block; width: 20px; height:20px;text-align: center;font-size: 1.5rem;" class="fa fa-angle-down"/>
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
      todayCoverageColorClass: ['okColor', 'backgroundColor'],
      echartThemeing: this.$root.screenConfig.echartTheme,
      echartOption: {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [],
          type: 'line',
          color: 'yellow'
        }]
      },
      newCodeCoverageData: [{
        date: '2019-01-10',
        coverage: 0.75
      }, {
        date: '2019-01-11',
        coverage: 0.6
      }, {
        date: '2019-01-12',
        coverage: 0.5
      }, {
        date: '2019-01-13',
        coverage: 0.55
      }, {
        date: '2019-01-14',
        coverage: 0.65
      }]
    }
  },
  created() {
    // created
  },
  mounted() {
    // this.initChart();
  },
  methods: {
    initTile() {
      this.initChart();
    },
    reRenderTile() {
      this.initChart();
    },
    initChart() {
      for (let idx in this.newCodeCoverageData) {
        if (idx != null) {
          let data = this.newCodeCoverageData[idx];
          this.echartOption.xAxis.data.push(data.date);
          this.echartOption.series[0].data.push(data.coverage);
        }
      }
      let tileHeight = $(this.$el).parent().parent().height();
      let tileTitleHeight = $(this.$el).parent().parent().find('.dashBoardTileTitle').outerHeight();
      this.chart = echarts.init(this.$refs.coverageChart, this.echartThemeing, {
        renderer: 'svg',
        height: (tileHeight - tileTitleHeight - 65) + 'px'
      });
      // 把配置和数据放这里
      this.chart.setOption(this.echartOption);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
@import '../themeing/themings';
@import '../../node_modules/bulma';
$fa-font-path: '../../node_modules/font-awesome/fonts/';
@import '../../node_modules/font-awesome/scss/font-awesome';
.todayCoverage {
  font-size: 1.2rem;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
  color: white;
  opacity: 0.8;
}
.newCodeCoverage {
  margin-top: 5px;
}
</style>
