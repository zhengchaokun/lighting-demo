
<template>
    <div>
        <scroller>
        <!-- scroller -->
        <div style="background-color:#f8f8f8;margin-top:80px;">
            <!-- 沪深 -->
            <div class="page" v-if="tabIndex==0">
                <div class="flex-row">
                    <div class="row-item pt10" @click="changePart(index)" v-for="(item, index) in chartData" :key="index">
                        <div class="part-row">
                            <text class="part-total f-red">{{item['total']}}</text>
                        </div>
                        <div class="part-row mt10">
                            <text class="part-title">{{item['title']}}</text>
                            <text class="part-title f-red">{{item['change']}}</text>
                        </div>
                        <div :class="['part-line', index==chartIndex && 'line-active']"></div>
                    </div>
                </div>
                <div class="chart">

                </div>

                <div class="cell">
                    <text class="part-title f-red mr10 ml20">上涨{{raise_count}}只</text>
                    <lc-progress :value="barPercentage"
                        bar-color='#f35151'
                        :bar-height="6"
                        :bar-width="320">
                    </lc-progress>
                    <text class="part-title f-green ml10">{{fall_count}}只下跌</text>
                    <text class="cell-link mr20"> > </text>
                </div>

                <div class="grid mt20">
                    <div class="grid-item" v-for="(item, index) in blockList" :key="index">
                        <text class="grid-title f-black">{{item.title}}</text>
                        <text class="grid-title f-red mt10">{{item.change}}</text>
                        <text class="grid-desc mt10">{{item.total}}</text>
                    </div>
                    <div class="grid-item">
                        <text class="grid-desc fs32">热门板块</text>
                        <text class="grid-desc fs32 mt30">更多></text>
                    </div>
                </div>

                <div class="grid2 mt20">
                    <div class="grid2-item" v-for="(item, index) in topicList" :key="index">
                        <text class="grid2-title">{{item}}</text>
                    </div>
                </div>

                <div class="mt20" style="background-color:#ffffff;">
                    <div class="mt20" style="flex-direction: row;justify-content: space-between;">
                        <div class="bookmark">
                            <text class="bookmark-text">个股异动</text>
                        </div>
                        <text class="bookmark-desc">实时智能计算个股异动情况 ></text>
                    </div>

                    <div style="padding-top:60px;justify-content: center;background-color:#ffffff;align-items:center">
                        <div class="btn-wrap mb30">
                            <div v-for="(btn, index) in geguTitles" :key="index" :style="btnStyle(index)" class="btn-tab" @click="changeBtn(index)" >
                                <text class="btn-text" :style="btnTextStyle(index)">{{btn.title}}</text>
                            </div>
                        </div>
                        <div v-for="(item, index) in geguData" :key="index" class="share-list">
                            <div class="share-title flex-3">
                                <text class="fs32 f-black">{{item.title}}</text>
                                <text class="fs24 f-dark mt10">{{item.code}}</text>
                            </div>
                            <div class="flex-2">
                                <text class="fs32 f-black">{{item.total}}</text>
                            </div>
                            <div class="flex-2">
                                <text :class="['fs32', item.change >= 0 ? 'f-red':'f-green']">{{item.change}}%</text>
                            </div>
                            <div class="flex-3" style="align-items: flex-end;">
                                <text class="fs32 f-black">{{item.desc}}</text>
                            </div>
                        </div>
                        <text class="fs28 f-dark mt20 mb20">查看更多 ></text>                        
                    </div>
                </div>

                <div class="mt20" style="background-color:#ffffff;">
                    <div class="mt20" style="flex-direction: row;justify-content: space-between;">
                        <text class="fs32 ml20">个股热度</text>
                        <text class="bookmark-desc">热度值：0~100 ></text>
                    </div>
                    <div class="mt30" style="flex-direction:row;justify-content: space-around;">
                        <div style="align-items: center">
                            <text class="fs28 f-dark">热值最高</text>
                            <text class="fs28 f-dark mt20">热值度：100</text>
                            <div class="gegu-bar mt40 mb40">
                            </div>
                            <div class="flex-row align-items-center">
                                <text class="fs28 f-black">蓝晓科技</text>
                                <text class="fs28 f-red">+10.00%</text>
                            </div>
                        </div>

                        <div style="align-items: center">
                            <text class="fs28 f-dark">上升最快</text>
                            <text class="fs28 f-dark mt20">热值度：39 -> 65</text>
                            <div class="gegu-bar mt40 mb40">
                            </div>
                            <div class="flex-row align-items-center">
                                <text class="fs28 f-black">中国交建</text>
                                <text class="fs28 f-red">+6.32%</text>
                            </div>
                        </div>

                        <div style="align-items: center">
                            <text class="fs28 f-dark">下降最快</text>
                            <text class="fs28 f-dark mt20">热值度：75 -> 47</text>
                            <div class="gegu-bar mt40 mb40">
                            </div>
                            <div class="flex-row align-items-center">
                                <text class="fs28 f-black">顺威股份</text>
                                <text class="fs28 f-red">-9.97%</text>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt20" style="background-color:#ffffff;">
                    <div class="bookmark mt20">
                        <text class="bookmark-text">智能家族</text>
                    </div>
                    <scroller class="flex-row ml20" scroll-direction="horizontal">
                        <div class="card">
                            <text class="fs28 f-balck">打新神器</text>
                            <text class="fs28 f-balck mt20 mb20">今日可申购新股</text>
                            <div class="flex-row align-items-center">
                                <text class="f-red fs28">0</text>
                                <text class="fs28">只</text>
                            </div>
                        </div>
                        <div class="card">
                            <text class="fs28 f-balck">智能盯盘</text>
                            <text class="fs28 f-balck mt20 mb20">已有52.14万人设置</text>
                            <div class="flex-row align-items-center">
                                <text class="fs28">今日</text>
                                <text class="f-red fs28">+427人</text>
                            </div>
                        </div>
                        <div class="card">
                            <text class="fs28 f-balck">成本神器</text>
                            <text class="fs28 f-balck mt20 mb20">获利占比超过50%</text>
                            <div class="flex-row align-items-center">
                                <text class="f-red fs28">925只</text>
                                <text class="fs28">股票</text>
                            </div>
                        </div>
                        <div class="card">
                            <text class="fs28 f-balck">相似K线</text>
                            <text class="fs28 f-balck mt20 mb20">蓝晓科技 VS 中闽能源</text>
                            <div class="flex-row align-items-center">
                                <text class="fs28">相似度</text>
                                <text class="fs28 f-red">96.8%</text>
                            </div>
                        </div>
                    </scroller>   
                </div>

                <div class="mt20 pt20 pl20" style="background-color:#ffffff;">
                    <text class="fs32">核心 • 大数据</text>
                    <div class="flex-row mt40 justify-space-between">
                        <div class="flex-row align-items-center">
                            <text class="fs28">新开 17.84万户</text>
                            <text class="fs24 f-dark">(截止1月5号)</text>                            
                        </div>
                        <div class="flex-row mr20 align-items-center">
                            <text class="fs24 f-dark ml40">较上周减少</text>
                            <text class="fs24 f-green">20%</text>
                            <text class="fs24">></text>
                        </div>
                    </div>
                    <div style="height:300px">

                    </div>
                </div>
                <div class="line"></div>
                <div class="flex-row justify-space-around pt30" style="background-color:#ffffff;">
                    <div class="align-items-center">
                        <text class="fs30">市场平均市盈率 22.29</text>
                        <div class="flex-row mt20">
                            <text class="fs24 f-dark">近90日最低 21.23</text>
                            <text class="fs24 f-dark">最高 23.49</text>
                        </div>
                        <div style="height:300px;"></div>
                    </div>
                    <div class="align-items-center">
                        <text class="fs30">市场平均市净率 2.22</text>
                        <div class="flex-row mt20">
                            <text class="fs24 f-dark">近90日最低 2.11</text>
                            <text class="fs24 f-dark">最高 2.29</text>
                        </div>
                        <div style="height:300px;"></div>
                    </div>
                </div>

                <div class="mt20" style="background-color:#ffffff;">
                    <div class="mt20" style="flex-direction: row;justify-content: space-between;">
                        <div class="bookmark">
                            <text class="bookmark-text">跟牛人</text>
                        </div>
                        <text class="bookmark-desc">更多组合 ></text>
                    </div>

                    <div class="flex-row align-items-center pt20 pb20 mt20" style="border-top-width:1px;border-color:#d9d9d9;height:170px;">
                        <div class="align-items-center flex-2" style="border-right-width:1px;border-color:#d9d9d9;">
                            <text class="fs32 f-red">337.63%</text>
                            <text class="fs24 f-dark mt20">累计总收益</text>
                        </div>
                        <div class="flex-3 pl30">
                            <div class="flex-row">
                                <text class="fs32">规范规范vgfd</text>
                                <div></div>
                            </div>
                            <div class="flex-row mt20">
                                <text class="fs24 f-dark">最大回撤 +38.16%</text>
                                <text class="fs24 f-dark">胜率 +75.00%</text>
                            </div>
                        </div>
                    </div>
                    <div class="flex-row align-items-center pt20 pb20" style="border-top-width:1px;border-color:#d9d9d9;height:170px;">
                        <div class="align-items-center flex-2" style="border-right-width:1px;border-color:#d9d9d9;">
                            <text class="fs32 f-red">3.00%</text>
                            <text class="fs24 f-dark mt20">累计总收益</text>
                        </div>
                        <div class="flex-3 pl30">
                            <div class="flex-row">
                                <text class="fs32">空头司令</text>
                                <div></div>
                            </div>
                            <div class="flex-row mt20">
                                <text class="fs24 f-dark">最大回撤 +62.17%</text>
                                <text class="fs24 f-dark">胜率 +50.00%</text>
                            </div>
                        </div>
                    </div>
                    <div class="flex-row align-items-center pt20 pb20" style="border-top-width:1px;border-color:#d9d9d9;height:170px;">
                        <div class="align-items-center flex-2" style="border-right-width:1px;border-color:#d9d9d9;">
                            <text class="fs32 f-red">54.19%</text>
                            <text class="fs24 f-dark mt20">累计总收益</text>
                        </div>
                        <div class="flex-3 pl30">
                            <div class="flex-row">
                                <text class="fs32">编程浪子R15</text>
                                <div></div>
                            </div>
                            <div class="flex-row mt20">
                                <text class="fs24 f-dark">最大回撤 +5.55%</text>
                                <text class="fs24 f-dark">胜率 +100.00%</text>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt20 flex-row" style="background-color:#ffffff;height:140px;margin-bottom:80px;">
                    <image></image>
                    <text>全新行情操作指南</text>
                </div>

            </div>
            <!-- 股指 -->
            <div class="page" v-if="tabIndex==1">
                <text>股指</text>
            </div>
            <!-- 港股 -->
            <div class="page" v-if="tabIndex==2">
                <text>港股</text>
            </div>
            <!-- 全球 -->
            <div class="page" v-if="tabIndex==3">
                <text>全球</text>
            </div>
            <!-- 更多 -->
            <div class="page" v-if="tabIndex==4">
                <text>更多</text>
            </div>
        </div>

        </scroller>
        <!-- tab -->
        <div class="tabBar" style="position:fixed;top:0px;left:0px;right:0px;">
            <text v-for="(title, index) in tabTitles" :key="index" :class="['tabBar-text', index==tabIndex && 'f-red']" @click="changeTab(index)">{{title}}</text>
        </div>
    </div>
</template>

<script>
import Config from "config/market.js";
import LcTabPage from "lighting-ui/packages/lc-tab-page";
import LcCell from "lighting-ui/packages/lc-cell";
import LcProgress from "lighting-ui/packages/lc-progress";

export default {
  components: { LcTabPage, LcCell, LcProgress },
  data() {
    return {
      /* tab */
      tabIndex: 0,
      tabTitles: ["沪深", "股指", "港股", "全球", "更多"],
      /* chart */
      chartIndex: 0,
      chartData: [
        {
          title: "上证指数",
          total: "3420.80",
          change: "+0.30%"
        },
        {
          title: "深证指数",
          total: "11370.42",
          change: "+0.56%"
        },
        {
          title: "创业板指",
          total: "1734.39",
          change: "+0.10%"
        }
      ],
      /* bar */
      raise_count: 1871,
      fall_count: 1334,
      /* block */
      blockList: [
        {
          title: "房地产",
          change: "3.99%",
          total: "449.98亿"
        },
        {
          title: "商务服务",
          change: "2.41%",
          total: "49.03亿"
        },
        {
          title: "供水供气",
          change: "2.35%",
          total: "38.32亿"
        },
        {
          title: "住宿餐饮",
          change: "2.33%",
          total: "7.86亿"
        },
        {
          title: "仓储物流",
          change: "1.94%",
          total: "25.98亿"
        }
      ],
      /* topic */
      topicList: [
        "涨跌幅榜",
        "换手率榜",
        "资金流向榜",
        "量比榜",
        "次新股榜",
        "创业板涨幅"
      ],
      /* 个股 */
      geguTitles: [
        { title: "创新高" },
        { title: "创新低" },
        { title: "上破均线" }
      ],
      btnIndex: 0,
      geguHigh: [
        {
          title: "云南城投",
          code: "600239",
          total: "5.74",
          change: "9.96",
          desc: "200日新高"
        },
        {
          title: "上海钢联",
          code: "300226",
          total: "44.6",
          change: "8.83",
          desc: "200日新高"
        },
        {
          title: "乐普医疗",
          code: "300003",
          total: "26.04",
          change: "6.68",
          desc: "200日新高"
        },
        {
          title: "南京银行",
          code: "601009",
          total: "8.99",
          change: "5.52",
          desc: "200日新高"
        },
        {
          title: "海峡股份",
          code: "002320",
          total: "24.30",
          change: "5.19",
          desc: "200日新高"
        }
      ],
      geguLow: [
        {
          title: "神雾环保",
          code: "600239",
          total: "21.74",
          change: "-10.02",
          desc: "200日新低"
        },
        {
          title: "东北电气",
          code: "300226",
          total: "4.27",
          change: "-9.73",
          desc: "200日新低"
        },
        {
          title: "神马B",
          code: "300003",
          total: "0.83",
          change: "-7.65",
          desc: "200日新低"
        },
        {
          title: "海源机械",
          code: "601009",
          total: "13.78",
          change: "-6.89",
          desc: "200日新低"
        },
        {
          title: "金鹰股份",
          code: "002320",
          total: "6.85",
          change: "-6.80",
          desc: "200日新低"
        }
      ],
      geguAvg: [
        {
          title: "中国建筑",
          code: "600239",
          total: "9.73",
          change: "2.21",
          desc: "破200日均线"
        },
        {
          title: "鹿港文化",
          code: "300226",
          total: "6.47",
          change: "0.94",
          desc: "破200日均线"
        },
        {
          title: "海南橡胶",
          code: "300003",
          total: "6.08",
          change: "0.50",
          desc: "破200日均线"
        },
        {
          title: "马钢股份",
          code: "601009",
          total: "4.13",
          change: "0.73",
          desc: "破200日均线"
        },
        {
          title: "山煤国际",
          code: "002320",
          total: "5.01",
          change: "2.24",
          desc: "破200日均线"
        }
      ]
    };
  },
  computed: {
    barPercentage() {
      return this.raise_count / (this.raise_count + this.fall_count) * 100;
    },
    geguData() {
      if (this.btnIndex == 0) {
        return this.geguHigh;
      }
      if (this.btnIndex == 1) {
        return this.geguLow;
      }
      if (this.btnIndex == 2) {
        return this.geguAvg;
      }
    }
  },
  methods: {
    changeTab(index) {
      this.tabIndex = index;
    },
    changePart(index) {
      this.chartIndex = index;
    },
    changeBtn(index) {
      this.btnIndex = index;
    },
    btnStyle(index) {
      let style;
      if (index == 0) {
        style = {
          "border-style": "solid",
          "border-left-width": "1px",
          "border-top-width": "1px",
          "border-bottom-width": "1px",
          "border-right-width": "0px",
          "border-top-left-radius": "5px",
          "border-bottom-left-radius": "5px",
          "border-color": "#9a9a9a"
        };
        if (this.btnIndex == 0) {
          style["border-color"] = "#fe6a6b";
        }
      }
      if (index == 1) {
        style = {
          "border-style": "solid",
          "border-width": "1px",
          "border-color": "#9a9a9a"
        };
        if (this.btnIndex == 0) {
          style["border-left-color"] = "#fe6a6b";
        }
        if (this.btnIndex == 1) {
          style["border-color"] = "#fe6a6b";
        }
        if (this.btnIndex == 2) {
          style["border-right-color"] = "#fe6a6b";
        }
      }
      if (index == 2) {
        style = {
          "border-style": "solid",
          "border-left-width": "0px",
          "border-right-width": "1px",
          "border-top-width": "1px",
          "border-bottom-width": "1px",
          "border-top-right-radius": "5px",
          "border-bottom-right-radius": "5px",
          "border-color": "#9a9a9a"
        };
        if (this.btnIndex == 2) {
          style["border-color"] = "#fe6a6b";
        }
      }
      return style;
    },
    btnTextStyle(index) {
      if (index == this.btnIndex) {
        return {
          color: "#fe6a6b",
          "font-size": "32px"
        };
      } else {
        return {
          color: "#9a9a9a",
          "font-size": "30px"
        };
      }
    }
  }
};
</script>

<style scoped src="../css/ui.css"></style>

<style scoped>
.tabBar {
  height: 80px;
  background-color: #ffffff;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
}
.tabBar-text {
  width: 130px;
  color: #3a3a3a;
  font-size: 34px;
}
.chart {
  height: 280px;
  border-top-width: 1px;
  border-color: #d9d9d9;
}
.part-total {
  font-weight: 400;
  font-size: 36px;
}
.part-title {
  font-size: 24px;
  line-height: 24px;
}
.part-line {
  height: 2px;
  background-color: #f8f8f8;
  margin-top: 8px;
}
.line-active {
  background-color: #f35151;
}
.part-row {
  flex-direction: row;
  justify-content: center;
}
.cell {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 84px;
  background-color: #ffffff;
}
.cell-link {
  font-size: 34px;
  color: #d9d9d9;
}
.f-green {
  color: #5d9f3b;
}
.f-red {
  color: #f35151;
}
.f-black {
  color: #3a3a3a;
}
.f-dark {
  color: #9a9a9a;
}
.grid {
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #ffffff;
  border-style: solid;
  border-color: #d9d9d9;
}
.grid-item {
  width: 250px;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-color: #d9d9d9;
  border-right-width: 1px;
  border-bottom-width: 1px;
}
.grid-title {
  font-size: 32px;
}
.grid-desc {
  font-size: 22px;
  color: #9a9a9a;
}
.grid2 {
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #ffffff;
  border-style: solid;
  border-color: #d9d9d9;
}
.grid2-item {
  width: 250px;
  height: 96px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-color: #d9d9d9;
}
.grid2-title {
  font-size: 28px;
  color: #6da6e7;
}
.bookmark {
  width: 180px;
  background-color: #fe6a6b;
  border-bottom-right-radius: 40px;
  border-top-right-radius: 40px;
}
.bookmark-text {
  line-height: 56px;
  font-size: 32px;
  color: #ffffff;
  margin-left: 20px;
}
.bookmark-desc {
  font-size: 24px;
  color: #9a9a9a;
  line-height: 48px;
  margin-right: 40px;
}
.btn-wrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 500px;
  height: 64px;
}
.btn-tab {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  border-color: #d9d9d9;
  color: #d9d9d9;
}
.btn-text {
  font-size: 30px;
}
.share-list {
  width: 710px;
  height: 140px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
  margin-left: 20px;
  margin-right: 20px;
}
.share-title {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.gegu-bar{
    width: 40px;
    height: 120px;
    background-color: #e27318;
}
.card{
    width: 320px;
    height: 200px;
    border-width: 1px;
    border-color: #c9a1a1;
    border-radius: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-right: 20px;
    align-items: center;
    padding-top: 26px;
}
.line{
    height: 1px;
    background-color: #d9d9d9;
}
</style>
