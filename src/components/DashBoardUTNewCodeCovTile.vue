<template>
  <div class="newCodeCovTileContent">
    <div class="todayCoverage" :class="todayCoverageColorClass">
      Today<span></span> Coverage: <span style='font-weight: bold;'>75%</span>
      <div style="display:inline-block; text-align:right;width: 20px; height:20px;text-align: center;font-size: 1.5rem;font-weight: bold;" class="fa fa-thumbs-up" :class="trendArrowClasses"/>
      <!--div style="display:inline-block; width: 20px; height:20px;text-align: center;font-size: 1.5rem;" class="fa fa-angle-down"/-->
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
      trendArrowClasses: ['fontColor', 'okDarkColor'],
      echartOption: {
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            show: true,
            interval: 0,
            formatter: function (value, index) {
              var axisYear = parseInt(value.substring(0, 4));
              var todayYear = new Date().getFullYear();
              if (axisYear === todayYear) {
                return value.substring(5)
              } else {
                return value;
              }
            }
          },
          width: '10%'
        },
        yAxis: {
          type: 'value',
          min: function(value) {
            if (value.min - 10 > 0) {
              return value.min - 10;
            } else {
              return 0;
            }
          },
          axisLabel: {
            show: true,
            interval: 0,
            formatter: '{value}%'
          },
          minInterval: 5,
          interval: 5
        },
        series: [{
            data: [],
            type: 'bar',
            smooth: true,
            barMaxWidth: '20%',
            label: {
              normal: {
                show: true,
                textBorderColor: '#333',
                textBorderWidth: 2,
                fontSize: 20,
                formatter: function (item) {
                  return 'New:' + item.data;
                }
              }
            }
        }, {
            data: [],
            type: 'line',
            smooth: true,
            label: {
              normal: {
                show: true,
                textBorderColor: '#333',
                textBorderWidth: 2,
                fontSize: 16,
                formatter: function (item) {
                  return 'Overall:' + item.data;
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
  methods: {
    initTile() {
      this.initChart();
    },
    reRenderTile() {
      this.initChart();
    },
    initChart() {
      if (this.chart != null) {
        this.chart.dispose();
      }
      if (this.$refs == null || this.$refs.coverageChart == null) {
        return;
      }
      let tileHeight = $(this.$el).parent().parent().height();
      let tileTitleHeight = $(this.$el).parent().parent().find('.dashBoardTileTitle').outerHeight();
      this.chart = echarts.init(this.$refs.coverageChart, this.echartThemeing, {
        renderer: 'svg',
        height: (tileHeight - tileTitleHeight - 65) + 'px'
      });
      // 把配置和数据放这里
      this.getJobData();
    },
    getJobData() {
      let self = this;
      this.$axios.get('/api/vuedashboard/getNewUTCodeCoverage').then(response => {
        let jobsData = response.data;
        if (jobsData.success === true) {
          jobsData = jobsData.data;
          self.processJobData(jobsData);
          self.chart.setOption(self.echartOption);
        }
        
      });
    },
    processJobData(jobsData) {
      for (let idx in jobsData) {
        if (idx != null) {
          let data = jobsData[idx];
          let dataDate = data.date.substring(0, 10);
          this.echartOption.xAxis.data.push(dataDate);
          this.echartOption.series[0].data.push(parseInt(data.codeCoverage.new_coverage));
          this.echartOption.series[1].data.push(parseInt(data.codeCoverage.coverage));
        }
      }
      console.log(this.echartOption);
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
