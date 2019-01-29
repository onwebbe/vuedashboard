<template>
  <div class="dashboardMain backgroundColorDashBoard fontColorNormal">
    <transition name="fade">
      <div class="dashBoardInner borderColorNormal columns is-multiline"  v-if="isShow">
        <div class="dashBoardTileColumn column" v-bind:class="[columnClassName]" v-bind:key="item" v-for="(item, index) in this.$root.screenConfig.screens[this.pageindex].totalColumns">
          <DashBoardTile ref="dashboardtiles" v-bind:key="tileIdx" v-for="(tileItem, tileIdx) in dashBoardTilesConfig[index]" :screenConfig="screenConfig" :dashboardTileConfigData="tileItem" :dashboardHeight="dashboardHeight"></DashBoardTile>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import DashBoardTile from '../components/DashBoardTile'
export default {
  name: 'DashBoard',
  props: {
    dashboardconfig: Object,
    pageindex: Number
  },
  components: {
    DashBoardTile
  },
  data () {
    return {
      columnClassName: '',
      dashBoardTilesConfig: this.$root.screens[this.pageindex].tilesLayout,
      screenConfig: this.$root.screenConfig.screens[this.pageindex],
      dashboardHeight: 0,
      isShow: true
    }
  },
  created () {
    this.columnClassName = 'is-' + this.calculateColumnBlockSize();
  },
  mounted () {
    this.dashboardHeight = $(window).height() - $('.dashBoardHeader').height() - 20;
  },
  methods: {
    calculateColumnBlockSize () {
      let blockSize = 12 / this.$root.screenConfig.screens[this.pageindex].totalColumns;
      if (12 % this.$root.screenConfig.screens[this.pageindex].totalColumns != 0) {
        blockSize = Math.floor(12 / this.$root.screenConfig.screens[this.pageindex].totalColumns);
      }
      return blockSize;
    },
    switchScreen (topageindex) {
      let self = this;
      this.isShow = false;
      self.dashBoardTilesConfig = self.$root.screens[topageindex].tilesLayout;
      self.screenConfig = self.$root.screenConfig.screens[topageindex];
      setTimeout(function () {
        self.isShow = true;
        
        self.$nextTick(function () {
          // console.log(self.$root.screenConfig.screens[topageindex].totalColumns);
          // console.log(self.$root.screens[topageindex].tilesLayout);
          self.columnClassName = 'is-' + self.calculateColumnBlockSize();
          self.dashboardHeight = $(window).height() - $('.dashBoardHeader').height() - 20;
          for (let i = 0; i < self.$refs.dashboardtiles.length; i++) {
            self.$refs.dashboardtiles[i].reRenderTile();
          }
        });
        setTimeout(function () {
          
        });
      },700);
    }
  },
  watch: {
    pageindex: function (newIndex) {
      this.switchScreen(newIndex);
    }
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
  max-height: calc( 100% - 20px );
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
