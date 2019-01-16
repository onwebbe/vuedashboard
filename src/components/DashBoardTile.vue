<template>
  <div class="dashBoardTile fontColorNormal tileBackGroundColorNormal">
    <div class="dashBoardTileTitle">
      title
    </div>
    <div class="dashBoardTileContent">
      <NewCodeCoverageTile></NewCodeCoverageTile>
    </div>
  </div>
</template>

<script>
import NewCodeCoverageTile from './DashBoardUTNewCodeCovTile'
export default {
  name: 'DashBoardTile',
  props: {
    dashboardTileConfigData: Object
  },
  components: {
    NewCodeCoverageTile
  },
  created() {
    console.log(this.dashboardTileConfigData);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
@import '../themeing/themings';
@import '../../node_modules/bulma';
.dashBoardTile {
  margin: 5px;
  height: 600px;
  .dashBoardTileTitle {
    height: 30px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 10px;
  }
  .dashBoardTileContent {
    padding-top: 5px;
  }
}
</style>
