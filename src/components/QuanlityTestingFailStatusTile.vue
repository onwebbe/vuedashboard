<template>
  <div class="auanlityTestingFailStatusTile">
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
        serverdata: {
          "hana-dev-1": {
            "results": [{
              "_id": {
                  "case": "com.successfactors.test.qray.cases.cdp.learning.ENT200020300UploadCertificatesToCompleteLearningActivity"
              },
              "fail_times": 10,
              "fail_builds": [101, 102, 103, 104, 105, 106, 110, 111, 112, 113]
            }, {
                "_id": {
                    "case": "com.successfactors.test.qray.cases.cdp.devgoal.pp3devgoalportlet.ENT200020933VerifyDevGoalsOnDevelopmentgoalPortletPP3"
                },
                "fail_times": 10,
                "fail_builds": [101, 102, 103, 104, 105, 106, 110, 111, 112, 113]
            }, {
                "_id": {
                    "case": "com.successfactors.test.qray.cases.cdp.mentoring.schedulejob.ENT200010659SupervisedProgramStatusWillNotBeChangedByScheduleJob"
                },
                "fail_times": 1,
                "fail_builds": [113]
            }, {
                "_id": {
                    "case": "com.successfactors.test.qray.cases.cdp.checktool.validate.devplan.template.ENT200020405BasicObjectcheckForDevelopmentPlan"
                },
                "fail_times": 1,
                "fail_builds": [113]
            }],
            "check_build_list": [101, 102, 103, 104, 105, 106, 110, 111, 112, 113]
          },
          "hana-dev-2": {
            "results": [{
              "_id": {
                  "case": "com.successfactors.test.qray.cases.cdp.learning.ENT200020300UploadCertificatesToCompleteLearningActivity"
              },
              "fail_times": 10,
              "fail_builds": [101, 102, 103, 104, 105, 106, 110, 111, 112, 113]
            }, {
                "_id": {
                    "case": "com.successfactors.test.qray.cases.cdp.devgoal.pp3devgoalportlet.ENT200020933VerifyDevGoalsOnDevelopmentgoalPortletPP3"
                },
                "fail_times": 10,
                "fail_builds": [101, 102, 103, 104, 105, 106, 110, 111, 112, 113]
            }, {
                "_id": {
                    "case": "com.successfactors.test.qray.cases.cdp.mentoring.schedulejob.ENT200010659SupervisedProgramStatusWillNotBeChangedByScheduleJob"
                },
                "fail_times": 1,
                "fail_builds": [113]
            }, {
                "_id": {
                    "case": "com.successfactors.test.qray.cases.cdp.checktool.validate.devplan.template.ENT200020405BasicObjectcheckForDevelopmentPlan"
                },
                "fail_times": 1,
                "fail_builds": [113]
            }],
            "check_build_list": [101, 102, 103, 104, 105, 106, 110, 111, 112, 113]
          }
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
      this.initTable();
    },
    reRenderTile() {
      this.initTable();
    },
    initChart() {
      
    },
    getJobData() {
      let self = this;
    //   this.$axios.get('/api/vuedashboard/fetchJenkinsJobSummary').then(response => {
    //     let jobsData = response.data;
    //     if (jobsData.success === true) {
    //       jobsData = jobsData.data;
    //     }
    //   });
    //   return;
      self.processJobData(this.serverdata);
    },
    processJobData(jobData) {

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