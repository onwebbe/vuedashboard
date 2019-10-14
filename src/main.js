import Vue from 'vue';
import App from './App.vue';
import router from './router';
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
import QuanlityTestingFailStatusTile from './components/QuanlityTestingFailStatusTile';
import DashBoardComPiplelineStatusTile from './components/DashBoardComPiplelineStatusTile';
import BurnDownChartTile from './components/BurnDownChartTile';
import JiraCustomerIssueListTile from './components/JiraCustomerIssueListTile';
import JiraCustomerIssueChartTile from './components/JiraCustomerIssueChartTile';

Vue.component('DashBoardUTNewCodeCovTile', DashBoardUTNewCodeCovTile);
Vue.component('QuanlityTestingStatusTile', QuanlityTestingStatusTile);
Vue.component('QuanlityTestingFailStatusTile', QuanlityTestingFailStatusTile);
Vue.component('DashBoardComPiplelineStatusTile', DashBoardComPiplelineStatusTile);
Vue.component('BurnDownChartTile', BurnDownChartTile);
Vue.component('JiraCustomerIssueListTile',JiraCustomerIssueListTile);
Vue.component('JiraCustomerIssueChartTile',JiraCustomerIssueChartTile)

axios.get('/api/vuedashboard/getDashBoardConfig').then((response) => {
  var responseData = response.data;
  if (responseData.success === true) {
    var configData = responseData.data.dashboardConfig;
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
Date.prototype.format = function( fmt ) { //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

try {
  document.addEventListener('WeixinJSBridgeReady', function onBridgeReady () {
    WeixinJSBridge.call('hideToolbar');
  });
} catch (e) {
}
// http://10.129.126.28:5500/testngresult/
// http://10.129.126.28:5500/api/vuedashboard/
