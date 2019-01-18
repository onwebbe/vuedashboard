import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
// {
//   'headText': 'Title',
//   'screenConfig': {
//     'echartTheme': 'dark',
//     'slideStayTime': 10000,
//     'screens': [{
//       'totalRows': 3,
//       'totalColumns': 4,
//       'totalPages': 2,
//       'updateFrequency': '24h',
//       'themeing': 'black'
//     }]
//   },
//   'tilesConfig': {
//     'test1': ''
//   },
//   'screens': [{
//     'tilesLayout': [[{
//       'tileName': 'DashBoardUTNewCodeCovTile',
//       'rowSpan': 1,
//       'tileTitle': 'New Code UT Coverage'
//     }, {
//       'tileName': 'DashBoardUTNewCodeCovTile',
//       'rowSpan': 1,
//       'tileTitle': 'New Code UT Coverage - 1'
//     }],
//     [],
//     [],
//     []]
//   }]
// }
axios.get('/vuedashboard/getDashBoardConfig').then((response) => {
  var responseData = response.data;
  if (responseData.success === true) {
    var configData = responseData.configData;
    new Vue({
      router,
      render: h => h(App),
      data: configData
    }).$mount('#app');
  }
});
