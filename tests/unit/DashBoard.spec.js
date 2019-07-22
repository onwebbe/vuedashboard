import { expect } from 'chai'
// import { shallowMount } from '@vue/test-utils'
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
        'echartTheme': 'light',
        'slideStayTime': 30000,
        'totalPages': 1,
        'screens': [{
          'totalRows': 2,
          'totalColumns': 3,
          'updateFrequency': '24h',
          'themeing': 'black'
        }, {
          'totalRows': 1,
          'totalColumns': 1,
          'updateFrequency': '24h',
          'themeing': 'black'
        }]
      },
      'tilesConfig': {
        'test1': ''
      },
      'screens': [{
        'tilesLayout': [
          [{
            'tileName': 'DashBoardUTNewCodeCovTile',
            'rowSpan': 1,
            'tileTitle': 'New Code UT Coverage'
          }, {
            'tileName': 'QuanlityTestingStatusTile',
            'rowSpan': 1,
            'tileTitle': 'Jenkins Testing'
          }],
          [{
            'tileName': 'QuanlityTestingFailStatusTile',
            'rowSpan': 1,
            'tileTitle': 'QuanlityTestingFailStatusTile'
          }],
          [],
          []
        ]
      },
      {
        'tilesLayout': [
          [{
            'tileName': 'DashBoardUTNewCodeCovTile',
            'rowSpan': 1,
            'tileTitle': 'New Code Coverage'
          }]
        ]
      }]
    };
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(DashBoard),
      data: configData
    });
    expect($(vm.$el)).to.have.lengthOf(1);
    expect($(vm.$el).find('.dashBoardInner > .dashBoardTileColumn')).to.have.lengthOf(4);
  })
})
