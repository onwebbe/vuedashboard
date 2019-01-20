import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import DashBoard from '@/views/DashBoard.vue'
import Vue from 'vue';

describe('Test for DashBoard.vue', () => {
  it('renders props.msg when passed', () => {
    // const wrapper = shallowMount(DashBoard, {
    //   mocks: {
    // data: {
    //   'columnClassName': '',
    //   'dashBoardTilesConfig': [[{
    //     'tileName': 'DashBoardUTNewCodeCovTile',
    //     'rowSpan': 1,
    //     'tileTitle': 'New Code UT Coverage'
    //   }, {
    //     'tileName': 'DashBoardUTNewCodeCovTile',
    //     'rowSpan': 1,
    //     'tileTitle': 'New Code UT Coverage - 1'
    //   }]],
    //   'screenConfig': {
    //     'totalRows': 3,
    //     'totalColumns': 4,
    //     'totalPages': 2,
    //     'updateFrequency': '24h',
    //     'themeing': 'black'
    //   },
    //   'dashboardHeight': 0
    // }
    //   },
    //   propsData: {
    //   }
    // })
    let configData = {
      'headText': 'Title',
      'screenConfig': {
        'echartTheme': 'dark',
        'slideStayTime': 10000,
        'screens': [{
          'totalRows': 3,
          'totalColumns': 4,
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
          'rowSpan': 1,
          'tileTitle': 'New Code UT Coverage'
        }, {
          'tileName': 'DashBoardUTNewCodeCovTile',
          'rowSpan': 1,
          'tileTitle': 'New Code UT Coverage - 1'
        }],
        [],
        [],
        []]
      }]
    }
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(DashBoard),
      data: configData
    });
    expect($(vm.$el).find('.dashBoardInner > .dashBoardTileColumn')).to.have.lengthOf(4);
  })
})
