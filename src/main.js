import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  data: {
    'screenConfig': {
      'totalRows': 3,
      'totalColumns': 4,
      'totalPages': 2,
      'updateFrequency': '24h',
      'slideStayTime': 10000,
      'themeing': 'black'
    },
    'tilesConfig': {
      'test1': ''
    },
    'tilesLayout': [[{
      'tileName': 'DashBoardUTNewCodeCovTile',
      'titleRowSpan': 2,
      'tileTitle': 'New Code UT Coverage'
    }],
    [],
    [],
    []]
  }
}).$mount('#app')
