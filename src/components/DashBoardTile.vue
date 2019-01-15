<template>
  <div class="dashBoardTile">
    <div class="dashBoardTileTitle">
      title
    </div>
    <div class="dashBoardTileContent">
      content
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashBoardTile',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
@import '../themeing/black';
@import '../../node_modules/bulma';
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
</style>
