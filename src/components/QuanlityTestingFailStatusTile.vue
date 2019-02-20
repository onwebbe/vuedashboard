<template>
  <div class="quanlityTestingFailStatusTile">
    <div class="tile is-ancestor">
      <div class="tile is-parent" v-for="(jobs, jobName) in riskyJobs" v-bind:key="jobName">
        <article class="tile is-child box" :class="{ 'backgroundColor okColor': jobs.length == 0, 'backgroundColor infoColor': jobs.length > 0 }">
          <p class='tiletitle'>{{jobName}}</p>
          <p v-if="jobs.length > 0">{{jobs.length}} jobs in risky</p>
          <p v-if="jobs.length == 0">Case status is fine</p>
        </article>
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
      riskyJobs: {},
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
    initTable() {
      this.getJobData();
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
      self.riskyJobs = self.processJobData(this.serverdata);
    },
    processJobData(jobDataObj) {
      let riskyJobObj = {};
      for (let jobName in jobDataObj) {
        if (jobDataObj[jobName] != null) {
          let jobData = jobDataObj[jobName];
          let jobResults = jobData.results;
          let jobTotalCount = jobData.check_build_list.length;
          let riskyJobs = [];
          riskyJobObj[jobName] = riskyJobs;
          for ( let j = 0; j < jobResults.length; j++ ) {
            let jobResult = jobResults[j];
            let failCount = jobResult.fail_times;
            let shortFailCaseName = this._getCaseShortDescription(jobResult._id.case);
            if ( failCount / jobTotalCount > 0.3 ) {
              riskyJobs.push(shortFailCaseName);
            }
          }
        }
      }
      return riskyJobObj;
    },
    _getCaseShortDescription(caseFullName) {
      let classFullName = caseFullName.substring(caseFullName.lastIndexOf('.') + 1);
      let classShortName = 'ENT';
      for ( let i = 'ENT'.length; i < classFullName.length; i++ ) {
        let currentChar = classFullName.charAt(i);
        if (isNaN(parseInt(currentChar))) {
          break;
        } else {
          classShortName += currentChar;
        }
      }
      return classShortName;
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
.quanlityTestingFailStatusTile {
  padding: 0px 10px;
}
.tiletitle {
  font-size: 1.1em;
  font-weight: bold;
  padding-bottom: 1rem;
}
.tile {
  text-align: center;
}
</style>