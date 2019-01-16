<template>
  <div id="app">
    <div class="dashBoardHeader">
      Header Title
    </div>
    <div class="dashBoardContainer">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  components: {
  },
  created () {
    // let windowHeight = window.outerHeight;
    // document.getElementById('app').style.height = windowHeight + 'px';
  },
  mounted () {
    $('body').addClass('backgroundColorNormal');
    $('body').attr('themeStyle', 'black');
    // let windowHeight = window.outerHeight;
    // document.getElementById('app').style.height = windowHeight + 'px';
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
    height: 50px;
  }

  > .dashBoardContainer {
    flex: 1;
  }
}
</style>
