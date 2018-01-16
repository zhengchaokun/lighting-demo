
<template>
    <div style="background-color:#f0eff4; height:1500px;">
        <scroller>
            <lc-lightbox autoPlay="true" ref="lc-lightbox"
                height="440"
                interval="5000"
                showIndicator="true"
                :image-list="imageList"
                :indicatorColor="indicatorColor"
                @lcImgClick="lcImgClick">
            </lc-lightbox>

            <div class="pos-r">
                <scroller class="flex-row" scroll-direction="horizontal" style="height:200px;">                 
                    <div class="flex-row item-box">                   
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="images/icon-1.png" class="item-pic"></image>
                            </div>
                            <text class="item-text">理财持仓</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="images/icon-2.png" class="item-pic"></image>
                            </div>
                            <text class="item-text">我的资产</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="images/icon-3.png" class="item-pic"></image>
                                <text class="item-dot">8</text>
                            </div>
                            <text class="item-text">涨乐资讯</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="images/icon-4.png" class="item-pic"></image>
                            </div>
                            <text class="item-text">股票开户</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="images/icon-5.png" class="item-pic"></image>
                            </div>
                            <text class="item-text">签到</text>
                        </div>
                        <div class="flex-clounm item-cont">
                            <div class="pos-r">
                                <image src="images/icon-6.png" class="item-pic"></image>
                            </div>
                            <text class="item-text">成本神器</text>
                        </div>
                    </div>                                                                                                
                </scroller>
                <text class="right-corner"> &gt; </text> 
            </div>
            
            <scroller class="flex-row mt20" scroll-direction="horizontal" style="height:100px;">
                <div class="topic-wrap flex-row" v-for="(topic,index) in topics" :key="index">
                    <a class="topic-a" href="">
                        <text class="topic-text">{{topic.val}}</text>
                    </a>                   
                </div>
            </scroller>            
            <div class="line"></div>

            <lc-info-list 
                type="imgleft"
                :infoList="infoList"
                @infoClick="infoClick"
            ></lc-info-list>
        </scroller>

    </div>
</template>
<script>
import App from "light";
import LcLightbox from "lighting-ui/packages/lc-lightbox";
import LcInfoList from "lighting-ui/packages/lc-info-list";
export default {
  components: { LcLightbox,LcInfoList },
  data() {
    return {
      imageList: [
        { src: "images/banner-1.jpg" },
        { src: "images/banner-2.jpg" }
      ],
      indicatorColor: {
        "item-color": "#5976ec",
        "item-selected-color": "#fff",
        "item-size": "16px"
      },
      topics:[
          { val:'#市场两极分化#', src:'#'},
          { val:'#软银手机业务上市#', src:'#'},
          { val:'#1月客座率提升#', src:'#'},
          { val:'#反弹力度不强#', src:'#'}
      ],
      infoList:[
          {
              textTitle:'金点子提醒：京东开始全面升级到电子发票，让电子发票引领未来金点子提醒：京东开始全面升级到电子发票，让电子发票引领未来',
              textInfo:'今年以来，虽然A股上涨了6.1（截止发稿前），但是境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              src:'https://img.alicdn.com/tfs/TB1jkA5g9_I8KJjy0FoXXaFnVXa-320-320.png'
          },
          {
              textTitle:'金点子提醒：京东开始全面升级到电子发票',
              textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              src:'https://img.alicdn.com/tfs/TB1jkA5g9_I8KJjy0FoXXaFnVXa-320-320.png'
          }
      ]
    };
  },
  methods: {
    jump(view) {
      App.navigate(view);
    },
    lcImgClick(e) {
      console.log("clicked" + e.index);
    },
    infoClick(e) {
      console.log("clicked" + e.index);
    }
  }
};
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
.item-wrap {
  width: 750px;
  height: 410px;
}
.item-box {
  height: 200px;
  background-color: #fff;
  justify-content: space-around;
  align-items: center;
}
.right-corner{
    position: absolute;
    right: 5px;
    top: 60px;
    font-size: 36px;
    color: #dbdbdb;
}
.item-cont {
  align-items: center;
  width: 190px;
}
.item-pic {
  width: 80px;
  height: 80px;
  border-radius: 30px;
}
.item-text {
  padding-top: 10px;
  font-size: 28px;
  color: #363636;
}
.item-dot {
  position: absolute;
  right: -15px;
  top: -15px;
  width: 44px;
  height: 44px;
  line-height: 44px;
  color: #fff;
  text-align: center;
  border-radius: 22px;
  background-color: #f7585d;
}

.line {
  width: 750px;
  height: 1px;
  background-color: #edecee;
}

.topic-wrap{
    background-color: #fff;
    height: 100px;
    align-items: center;
}
.topic-a{
    margin-left: 30px;
    margin-right: 30px;
}
.topic-text{ color: #4e92e3; font-size: 30px;}

.list {
  height: 500px;
}
.cell {
  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 30px;
  padding-right: 30px;
  border-bottom-style: solid;
  border-bottom-color: #cdd5db;
  border-bottom-width: 1px;
}
.cell-img {
  width: 145px;
  height: 145px;
  margin-right: 30px;
  border-radius: 5px;
}
.cell-tit {
  font-size: 32px;
  lines: 1;
  color: #282d32;
}
.cell-info {
  font-size: 26px;
  lines: 2;
  color: #909090;
  margin-top: 10px;
  line-height: 38px;
}
</style>
