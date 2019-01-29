<template>
  <div id="app" class="backgroundColorNormal fontColorNormal">
    <div class="dashBoardHeader">
      {{this.$root.headText}}
    </div>
    <div class="dashBoardContainer">
      <DashBoard :pageindex="pageindex"/>
    </div>
  </div>
</template>
<script>
import DashBoard from './views/DashBoard';
export default {
  name: 'home',
  components: {
    DashBoard
  },
  data: function () {
    return {
      pageindex: 0
    }
  },
  created () {
    // let windowHeight = window.outerHeight;
    // document.getElementById('app').style.height = windowHeight + 'px';
  },
  mounted () {
    $('body').addClass('backgroundColorNormal');
    $('body').attr('themeStyle', 'fiori');
    // let windowHeight = window.outerHeight;
    // document.getElementById('app').style.height = windowHeight + 'px';
    let self = this;
    setTimeout(function (){
      self.pageindex = 1;
    }, 5000);
  }
}
</script>
<style lang="scss" type="text/css">
@import './themeing/themings';
body {
  border: 0px !important;
  margin: 0px !important;
  overflow: hidden;
  height: 100vh;
}
#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  > .dashBoardHeader {
    height: 35px;
    min-height: 35px;
    line-height: 45px;
    font-size: 1.2rem;
    text-align: center;
  }

  > .dashBoardContainer {
    flex: 1;
  }
}
</style>
