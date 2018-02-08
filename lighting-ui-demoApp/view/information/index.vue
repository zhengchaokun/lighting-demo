
<template>
    <div>
        <scroller>
          <!-- scroller -->
          <div class="scroller">
              <router-view></router-view>
          </div>

        </scroller>
        <!-- tab -->
        <div class="tabBar">
            <text v-for="(item, index) in tabTitles" :key="index" :class="['tabBar-text', index==tabIndex?'f-red':'f-black']" @click="changeTab(item, index)">{{item.title}}</text>
            <image class="tabBar-img" src="images/info-more.png"></image>
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
        { title: "头条", path: "#/information/headline" },
        { title: "自选", path: "#/information/optional" },
        { title: "新股", path: "#/information/newstock" },
        { title: "研究", path: "" },
        { title: "专题", path: "" }
      ]
    };
  },
  methods: {
    changeTab(item, index) {
      this.tabIndex = index;
      Light.navigate(item.path,{},{
        replace: true
      });
    }
  }
};
</script>

<style scoped src="../../css/ui.css"></style>

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
  width: 135px;
  font-size: 34px;
  text-align: center;
}
.tabBar-img{
    position: absolute;
    right: 30px;
    top: 28px;
    width: 32px;
    height: 32px;
}
</style>
