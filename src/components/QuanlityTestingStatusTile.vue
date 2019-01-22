<template>
  <div class="quanlityTestingStatusTile">
    <!--div class="todayCoverage" :class="todayCoverageColorClass">
      <div style="display:inline-block; text-align:right;width: 20px; height:20px;text-align: center;font-size: 1.5rem;font-weight: bold;" class="fa fa-thumbs-up" :class="trendArrowClasses"/>
      <div style="display:inline-block; width: 20px; height:20px;text-align: center;font-size: 1.5rem;" class="fa fa-angle-down"/>
    </div -->
    <div>
      <div class="qualityTestingStatus" ref="qualityTestingStatus">
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'quanlityTestingStatusTile',
  props: {
    msg: String
  },
  data() {
    return {
      echartThemeing: this.$root.screenConfig.echartTheme,
      echartOption: {
        tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: { //rgb(251, 114, 147);
        data:['QACAND Success','QACAND Failed','QAAUTOCAND Success','QAAUTOCAND Failed','Local Success','Local Failed']
      },
      grid: {
        left: 50,
        top: 60,
        bottom: 30
      },
      xAxis : [{
          type : 'category',
          data: [{
            value: 'Build 1',
            width: 10
          }, {
            value: 'Build 2',
            width: 10
          }, {
            value: 'Build 3',
            width: 10
          }]
        }
      ],
      yAxis: [ {
          type : 'value'
        }
      ],
      series: [{
            name:'QACAND Success',
            type:'bar',
            stack: 'QACAND',
            data:[200, 250, 230]
          }, {
            name:'QACAND Failed',
            type:'bar',
            stack: 'QACAND',
            data:[10, 20, 15],
            color: 'rgb(251, 114, 147)'
          },{
            name:'QAAUTOCAND Success',
            type:'bar',
            stack: 'QAAUTPCAND',
            data:[500, 459, 900]
          }, {
            name:'QAAUTOCAND Failed',
            type:'bar',
            stack: 'QAAUTPCAND',
            data:[100, 200, 100]
          },{
            name:'Local Success',
            type:'bar',
            stack: 'JEKINSLOCAL',
            data:[120, 132, 101]
          }, {
            name:'Local Failed',
            type:'bar',
            stack: 'JEKINSLOCAL',
            data:[220, 182, 191]
          },
        ]
      }
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
      let tileHeight = $(this.$el).parent().parent().height();
      let tileTitleHeight = $(this.$el).parent().parent().find('.dashBoardTileTitle').outerHeight();
      this.chart = echarts.init(this.$refs.qualityTestingStatus, this.echartThemeing, {
        renderer: 'svg',
        height: (tileHeight - tileTitleHeight  - 20) + 'px'
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

</style>
