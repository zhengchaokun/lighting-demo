
<template>
    <div>
        <scroller>
          <!-- scroller -->
          <div class="scroller">
              <router-view class="page"></router-view>
          </div>

        </scroller>
        <!-- tab -->
        <div class="tabBar">
            <text v-for="(item, index) in tabTitles" :key="index" :class="['tabBar-text', index==tabIndex?'f-red':'f-black']" @click="changeTab(item, index)">{{item.title}}</text>
        </div>
    </div>
</template>

<script>
import LcTabPage from "lighting-ui/packages/lc-tab-page";
import LcCell from "lighting-ui/packages/lc-cell";
import LcProgress from "lighting-ui/packages/lc-progress";
import Light from "light";

export default {
  components: { LcTabPage, LcCell, LcProgress },
  data() {
    return {
      tabIndex: 0,
      tabTitles: [
        { title: "沪深", path: "#/market/hushen" },
        { title: "股指", path: "#/market/guzhi" },
        { title: "港股", path: "#/market/hk" },
        { title: "全球", path: "#/market/global" },
        { title: "更多", path: "#/market/more" }
      ]
    };
  },
  methods: {
    changeTab(item, index) {
      this.tabIndex = index;
      Light.navigate(item.path);
    }
  }
};
</script>

<style scoped src="../css/ui.css"></style>

<style scoped>
.scroller {
  background-color: #f8f8f8;
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
.f-red {
  color: #f35151;
}
.f-black {
  color: #3a3a3a;
}
</style>
