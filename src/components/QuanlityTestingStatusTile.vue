<template>
  <div class="quanlityTestingStatusTile">
    <div class="datatable">
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
          }
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
        height: (tileHeight - tileTitleHeight - titleTableHeight - 15) + 'px'
      });
      this.getJobData();
    },
    getJobData() {
      let self = this;
      this.$axios.get('/api/vuedashboard/fetchJenkinsJobSummary').then(response => {
        let jobsData = response.data;
        self.processJobData(jobsData);
        self.chart.setOption(self.echartOption);
      });
  //     let jobsData = { 'cdp-hana-jdm2':
  //  [ { PASSED: 35, buildNumber: 'latest-2', FAILED: 1 },
  //    { PASSED: 37, buildNumber: 'latest-1', FAILED: 0 },
  //    { FAILED: 1, buildNumber: 'latest', PASSED: 36 } ],
  // 'cdp-hana-jdm1':
  //  [ { FAILED: 3, buildNumber: 'latest-2', PASSED: 67 },
  //    { FAILED: 1, buildNumber: 'latest-1', PASSED: 69 },
  //    { FAILED: 1, buildNumber: 'latest', PASSED: 69 } ] };
      return;
    },
    processJobData(jobData) {
      // this._processLegend(jobData);
      this._processXAxis(jobData);
      this._processSeries(jobData);
      // console.log(this.echartOption);
    },
    _processLegend(jobsData) {
      let legendData = [];
      for (let jobName in jobsData) {
        if (jobsData[jobName] != null) {
          let jobData = jobsData[jobName];
          legendData.push(jobName + '-PASSED');
          legendData.push(jobName + '-FAILED');
        }
      }
      this.echartOption.legend.data = legendData;
    },
    _processXAxis(jobsData) {
      let xaxisData = [];
      for (let jobName in jobsData) {
        if (jobsData[jobName] != null) {
          let dataItem = {
            value: jobName,
            width: 5
          }
          xaxisData.push(dataItem);
        }
      }
      this.echartOption.xAxis = [{}];
      this.echartOption.xAxis[0].data = xaxisData;
    },
    _formatToBaseOnBuild(jobsData) {
      let buildInformations = {};
      for (let jobName in jobsData) {
        let jobData = jobsData[jobName];
        if (jobData != null) {
          for (let i = 0; i < jobData.length; i++) {
            let jobBuildInfo = jobData[i];
            let buildNumber = jobBuildInfo['buildNumber'];
            let buildPassCount = jobBuildInfo.PASSED;
            let buildFailCount = jobBuildInfo.FAILED;
            let buildInfo = {
              'buildNumber': buildNumber,
              'passCount': buildPassCount,
              'failCount': -buildFailCount,
              'jobName': jobName
            }
            if (buildInformations[buildNumber] == null) {
              buildInformations[buildNumber] = [buildInfo];
            } else {
              buildInformations[buildNumber].push(buildInfo);
            }
          }
        }
      }
      return buildInformations;
    },
    _processSeries(jobsData) {
      let seriesData = [];
      let jobsDataList = [];
      let jobInfoMap = {};
      var seriesLabel = {
        normal: {
          show: true,
          textBorderColor: '#333',
          textBorderWidth: 2,
          fontSize: 24,
          formatter: function (item) {
            if ( item.data > 0 ) {
              return item.data;
            } else if ( item.data < 0 ){
              return (-item.data);
            } else {
              return '';
            }
          }
        }
      }
      for (let jobName in jobsData) {
        if ( jobsData[jobName] != null ) {
          let buildList = jobsData[jobName];
          for (let i = 0; i < buildList.length; i++) {
            let buildData = buildList[i];
            let buildNumber = buildData.buildNumber;
            let passCount = buildData.PASSED;
            let failCount = -buildData.FAILED;
            let passKey = buildNumber + '-PASSED';
            if (jobInfoMap[passKey] == null) {
              let seriesItemPass = {
                name: buildNumber + '-PASSED',
                type: 'bar',
                stack: jobName + buildNumber,
                data: [passCount],
                label: seriesLabel
              }
              jobInfoMap[passKey] = seriesItemPass;
            } else {
              jobInfoMap[passKey].data.push(passCount);
            }
            let failKey = buildNumber + '-FAILED';
            if (jobInfoMap[failKey] == null) {
              let seriesItemFail = {
                name: buildNumber + '-FAILED',
                type: 'bar',
                stack: jobName + buildNumber,
                data: [failCount],
                color: 'rgb(251, 114, 147)',
                label: seriesLabel
              }
              jobInfoMap[failKey] = seriesItemFail;
            } else {
              jobInfoMap[failKey].data.push(failCount);
            }
          }
        }
      }
      let legendData = [];
      for (let key in jobInfoMap) {
        if (jobInfoMap[key] != null) {
          seriesData.push(jobInfoMap[key]);
          legendData.push(key);
        }
      }
      this.echartOption.legend.data = legendData;
      this.echartOption.series = seriesData;
      // let buildsData = this._formatToBaseOnBuild(jobsData);
      // let seriesData = [];
      // let totalJobCount = 0;
      // for ( let buildNumber in buildsData ) {
      //   let buildsInfo = buildsData[buildNumber];
      //   if ( buildsInfo != null ) {
      //     let passCount = [];
      //     let failCount = [];
      //     let jobMap = {};

      //     for (let i = 0; i < buildsInfo.length; i++) {
      //       let buildInfo = buildsInfo[i];
      //       let jobName = buildInfo.jobName;
      //       if (jobMap[jobName] == null) {
      //         jobMap[jobName + '-PASSED'] = [buildInfo.passCount];
      //         jobMap[jobName + '-FAILED'] = [buildInfo.failCount];
      //       } else {
      //         jobMap[jobName + '-PASSED'].push(buildInfo.passCount);
      //         jobMap[jobName + '-FAILED'].push(buildInfo.failCount);
      //       }
            
      //     }
      //     for ( let finalJobName in jobMap ) {
      //       if (jobMap[finalJobName] != null) {
      //         let jobName = finalJobName.substring(0, finalJobName.length - 7);
      //         let seriesItem = {
      //           name: finalJobName,
      //           type: 'bar',
      //           stack: jobName + buildNumber,
      //           data: jobMap[finalJobName]
      //         }
      //         seriesData.push(seriesItem);
      //       }
      //     }
          
      //   }
      // }
      
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