<template>
  <div class="comPiplelineStatus">
    <div class="success" v-for="(item, idx) in pipleLineStatus" v-bind:key="idx">
      <div :class="[bgColorClass(item.name)]">
        {{getTitle(item.name)}}
      </div>
      <div class="dataRow">
        <div class="dataRowTitle">
          Time when done
        </div>
        <div class="dataRowContent">
          {{item.time}}
        </div>
      </div>
      <div class="dataRow">
        <div class="dataRowTitle">
          Pull Request Owner
        </div>
        <div class="dataRowContent">
          {{item.owner}}
        </div>
      </div>
      <div class="dataRow">
        <div class="dataRowTitle">
          Pull Request No.
        </div>
        <div class="dataRowContent" v-html="item.pullRequest">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashBoardComPiplelineStatus',
  props: {
    msg: String
  },
  data() {
    return {
      pipleLineStatus: []
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
  methods: {
    initTile() {
      this.initTitleContent();
    },
    reRenderTile() {
      this.initTitleContent();
    },
    initTitleContent() {
      
      // 把配置和数据放这里
      this.getJobData();
    },
    getJobData() {
      let self = this;
      self.pipleLineStatus = [];
      this.$axios.get('/api/vuedashboard/getComponentPiplelineRunStatusWorker').then( (response) => {
        let jobsData = response.data;
        if (jobsData.success === true) {
          console.log(jobsData);
          var dataItem = jobsData.data;
          var completedData = self.processData('completed', dataItem);
          var failedData = self.processData('failed', dataItem);
          var successData = self.processData('success', dataItem);
          self.pipleLineStatus.push(completedData);
          self.pipleLineStatus.push(successData);
          self.pipleLineStatus.push(failedData);
        }
      });
    },
    processData(name, data) {
      data = data[name];
      if (!data) {
        return {
          name: '',
          time: '',
          owner: '',
          pullRequest: ''
        };
      }
      let statusData = {
        'name': name,
        'pullRequest': data.description,
        'time': new Date(data.timestamp).format('yyyy-MM-dd'),
        'owner': data.owner.value
      }
      return statusData;
    },
    bgColorClass (name) {
      let colorName = '';
      switch(name) {
        case 'completed':
          colorName = 'backgroundColor infoColor';
          break;
        case 'failed':
          colorName = 'backgroundColor errorColor';
          break;
        case 'success':
          colorName = 'backgroundColor okColor';
          break;
        default:
          colorName = 'backgroundColorNormal';
          break;
      }
      return colorName;
    },
    getTitle (name) {
      let title = '';
      switch(name) {
        case 'completed':
          title = 'Latest Complete';
          break;
        case 'failed':
          title = 'Latest Failed';
          break;
        case 'success':
          title = 'Latest Success';
          break;
        default:
          title = '';
          break;
      }
      return title;
    }
  },
  computed: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
@import '../themeing/themings';
@import '../../node_modules/bulma';
$fa-font-path: '../../node_modules/font-awesome/fonts/';
@import '../../node_modules/font-awesome/scss/font-awesome';
.comPiplelineStatus {
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  font-size: 20px;
  > div {
    flex-grow: 1;
    padding: 0px 10px;
    text-align: center;
    > div:first-child {
      padding: 0px 5px;
      height: 120px;
      border-radius: 10px;
      display: flex;
      font-size: 25px;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-bottom: 20px;
    }
  }
  .dataRow {
    margin: 20px 5px;
    text-align: left;
    .dataRowTitle {
      font-size: 1.1 em;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
}
</style>
