<template>
  <div class="dashboardMain">
    <div class="dashBoardInner columns is-multiline">
      <div class="dashBoardTileColumn column" v-bind:class="[columnClassName]" v-bind:key="item" v-for="(item) in this.$root.screenConfig.totalColumns">
        <DashBoardTile></DashBoardTile>
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
      columnClassName: ''
    }
  },
  created () {
    let blockSize = 12 / this.$root.screenConfig.totalColumns;
    if (12 % this.$root.screenConfig.totalColumns != 0) {
      blockSize = Math.floor(12 / this.$root.screenConfig.totalColumns);
      
    }
    this.columnClassName = 'is-' + blockSize;
    // alert(($('body').height() - $('.dashBoardHeader').height() - 20 - 20) / 3);
    // alert(this.$root.screenConfig.totalRows);
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
@import '../themeing/black';
@import '../../node_modules/bulma';
.dashboardMain {
  background-color: $backgroundColor-normal;
  width: calc( 100% - 20px );
  height: calc( 100% - 20px );
  color: $fontColor-normal;
  padding: 10px;

  > div.dashBoardInner {
    position: relative;
    border: 1px solid $borderColor-normal;
    width: calc( 100% - 2px );
    height: calc( 100% - 2px );
    margin: 0px;
    align-items: flex-start;
  }

  .dashBoardTileColumn {
    align-self: flex-start;
    height: calc(100% - 10px);
    padding: 0px;
    .dashBoardTile {
      background-color: $tileBackgroundColor-normal;
      margin: 5px;
      height: 200px;
      .dashBoardTileTitle {
        height: 30px;
        border-bottom: 1px solid $borderColor-normal;
        font-size: 1.2rem;
        text-align: center;
      }

      .dashBoardTileContent {
        padding-top: 5px;
      }
    }
  }
}
</style>
