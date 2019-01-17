import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  data: {
    'headText': 'Title',
    'screenConfig': {
      'echartTheme': 'dark',
      'slideStayTime': 10000,
      'screens': [{
        'totalRows': 3,
        'totalColumns': 2,
        'totalPages': 2,
        'updateFrequency': '24h',
        'themeing': 'black'
      }]
    },
    'tilesConfig': {
      'test1': ''
    },
    'screens': [{
      'tilesLayout': [[{
        'tileName': 'DashBoardUTNewCodeCovTile',
        'rowSpan': 2,
        'tileTitle': 'New Code UT Coverage'
      },{
        'tileName': 'DashBoardUTNewCodeCovTile',
        'rowSpan': 1,
        'tileTitle': 'New Code UT Coverage - 1'
      }],
      [],
      [],
      []]
    }]
  }
}).$mount('#app')
