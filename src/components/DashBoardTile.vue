<template>
  <div class="dashBoardTile fontColorNormal tileBackGroundColorNormal" :style="{height: tileHeight}">
    <div class="dashBoardTileTitle">
      <div style="display:inline-block; width: 20px; height:20px;text-align: center;" class="fa fa-angle-double-left fontColor infoColor"/>
        <span class="fontColor infoColor">{{dashboardTileConfigData == null? '': dashboardTileConfigData.tileTitle}}</span>
      <div style="display:inline-block; width: 20px; height:20px;text-align: center;" class="fa fa-angle-double-right fontColor infoColor"/>
    </div>
    <div class="dashBoardTileContent">
      <NewCodeCoverageTile ref="tileContent"></NewCodeCoverageTile>
    </div>
  </div>
</template>

<script>
import NewCodeCoverageTile from './DashBoardUTNewCodeCovTile'
export default {
  name: 'DashBoardTile',
  props: {
    screenConfig: Object,
    dashboardTileConfigData: Object,
    dashboardHeight: Number
  },
  components: {
    NewCodeCoverageTile
  },
  data() {
    return {
      tileHeight: '100px'
    }
  },
  mounted () {
    // console.log(this.dashboardTileConfigData);
  },
  watch: {
    dashboardHeight: function (val) {
      let self = this;
      if (this.screenConfig != null && this.dashboardTileConfigData != null) {
        let eachRowHeight = Math.floor(this.dashboardHeight / this.screenConfig.totalRows);
        let elementHeight = eachRowHeight * this.dashboardTileConfigData.rowSpan;
        this.tileHeight = (elementHeight - 10) + 'px';
      }
      this.$nextTick(function () {
        self.$refs.tileContent.reRenderTile();
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
  }
}
</style>
