<template>
  <div class="dashboardMain">
    <div class="dashBoardInner">
      <div class="dashBoardTile">
        <div>
          title
        </div>
        <div>
          content
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashBoard',
  props: {
    msg: String
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
    border: 1px solid $borderColor-normal;
    width: calc( 100% - 2px );
    height: calc( 100% - 2px );
  }

  .dashBoardTile {
    background-color: $tileBackgroundColor-normal;
    height: 100px;
    width: 100px;
    margin: $tileMargin-normal;
    padding: 5px;
  }
}
</style>
