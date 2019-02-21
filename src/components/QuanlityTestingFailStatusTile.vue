<template>
  <div class="quanlityTestingFailStatusTile">
    <div class="tile is-ancestor">
      <div class="tile is-parent" v-for="(jobs, jobName) in riskyJobs" v-bind:key="jobName">
        <article class="tile is-child box" :class="{ 'backgroundColor okColor': jobs.length == 0, 'backgroundColor infoColor': jobs.length > 0 }">
          <p class='tiletitle'>{{jobName}}</p>
          <p v-if="jobs.length > 0">{{jobs.length}} cases in risk</p>
          <p v-if="jobs.length == 0">Case status is fine</p>
        </article>
      </div>
    </div>
    <div class="caseDetailInJobs">
      <div v-for="(jobs, jobName) in riskyJobs" v-bind:key="jobName" class="caseDetailInJob">
        <span class='jobName'>{{jobName}} :</span>
        <span class="tag" v-for="(caseName, idx) in jobs" v-bind:key="idx">
          {{caseName}}
        </span>
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
      serverdata: {"cdp-hana-jdm2":{"result":[{"_id":{"case":"com.successfactors.test.qray.cases.cdp.learning.transcript.ENT200021308TranscriptAndDevGoalAssociation"},"fail_times":5,"fail_builds":[91,96,97,98,99]},{"_id":{"case":"com.successfactors.test.qray.cases.cdp.cws.general.ENT33843AddRolePermissionNoAddRoleButtonIfNoCreatePermission"},"fail_times":5,"fail_builds":[91,96,97,98,99]},{"_id":{"case":"com.successfactors.test.qray.cases.cdp.careerpathv2.ENT1101815AddingRolesToTheCareerPathWithDifferentOptionsListedInTheMenu"},"fail_times":5,"fail_builds":[91,96,97,98,99]},{"_id":{"case":"com.successfactors.test.qray.cases.cdp.careerpathv2.ENT1101822VerifyBasicElementsInConfigureCareerPathNode"},"fail_times":1,"fail_builds":[96]}],"check_build_list":[91,96,97,98,99]},"cdp-hana-jdm1":{"result":[{"_id":{"case":"com.successfactors.test.qray.cases.cdp.learning.ENT200020300UploadCertificatesToCompleteLearningActivity"},"fail_times":5,"fail_builds":[106,110,111,112,113]},{"_id":{"case":"com.successfactors.test.qray.cases.cdp.devgoal.pp3devgoalportlet.ENT200020933VerifyDevGoalsOnDevelopmentgoalPortletPP3"},"fail_times":5,"fail_builds":[106,110,111,112,113]},{"_id":{"case":"com.successfactors.test.qray.cases.cdp.mentoring.schedulejob.ENT200010659SupervisedProgramStatusWillNotBeChangedByScheduleJob"},"fail_times":1,"fail_builds":[113]},{"_id":{"case":"com.successfactors.test.qray.cases.cdp.checktool.validate.devplan.template.ENT200020405BasicObjectcheckForDevelopmentPlan"},"fail_times":1,"fail_builds":[113]}],"check_build_list":[106,110,111,112,113]}}
    }
  },
  created() {
    // created
  },
  mounted() {
    // this.initChart();
  },
  watch: {
    riskyJobs() {
      this.processUIAfterGetData();
    }
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
      this.$axios.get('/api/vuedashboard/getQuanlityTestingFailStatusSummary').then(response => {
        let jobsData = response.data;
        if (jobsData.success === true) {
          jobsData = jobsData.data;
          self.riskyJobs = self.processJobData(jobsData);
        }
      });
      return;
    },
    processJobData(jobDataObj) {
      let riskyJobObj = {};
      for (let jobName in jobDataObj) {
        if (jobDataObj[jobName] != null) {
          let jobData = jobDataObj[jobName];
          let jobResults = jobData.result;
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
    processUIAfterGetData() {
      this.$nextTick( () => {
        let caseDetailJobs = jQuery(this.$el).find('.caseDetailInJob');
        jQuery(this.$el).find('.caseDetailInJob').css('max-height', 'calc( 100% / ' + caseDetailJobs.length + ' )');
      });
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
  font-size: 1.2em;
  font-weight: bold;
  padding-bottom: 1rem;
}
.tile {
  text-align: center;
}
.jobName {
  font-weight: bold;
}
.tag {
  margin: 5px 5px;
}
.caseDetailInJobs {
  height: calc( 100% - 130px );

  > div {
    overflow: hidden;
  }
}
</style>