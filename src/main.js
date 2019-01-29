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
import DashBoardUTNewCodeCovTile from './components/DashBoardUTNewCodeCovTile';
import QuanlityTestingStatusTile from './components/QuanlityTestingStatusTile';
Vue.component('DashBoardUTNewCodeCovTile', DashBoardUTNewCodeCovTile);
Vue.component('QuanlityTestingStatusTile', QuanlityTestingStatusTile);
axios.get('/api/vuedashboard/getDashBoardConfig').then((response) => {
  var responseData = response.data;
  if (responseData.success === true) {
    var configData = responseData.data;
    // configData = {
    //   'headText': 'Title',
    //   'screenConfig': {
    //     'echartTheme': 'light',
    //     'slideStayTime': 10000,
    //     'totalPages': 2,
    //     'screens': [{
    //       'totalRows': 3,
    //       'totalColumns': 3,
    //       'updateFrequency': '24h',
    //       'themeing': 'black'
    //     }, {
    //       'totalRows': 1,
    //       'totalColumns': 1,
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
    //   }, {
    //     'tilesLayout': [[{
    //       'tileName': 'DashBoardUTNewCodeCovTile',
    //       'rowSpan': 1,
    //       'tileTitle': 'tile 1 page 2'
    //     }]]
    //   }]
    // };
    new Vue({
      router,
      render: h => h(App),
      data: configData
    }).$mount('#app');
  }
});
// http://10.129.126.28:5500/testngresult/
// http://10.129.126.28:5500/api/vuedashboard/
