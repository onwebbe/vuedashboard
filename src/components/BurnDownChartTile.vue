<template>
  <div class="burnDownChartTile">
      <div ref="burnDownChart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'burnDownChartTile',
  props: {
    params: Object
  },
  data() {
    return {
      lastestNewCodeCoverage: 0,
      todayCoverageColorClass: ['okColor', 'backgroundColor'],
      echartThemeing: this.$root.screenConfig.echartTheme,
      trendArrowClasses: ['fontColor', 'okDarkColor'],
      echartOption: {
        xAxis: {
          type: 'category',
          data: [1564645283403, 1564731677526, 1564818077526],
          axisLabel: {
            show: true,
            interval: 0,
            formatter: function (value, index) {
              let chartDate = new Date(parseInt(value));
              return chartDate.format('yyyy-MM-dd');
            }
          }
        },
        yAxis: {
          type: 'value',
          min: function(value) {
            var returnValue;
            if (value.min - 10 > 0) {
              returnValue = value.min - 10;
            } else {
              returnValue = 0;
            }
            return returnValue;
          },
          axisLabel: {
            show: true,
            interval: 0,
            formatter: '{value}'
          },
          minInterval: 5,
          interval: 5
        },
        series: [{
          data: [310, 270, 230],
          type: 'line',
          smooth: false,
          label: {
            normal: {
              show: true,
              textBorderColor: '#333',
              textBorderWidth: 2,
              fontSize: 20,
              formatter: function (item) {
                return item.data;
              }
            }
          }
        }, {
          data: [310, 280, 270],
          type: 'line',
          smooth: true,
          label: {
            normal: {
              show: true,
              textBorderColor: '#333',
              textBorderWidth: 2,
              fontSize: 16,
              formatter: function (item) {
                return item.data;
              }
            }
          }
        }],
        legend: {
          show: false
        },
        title: {
          show: false
        },
        grid: {
          left: 50,
          top: 10,
          bottom: 30
        }
      },
      newCodeCoverageData: []
    }
  },
  created() {
    // created
  },
  mounted() {
    // this.initChart();
  },
  watch: {
  },
  computed: {
    getParamsString: function () {
      let str = '';
      for (let key in this.params) {
        if (key) {
          str = str + key + '=' + this.params[key] + '&';
        }
      }
      return str;
    }
  },
  methods: {
    initTile() {
      this.initChart();
    },
    reRenderTile() {
      // this.echartOption.xAxis.data = [];
      // this.echartOption.series[0].data = [];
      // this.echartOption.series[1].data = [];
      this.initChart();
    },
    initChart() {
      if (this.chart != null) {
        this.chart.dispose();
      }
      if (this.$refs == null || this.$refs.burnDownChart == null) {
        return;
      }
      let tileHeight = $(this.$el).parent().parent().height();
      let tileTitleHeight = $(this.$el).parent().parent().find('.dashBoardTileTitle').outerHeight();
      this.chart = echarts.init(this.$refs.burnDownChart, this.echartThemeing, {
        renderer: 'svg',
        height: (tileHeight - tileTitleHeight - 65) + 'px'
      });
      this.chart.setOption(this.echartOption);
      // 把配置和数据放这里
      // this.getJobData();
    },
    formatDate(dateMillium) {
        let chartDate = new Date(dateMillium);
        return chartDate.format('yyyy-MM-dd');
    },
    getJobData() {
      let self = this;
      this.$axios.get('/api/vuedashboard/getBurnDownChartWorker?' + this.getParamsString).then( (response) => {
        let jobsData = response.data;
        if (jobsData.success === true) {
          jobsData = jobsData.data;
          self.processJobData(jobsData);
          self.chart.setOption(self.echartOption);
        }
      });
    },
    processJobData(jobsData) {
      let xAxis = this.echartOption.xAxis;
      let yAxis = this.echartOption.yAxis;
      let series1 = yAxis.series[0];
      let series2 = yAxis.series[1];

      xAxis.data = [];
      series1.data = [];
      series1.data = [];
      jobsData.map((value, key, arr) => {
        xAxis.data.push(value.date);
        series1.data.push(value.estimated);
        series2.data.push(value.logged);
      })
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
.burnDownChartTile {
  height: 100%;
  width: 100%;
}
</style>
