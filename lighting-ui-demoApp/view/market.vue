
<template>
    <div>
        <scroller>
          <!-- scroller -->
          <div class="scroller">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>     
          </div>
            <text v-if="mgs===1">hello1</text>
            <text v-if="mgs===3">hello3</text>
            <text v-if="mgs===2">hello2</text>
            <text v-if="mgs===4">hello4</text>

        </scroller>
        <!-- tab -->
        <div class="tabBar">
            <text v-for="(item, index) in tabTitles" :key="index" :class="['tabBar-text', index==tabIndex?'f-red':'f-black']" @click="changeTab(item, index)">{{item.title}}</text>
        </div>

    </div>
</template>

<script>
import Light from "light";

export default {
  data() {
    return {
      tabIndex: 0,
      tabTitles: [
        { title: "沪深", path: "#/market/hushen" },
        { title: "股指", path: "#/market/guzhi" },
        { title: "港股", path: "#/market/hk" },
        { title: "全球", path: "#/market/global" },
        { title: "更多", path: "#/market/more" }
      ],
        mgs:null
    };
  },
  methods: {
    changeTab(item, index) {
      this.tabIndex = index;
      Light.navigate(item.path,{},{
        replace: true
      });
    }
  },
    mounted(){
      Light.on("error",function(data){
          console.log(data)
      })
    }
};
</script>

<style scoped src="../css/ui.css"></style>

<style scoped>
.scroller {
  background-color: #f7f7f7;
  margin-top: 86px;
}
.tabBar {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 86px;
  background-color: #ffffff;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
}
.tabBar-text {
  width: 140px;
  font-size: 34px;
  text-align: center;
}
</style>
