<template>
  <div style='width:100%;height:100%;overflow:hidden;justify-content: center;align-items: center;display:flex;' ref="tileInner">
    <div id='pieChartContainer'></div>
  </div>
</template>

<script>
import animations from 'create-keyframe-animation'
import echarts from 'echarts'

export default {
  name: 'JiraCustomerIssueChart',
  props: {
    msg: String
  },
  data() {
    return {

    }
  },
  created() {
    // created
  },
  mounted() {
    this.getContainerStyle()
  },
  watch: {
    // watch
  },
  methods: {
    initTile() {
      this.initTitleContent();
    },
    reRenderTile() {
      this.initTitleContent();
    },
    initTitleContent() {
      // 把配置和数据放这里
      this.getData();
    },
    getData() {
      let self = this;
      self.customerIssueList = [];
      this.$axios.get('/api/vuedashboard/getJiraIssueListWorker').then( (response) => {
        let res = response.data;
        if (res.success === true) {
            var priorityCount=[0,0,0,0];
            for(let item of res.data.issues){
                if(!item.fields.priority){
                    item.fields.priority=item.fields.customfield_10002;
                    item.fields.priority.name=item.fields.priority.value;
                }
                var priorityIndexTemp=parseInt(item.fields.priority.name.split('-')[0]);
                priorityCount[priorityIndexTemp-1]++;
            }

            var chartData=[];
            var chartColor=[];
            if(priorityCount[0]!==0){
              chartData.push({value:priorityCount[0], name:'1-Very High',priorityIndex:1});
              chartColor.push('#ff2828');
            }
            if(priorityCount[1]!==0){
              chartData.push({value:priorityCount[1], name:'2-High',priorityIndex:2});
              chartColor.push('#ffbb00');
            }
            if(priorityCount[2]!==0){
              chartData.push({value:priorityCount[2], name:'3-Medium',priorityIndex:3});
              chartColor.push('#7BBFA4');
            }
            if(priorityCount[3]!==0){
              chartData.push({value:priorityCount[3], name:'4-Low',priorityIndex:4});
              chartColor.push('#C0C0C0');
            }


            this.drawChart(chartData,chartColor);
        }
      });
    },
    drawChart(data,colors){
      let myChart = echarts.init(document.getElementById('pieChartContainer'))
      myChart.setOption({
        backgroundColor: 'rgba(255, 255, 255, 1)',
        series : [
            {
                type:'pie',
                radius : '50%',
                center: ['50%', '50%'],
                color:colors,
                data:data.sort(function (a, b) { return a.value - b.value; }),
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(0, 0, 0, 1)',
                            fontSize: 20,
                            fontFamily:'SANS-SERIF'
                        },
                        formatter: "{b} : {c} ({d}%)"
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(0, 0, 0, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 5,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
      });
    },
    getContainerStyle(){
      document.getElementById('pieChartContainer').setAttribute('style',`width:${this.$refs.tileInner.parentNode.parentNode.parentNode.offsetWidth}px;height:${this.$refs.tileInner.parentNode.parentNode.parentNode.offsetHeight}px`);
    },
  },
  computed: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
@import '../themeing/themings';
@import '../../node_modules/bulma';
$fa-font-path: '../../node_modules/font-awesome/fonts/';
@import '../../node_modules/font-awesome/scss/font-awesome';

.ticketItem{
    background-color:#fff;
    box-shadow:0px 0px 3px #bbb;
    flex-grow:1;
    margin:15px 15px;;
    padding:5px 10px 5px 15px;
    line-height:180%;
    border-radius:8px 3px 3px 8px
}
.itemTitle{
    font-size:23px;
    font-weight:bold;
}
.textEllipsis{
    text-overflow: ellipsis;
    white-space: nowrap; 
    overflow: hidden;
}

.p4{
    background-color:#E9E9EB;
    border-left:8px solid #909399;
}
.p3{
    background-color:#E1F3D8;
    border-left:8px solid #67C23A;
}
.p2{
    background-color:#FAECD8;
    border-left:8px solid #E6A23C;
}
.p1{
    background-color:#FDE2E2;
    border-left:8px solid #E56C6C;
}
</style>