<template>
  <div class="quanlityTestingStatusTile">
    <div class="datatable">
      <div class="columns">
        <div class="column">
          Environment
        </div>
        <div class="column">
          Build -2
        </div>
        <div class="column">
          Build -1
        </div>
        <div class="column">
          Build latest
        </div>
      </div>
      <div class="columns">
        <div class="column">
          QACAND
        </div>
        <div class="column">
          11
        </div>
        <div class="column">
          12
        </div>
        <div class="column">
          13
        </div>
      </div>
      <div class="columns">
        <div class="column">
          QAAUTOCAND
        </div>
        <div class="column">
          23
        </div>
        <div class="column">
          41
        </div>
        <div class="column">
          31
        </div>
      </div>
      <div class="columns">
        <div class="column">
          Local
        </div>
        <div class="column">
          99
        </div>
        <div class="column">
          44
        </div>
        <div class="column">
        66
        </div>
      </div>
    </div>
    <div>
      <div class="qualityTestingStatus" ref="qualityTestingStatus">
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'QuanlityTestingStatusTile',
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
            data:[100, 200, 100],
            color: 'rgb(251, 114, 147)'
          },{
            name:'Local Success',
            type:'bar',
            stack: 'JEKINSLOCAL',
            data:[120, 132, 101]
          }, {
            name:'Local Failed',
            type:'bar',
            stack: 'JEKINSLOCAL',
            data:[220, 182, 191],
            color: 'rgb(251, 114, 147)'
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
      let titleTableHeight = $(this.$el).find('.datatable').outerHeight();
      this.chart = echarts.init(this.$refs.qualityTestingStatus, this.echartThemeing, {
        renderer: 'svg',
        height: (tileHeight - tileTitleHeight - titleTableHeight) + 'px'
      });
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
.column {
  padding: 5px 8px;
}
.datatable {
  padding: 15px 20px;
  padding-top: 0px;
}
</style>