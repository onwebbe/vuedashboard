<template>
  <div class="dashBoardTile fontColorNormal tileBackGroundColorNormal fullBorderNormal" :style="tileStyle">
    <div class="dashBoardTileTitle borderColorNormal tileBackGroundColorTitle">
      <!-- <div style="display:inline-block; width: 20px; height:20px;text-align: center;" class="fa fa-angle-double-right fontColor fontColorNormal"/> -->
        <span class="fontColor fontColorNormal">{{dashboardTileConfigData == null? '': dashboardTileConfigData.tileTitle}}</span>
      <!-- <div style="display:inline-block; width: 20px; height:20px;text-align: center;" class="fa fa-angle-double-left fontColor fontColorNormal"/> -->
    </div>
    <div class="dashBoardTileContent">
      <!-- NewCodeCoverageTile ref="tileContent"></NewCodeCoverageTile >
      <DashBoardUTNewCodeCovTile ref="tileContent" v-if="allTiles.DashBoardUTNewCodeCovTile"></DashBoardUTNewCodeCovTile>
      <QuanlityTestingStatusTile ref="tileContent" v-if="allTiles.QuanlityTestingStatusTile"></QuanlityTestingStatusTile  -->
      <component ref="tileContent" :is="this.dashboardTileConfigData.tileName" :params="dashboardTileConfigData.params"/>
    </div>
  </div>
</template>

<script>
import { clearInterval } from 'timers';


export default {
  name: 'DashBoardTile',
  props: {
    screenConfig: Object,
    dashboardTileConfigData: Object,
    dashboardHeight: Number
  },
  components: {
    // TileContent: function () {
    //   import('@/components/' + this.dashboardTileConfigData.tileName + '.vue');
    // }
  },
  data() {
    return {
      tileHeight: '100px',
      tileWidth: null,
      params: {}
    }
  },
  created () {
    console.log(this.$children);
  },
  methods: {
    beforeDestroy() {
      if (this.timeoutInteval) {
        clearInterval(this.timeoutInteval);
      }
    },
    reRenderTile () {
      console.log("reRenderTile");
      this.setDashBoardHeight(this.dashboardHeight);
    },
    registerComponent(templateName) {
      return import('./' + templateName + '.vue').then((component) => {
        return Vue.component('TileContentComponent', component)
      })
    },
    setDashBoardHeight (val) {
      let self = this;
      if (this.screenConfig != null && this.dashboardTileConfigData != null) {
        let eachRowHeight = Math.floor(this.dashboardHeight / this.screenConfig.totalRows);
        let elementHeight = eachRowHeight * this.dashboardTileConfigData.rowSpan;
        this.tileHeight = (elementHeight - 10) + 'px';

        
        let colspan = 1;
        if (this.dashboardTileConfigData.colSpan) {
          colspan = this.dashboardTileConfigData.colSpan;
        }
        if (colspan > 1) {
          this.tileWidth = ($(this.$el).width() * 2 + 10) + 'px';
        }
      }
      this.$nextTick(function () {
        if (self.$refs.tileContent != null) {
          self.$refs.tileContent.reRenderTile();
          self.startRefreshTile();
        }
      });
    },
    startRefreshTile () {
      var self = this;
      var timeoutTime = this.dashboardTileConfigData.timeout;
      if (!timeoutTime) {
        timeoutTime = 60000;
      }
      if (timeoutTime === 0) {
        return;
      }
      this.timeoutInteval = setInterval(function () {
        if (self.$refs.tileContent && self.$refs.tileContent.reRenderTile) {
          self.$refs.tileContent.reRenderTile();
        }
      }, timeoutTime);
    },
    stopRefreshTile () {
      clearInterval(this.timeoutInteval);
    }
  },
  watch: {
    dashboardHeight: function (val) {
      this.setDashBoardHeight(val);
    },
    screenConfig () {
      this.setDashBoardHeight(this.dashboardHeight);
    }
  },
  computed: {
    tileStyle() {
      let style = {
        height: this.tileHeight
      };
      if (this.tileWidth) {
        style.width = this.tileWidth;
      }
      return style;
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
.dashBoardTile {
  margin: 5px;
  .dashBoardTileTitle {
    height: 30px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    font-size: 1.2rem;
    line-height: 30px;
    padding-left: 1.3rem;
    margin-bottom: 10px;
  }
  .dashBoardTileContent {
    padding-top: 5px;
    height: calc( 100% - 46px );

    > div {
      height: 100%;
    }
  }
}
</style>
