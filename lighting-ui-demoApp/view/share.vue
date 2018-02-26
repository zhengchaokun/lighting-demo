
<template>
    <div>
        <!-- list -->
        <scroller class="container">
            <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <loading-indicator class="indicator"></loading-indicator>
            </refresh>
            <div v-for="(item, index) in orderedData" :key="index" class="list">
                <div class="flex-column justify-center align-start flex-2">
                    <text class="fs32 f-black">{{item.title}}</text>
                    <text class="fs24 f-dark mt10">{{item.code}}</text>
                </div>
                <div class="flex-1 align-end">
                    <text class="fs30 f-black">{{item.total.toFixed(3)}}</text>
                </div>
                <div class="flex-1 align-end">
                    <text :class="['fs30',item.change>0?'f-red':'f-green']">{{item.change.toFixed(3)}}</text>
                </div>
                <div class="flex-1 align-end">
                    <text :class="['fs30',item.percent>0?'f-red':'f-green']">{{item.percent.toFixed(2)}}%</text>
                </div>
            </div>
        </scroller>

        <!-- header -->
        <div class="flex-row align-center head">
            <div class="flex-2">
                <div class="head-mark">
                    <div class="flex-row border-right pr20 pl20 pt10 pb10"><text class="fs24 f-white">编辑</text></div>
                    <div class="flex-row pl20 pr20 pt10 pb10"><text class="fs24 f-white">智能</text></div>
                </div>
            </div>
            <div class="flex-4 flex-row"> 
                <div @click="toggleTimeOrder" class="flex-1 flex-row align-center justify-center">
                    <text class="fs26 f-dark mr10">最新</text>
                    <image src="images/header_arrow_none.png" class="order-dot-icon" v-if="timeOrder==0"></image>
                    <image src="images/header_arrow_up.png" class="order-arrow-icon" v-if="timeOrder==1"></image>
                    <image src="images/header_arrow_down.png" class="order-arrow-icon" v-if="timeOrder==-1"></image>
                </div>
                <div class="flex-1 flex-row align-center justify-center">
                    <text class="fs26 f-dark">涨跌</text>
                </div>
                <div @click="toggleChangeOrder" class="flex-1 flex-row align-center justify-center">
                    <text class="fs26 f-dark mr10">涨幅</text>
                    <image src="images/header_arrow_none.png" class="order-dot-icon" v-if="changeOrder==0"></image>
                    <image src="images/header_arrow_up.png" class="order-arrow-icon" v-if="changeOrder==1"></image>
                    <image src="images/header_arrow_down.png" class="order-arrow-icon" v-if="changeOrder==-1"></image>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      timeOrder: 0,
      changeOrder: 0,
      refreshing: false,
      zixuanData: [
        {
          title: "金斯瑞生物",
          code: "H01528",
          total: 27.9,
          change: 2.95,
          percent: 12.8
        },
        {
          title: "中国重汽",
          code: "H03808",
          total: 11.26,
          change: 0.706,
          percent: 7.24
        },
        {
          title: "金蝶国际",
          code: "H002628",
          total: 0.36,
          change: 0.35,
          percent: 7.05
        },
        {
          title: "乐视网",
          code: "300104",
          total: 4.82,
          change: -0.54,
          percent: -10.07
        },
        {
          title: "巨人网络",
          code: "002558",
          total: 11.26,
          change: 0.706,
          percent: 7.24
        },
        {
          title: "大西洋",
          code: "600558",
          total: 5.02,
          change: 0.01,
          percent: 0.2
        },
        {
          title: "贝达药业",
          code: "300558",
          total: 53.4,
          change: -0.43,
          percent: -0.8
        },
        {
          title: "恒生电子",
          code: "600570",
          total: 43.43,
          change: -1.2,
          percent: -2.69
        },
        {
          title: "爽口源",
          code: "832558",
          total: 15.1,
          change: 0.0,
          percent: 0.0
        },
        {
          title: "兴发集团",
          code: "600141",
          total: 11.53,
          change: -1.19,
          percent: -7.94
        },
        {
          title: "莱茵体育",
          code: "000558",
          total: 4.4,
          change: 0.0,
          percent: 0.0
        },
        {
          title: "航天电子",
          code: "600879",
          total: 6.66,
          change: -0.44,
          percent: -6.2
        },
        {
          title: "阳光四季",
          code: "831558",
          total: 3.01,
          change: 0.0,
          percent: 0.0
        }
      ],
      orderedData: []
    };
  },
  watch: {
    timeOrder: function(newVal) {
      if (newVal == 0) {
        this.orderedData = this.zixuanData.slice();
      }
      if (newVal == 1) {
        this.orderedData = this.zixuanData.slice();
      }
      if (newVal == -1) {
        this.orderedData = this.zixuanData.slice().reverse();
      }
    },
    changeOrder: function(newVal) {
      if (newVal == 0) {
        this.orderedData = this.zixuanData.slice();
      }
      if (newVal == 1) {
        this.orderedData = this.zixuanData.slice().sort(function(a, b) {
          return a.percent - b.percent;
        });
      }
      if (newVal == -1) {
        this.orderedData = this.zixuanData.slice().sort(function(a, b) {
          return b.percent - a.percent;
        });
      }
    }
  },
  methods: {
    toggleTimeOrder() {
      this.changeOrder = 0;
      if (this.timeOrder == 0) {
        this.timeOrder = 1;
        return;
      }
      if (this.timeOrder == 1) {
        this.timeOrder = -1;
        return;
      }
      if (this.timeOrder == -1) {
        this.timeOrder = 0;
        return;
      }
    },
    toggleChangeOrder() {
      this.timeOrder = 0;
      if (this.changeOrder == 0) {
        this.changeOrder = 1;
        return;
      }
      if (this.changeOrder == 1) {
        this.changeOrder = -1;
        return;
      }
      if (this.changeOrder == -1) {
        this.changeOrder = 0;
        return;
      }
    },
    onrefresh (event) {
        this.refreshing = true
        setTimeout(() => {
            this.refreshing = false
        }, 2000)
    }
  },
  mounted() {
    this.orderedData = this.zixuanData;
  }
};
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
.head {
  border-bottom-width: 2px;
  border-bottom-color: #e9e9e9;
  padding-top: 10px;
  padding-bottom: 10px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 70px;
  background-color: #ffffff;
}
.head-mark {
  width: 190px;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fe6a6b;
  border-bottom-right-radius: 40px;
  border-top-right-radius: 40px;
}
.border-right {
  border-right-width: 1px;
  border-right-color: #f9f9f9;
}
.bottom-line {
  border-bottom-width: 2px;
  border-bottom-color: #e9e9e9;
}
.order-arrow-icon {
  width: 10px;
  height: 18px;
}
.order-dot-icon {
  width: 4px;
  height: 18px;
}
.container {
  margin-top: 72px;
}
.list {
  height: 140px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #ffffff;
}
.refresh {
  width: 750;
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
}
.indicator {
  margin-top: 16px;
  margin-bottom: 16px;
  height: 80px;
  width: 80px;
  color: #6da6e7;
}
</style>
