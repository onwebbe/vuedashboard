<template>
  <div class="dashboardMain backgroundColorNormal fontColorNormal">
    <div class="dashBoardInner borderColorNormal columns is-multiline">
      <div class="dashBoardTileColumn column" v-bind:class="[columnClassName]" v-bind:key="item" v-for="(item, index) in this.$root.screenConfig.totalColumns">
        <DashBoardTile :dashboardTileConfigData="dashBoardTilesConfig[index][0]"></DashBoardTile>
      </div>
    </div>
  </div>
</template>

<script>
import DashBoardTile from '../components/DashBoardTile'
export default {
  name: 'DashBoard',
  props: {
    msg: String
  },
  components: {
    DashBoardTile
  },
  data () {
    return {
      columnClassName: '',
      dashBoardTilesConfig: this.$root.tilesLayout
    }
  },
  created () {
    let blockSize = 12 / this.$root.screenConfig.totalColumns;
    if (12 % this.$root.screenConfig.totalColumns != 0) {
      blockSize = Math.floor(12 / this.$root.screenConfig.totalColumns);
    }
    this.columnClassName = 'is-' + blockSize;
  },
  mounted () {
    alert($(this.$el).height());
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
@import '../themeing/themings';
@import '../../node_modules/bulma';
.dashboardMain {
  width: calc( 100% - 20px );
  height: calc( 100% - 20px );
  padding: 10px;

  > div.dashBoardInner {
    position: relative;
    border-width: 1px;
    border-style: solid;
    width: calc( 100% - 2px );
    height: calc( 100% - 2px );
    margin: 0px;
    align-items: flex-start;
  }

  .dashBoardTileColumn {
    align-self: flex-start;
    height: calc(100% - 10px);
    padding: 0px;
  }
}
</style>
