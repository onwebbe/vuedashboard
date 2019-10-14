<template>
  <div style='width:100%;height:100%;overflow:hidden' ref="tileInner">
    <transition> 
    <div class='ticketList' id="ticketList">
        <div v-for="(item, index) in customerIssueList" v-bind:key="index">
            <div :class='getItemStyle(item.priorityIndex)'>
                <div class='textEllipsis'>
                    <div><span style='font-weight:bold'>{{item.key}}</span><span style='font-size:15px;margin-left:10px'>Created {{timeFormat(item.createTime)}}</span></div>
                    <div class='textEllipsis itemTitle'>{{item.title}}</div>
                </div>
                <div class='itemBottom'>{{item.priorityLabel}}</div>
            </div>
        </div>
    </div>
    </transition>
  </div>
</template>

<script>
import animations from 'create-keyframe-animation'

export default {
  name: 'JiraCustomerIssueList',
  props: {
    msg: String
  },
  data() {
    return {
      customerIssueList: [],
    }
  },
  created() {
    // created
  },
  mounted() {

  },
  watch: {
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
            for(let item of res.data.issues){
                if(!item.fields.priority){
                    item.fields.priority=item.fields.customfield_10002;
                    item.fields.priority.name=item.fields.priority.value;
                }
                var priorityIndexTemp=parseInt(item.fields.priority.name.split('-')[0]);
                self.customerIssueList.push({
                    title: item.fields.summary,
                    priorityLabel: item.fields.priority.name,
                    priorityIcon: item.fields.priority.iconUrl,
                    key: item.key,
                    priorityIndex: priorityIndexTemp,
                    createTime: new Date(item.fields.created)
                });
            }
        }
        if(self.customerIssueList.length!==0){
            self.customerIssueList.sort((a,b)=>{
                let temp=a.priorityIndex-b.priorityIndex;
                if(temp!==0){
                    return temp;
                }else{
                    return b.createTime-a.createTime;
                }
            })
        }
        this.$nextTick( () => {
            this.initAnimation(self.customerIssueList.length,this.$refs.tileInner.offsetHeight);
        });
      });
    },
    initAnimation(listLength,heightDef){ 
        let animation={
            0:{
                transform: `translateY(0)`
            },
            30:{
                transform: `translateY(-${listLength*104-heightDef+10}px)`
            },
            50:{
                transform: `translateY(-${listLength*104-heightDef+10}px)`
            },
            80:{
                transform: `translateY(0)`
            }
        }
        animations.registerAnimation({
            name: 'move',
            animation,
            presets: {
                duration: (listLength*104-heightDef+10)*50,
                easing: 'linear',
                iterations:'infinite'
            }
        })
        animations.runAnimation(document.getElementById("ticketList"), 'move');
    },
    timeFormat(date){
        var dateTimeStamp=date.getTime();
        var result='';
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if(diffValue < 0){
            return;
        }
        var minC = diffValue/minute;
        var hourC = diffValue/hour;
        var dayC = diffValue/day;
        var weekC = diffValue/week;
        var monthC = diffValue/month;
        if(monthC >= 1 && monthC <= 3){
            result = parseInt(monthC) + ` Month${parseInt(monthC)===1?"":"s"} Ago`
        }else if(weekC >= 1 && weekC <= 3){
            result = parseInt(weekC) + ` Week${parseInt(weekC)===1?"":"s"} Ago`
        }else if(dayC >= 1 && dayC <= 6){
            result = parseInt(dayC) + ` Day${parseInt(dayC)===1?"":"s"} Ago`
        }else if(hourC >= 1 && hourC <= 23){
            result = parseInt(hourC) + ` Hour${parseInt(hourC)===1?"":"s"} Ago`
        }else if(minC >= 1 && minC <= 59){
            result = parseInt(minC) + ` Minute${parseInt(minC)===1?"":"s"} Ago`
        }else if(diffValue >= 0 && diffValue <= minute){
            result = "Just Now"
        }else {
            var datetime = new Date();
            datetime.setTime(dateTimeStamp);
            var Nyear = datetime.getFullYear();
            var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
            var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
            var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            result = Nyear + "-" + Nmonth + "-" + Ndate
        }
        return result;
    },
    getItemStyle(priorityIndex){
        return `p${priorityIndex} ticketItem`;
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

.ticketList{
    position: relative;
}
.ticketItem{
    background-color:#fff;
    box-shadow:0px 0px 3px #cbcbcb;
    flex-grow:1;
    margin:10px 15px;;
    padding:5px 10px 5px 15px;
    line-height:180%;
    border-radius:8px 5px 5px 8px
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

.itemBottom{
    color: #434343;
    font-size: 15px;
}

.p4{
    background-color:#E9E9EB;
    border-left:8px solid #909399;
    color:#797d84;
}
.p3{
    background-color:#E1F3D8;
    border-left:8px solid #58bc25;
    color:#419317;
}
.p2{
    background-color:#FAECD8;
    border-left:8px solid #E6A23C;
    color:#e08f1d;
}
.p1{
    background-color:#FDE2E2;
    border-left:8px solid #E56C6C;
    color:#d63535;
}

.p4::before {
    content: "4";
    position: absolute;
    right: 20px;
    font-size: 120px;
    font-weight: bold;
    line-height: 120px;
    vertical-align: top;
    font-style: oblique;
    opacity: 0.2;
    overflow-y: hidden;
    height: 90px;
    font-family: SANS-SERIF;
}
.p3::before {
    content: "3";
    position: absolute;
    right: 20px;
    font-size: 120px;
    font-weight: bold;
    line-height: 120px;
    vertical-align: top;
    font-style: oblique;
    opacity: 0.2;
    overflow-y: hidden;
    height: 90px;
    font-family: SANS-SERIF;
}
.p2::before {
    content: "2";
    position: absolute;
    right: 20px;
    font-size: 120px;
    font-weight: bold;
    line-height: 120px;
    vertical-align: top;
    font-style: oblique;
    opacity: 0.2;
    overflow-y: hidden;
    height: 90px;
    font-family: SANS-SERIF;
}
.p1::before {
    content: "1";
    position: absolute;
    right: 20px;
    font-size: 120px;
    font-weight: bold;
    line-height: 120px;
    vertical-align: top;
    font-style: oblique;
    opacity: 0.2;
    overflow-y: hidden;
    height: 90px;
    font-family: SANS-SERIF;
}

</style>