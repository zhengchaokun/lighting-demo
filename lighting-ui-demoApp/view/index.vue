
<template>
    <div style="background-color:#f0eff4;">
        <scroller offset-accuracy="10" @scroll="scrollHandler">
            
            <lc-lightbox autoPlay="true" ref="lc-lightbox"
                height="440"
                interval="5000"
                showIndicator="true"
                :image-list="imageList"
                :indicatorColor="indicatorColor"
                @lcImgClick="lcImgClick">
            </lc-lightbox>

            <div class="mt20 bgc-white">
                <div class="pos-r">
                    <scroller class="flex-row" show-scrollbar="false" scroll-direction="horizontal" style="height:200px;">                 
                        <div class="flex-row item-box">  
                            <div class="item-cont">
                                <div class="pos-r item-cont-wrap">
                                    <image src="images/icon-2.png" class="item-pic"></image>
                                </div>
                                <text class="item-text">我的资产</text>
                            </div>    
                            <div class="item-cont">
                                <div class="pos-r item-cont-wrap">
                                    <image src="images/icon-3.png" class="item-pic"></image>
                                    <text class="item-dot">8</text>
                                </div>
                                <text class="item-text">涨乐资讯</text>
                            </div>              
                            <div class="item-cont" @click="jump('#/apply')">
                                <div class="pos-r item-cont-wrap">
                                    <image src="images/icon-1.png" class="item-pic"></image>
                                </div>
                                <text class="item-text">新股申购</text>
                            </div>                                              
                            <div class="item-cont">
                                <div class="pos-r item-cont-wrap">
                                    <image src="images/icon-4.png" class="item-pic"></image>
                                </div>
                                <text class="item-text">股票开户</text>
                            </div>
                            <div class="item-cont">
                                <div class="pos-r item-cont-wrap">
                                    <image src="images/icon-5.png" class="item-pic"></image>
                                </div>
                                <text class="item-text">签到</text>
                            </div>
                            <div class="item-cont">
                                <div class="pos-r item-cont-wrap">
                                    <image src="images/icon-6.png" class="item-pic"></image>
                                </div>
                                <text class="item-text">成本神器</text>
                            </div>
                        </div>                                                                                                
                    </scroller>
                    <text class="right-corner"> &gt; </text> 
                </div>
            </div>
            
            <!-- <text>{{hint}}</text> -->

            <div class="mt20 bgc-white">
                <scroller class="flex-row" show-scrollbar="false" scroll-direction="horizontal" style="height:100px;">
                    <div class="topic-wrap flex-row" v-for="(topic,index) in topics" :key="index">
                        <a class="topic-a" href="" @click="jump('#/news')">
                            <text class="topic-text">{{topic.val}}</text>
                        </a>                   
                    </div>
                </scroller>            
                <div class="line"></div>

                <lc-info-list 
                    type="imgleft"
                    :infoList="infoList"
                    @infoClick="infoClick"
                    :imgStyle="imgStyle"
                ></lc-info-list>
            </div>

            <div class="mt20 bgc-white">
                <div class="concept-head">
                    <image src="images/fire.png" class="concept-img"></image>
                    <text class="concept-tit">热门概念</text>
                </div>
                <scroller class="flex-row" show-scrollbar="false" scroll-direction="horizontal" style="height:350px;">                    
                    <div class="concept-box" v-for="(concept,index) in concepts" :key="index" @click="jumpConcept(index)">
                        <text class="concept-name">{{concept.name}}</text> 
                        <text :class="['concept-price', concept.price>0 && 'c-red',concept.price<0 && 'c-green']">{{concept.price}}%</text> 
                        <text class="concept-info">{{concept.info}}</text> 
                    </div> 
                    <div class="concept-box concept-more" @click="jump('#/index/concept_more')">
                        <image class="concept-more-img" src="images/more-icon.png"></image>
                        <text class="concept-more-text">查看更多</text>
                    </div>                                                      
                </scroller> 
            </div>

            <div class="mt20 bgc-white tag-wrap">
                <div class="tag-box" v-for="(tag,index) in tags" :key="index" :class="[tagClass(index)]">
                    <text class="tag-text" :class="[tagClass(index)]">{{tag.val}}</text>
                </div>
            </div>

            <div class="mt20 bgc-white msg-wrap" v-for="(msg,index) in msgList" :key="index">
                <div class="msg-head flex-row justify-between">
                    <div class="flex-row ">
                        <image class="msg-head-img" :src="msg.pic"></image>
                        <div class="ml20">
                            <text class="msg-head-name">{{msg.name}}</text>
                            <text class="msg-head-time">{{msg.time}}</text>
                        </div>
                    </div>
                    <div class="msg-head-attent">
                        <text class="msg-head-attent-text">关注</text>
                    </div>
                </div>
                <div class="msg-cont">
                    <text class="msg-cont-topic">{{msg.topic}}</text>
                    <text class="msg-cont-detail">{{msg.detail}}</text>
                </div>
                <div class="msg-reply">
                    <div class="flex-row mt10" v-for="(r,i) in msg.reply" :key="i">
                        <text class="msg-reply-name">{{r.rname}}:</text>
                        <text class="msg-reply-msg">{{r.rmsg}}</text>
                    </div>
                </div>
                
            </div>

            <div class="mt20 flex-row justify-between">
                <div class="flex-row func-wrap">
                    <image class="func-wrap-img" src="images/icon-kf.png"></image>
                    <div class="ml30">
                        <text class="func-wrap-tit">在线客服</text>
                        <text class="func-wrap-tip">实时解答</text>
                    </div>
                </div>
                <div class="flex-row func-wrap">
                    <image class="func-wrap-img" src="images/icon-lc.png"></image>
                    <div class="ml30">
                        <text class="func-wrap-tit">理财学堂</text>
                        <text class="func-wrap-tip">炒股入门</text>
                    </div>
                </div>
            </div>

            <div class="mt20 bgc-white">
                <lc-info-list type="text" 
                :infoList="infoList1" 
                :titleStyle="titleStyle"
                :timeStyle="timeStyle"
                ></lc-info-list>
            </div>
            
            
        </scroller>
        <lc-minibar title="导航栏标题"
            right-text="导航" 
            :style="navbarStyle"
            text-color="#FFFFFF"
            :background-color="bgc"      
            @LcMinibarRightButtonClicked="jump('#/nav')">
            <image class="navbar-img" src="images/msg.png" slot="left" @click="jump('#/msg')" style="padding-left:40px;"></image>
            <div slot="middle" class="navbar-search">
                <image class="navbar-search-icon" src="images/search.png"></image>
                <text class="navbar-search-text">股票代码或拼音简称</text>
            </div>
        </lc-minibar>
    </div>
</template>
<script>
import App from "light";
import LcMinibar from "lighting-ui/packages/lc-minibar";
import LcLightbox from "lighting-ui/packages/lc-lightbox";
import LcInfoList from "lighting-ui/packages/lc-info-list";
export default {
  components: { LcMinibar,LcLightbox,LcInfoList},
  data() {
    return {
      /* hint:"", */
      navbarStyle:{position:'fixed',top:'40px',left:'0',fontSize:'30px'},
      bgc:'rgba(222,48,47,0)',
      imgStyle:{ width:'145px',height:'123px'},
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
              textTitle:'技术论事：沪指连阳终结',
              textInfo:'今年以来，虽然A股上涨了6.1（截止发稿前），但是境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              src:'images/newpic.png'
          },
          {
              textTitle:'人民日报：部分楼市放松限购政策',
              textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              src:'images/newpic1.png'
          },
          {
              textTitle:'日本史上最大ipo要来了',
              textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              src:'images/newpic2.png'
          },
          {
              textTitle:'盘中直击：指数弱势反弹',
              textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              src:'images/newpic3.png'
          }
      ],
      concepts:[
          {name:'医药',price:'-0.7',info:'医药市场格局加速重组,4家公司重组,未来格局不明朗'},
          {name:'家电',price:'+0.3',info:'智能小家电市场容量激增'},
          {name:'分散染料',price:'+0.33',info:'分散染料板块拉升'},
          {name:'白酒',price:'0.0',info:'啤酒也提价，啤酒股能否重启行情'},
          {name:'猪肉',price:'-0.42',info:'春节将至，黑猪散养成风口'}
      ],
      tags:[
          {val:'直播',href:'#'},
          {val:'财经日历',href:'#'},
          {val:'技术论市',href:'#'},
          {val:'订阅',href:'#'},
          {val:'涨乐FM',href:'#'},
          {val:'活动专区',href:'#'},
          {val:'涨乐吧火热讨论中',href:'#'}
      ],
      msgList:[
          {
              name:'Lerry',
              time:'28分钟前',
              pic:'images/head-pic-1.png',
              topic:'连续十几天上涨，没有一天降的多',
              detail:'一日到达旧金山',
              reply:[
                  {rname:'小凯伦',rmsg:'太狠了，都不用办护照了，哈哈哈'},
                  {rname:'墨迹头',rmsg:'大盘就是这样潇洒，个股更潇洒'}
              ]
          },
          {
              name:'友人相交',
              time:'14分钟前',
              pic:'images/head-pic-2.png',
              topic:'为什么？',
              detail:'指数越来越高，个股价越来越低',
              reply:[
                  {rname:'乐的不行',rmsg:'就是逆向而行，如果不是，那就不是大盘了'},
                  {rname:'靠股发财',rmsg:'狙杀手段'}
              ]
          }
      ],
      infoList1:[
          {
              textTitle:'技术论事：沪指连阳终结',
              textInfo:'今年以来，虽然A股上涨了6.1（截止发稿前），但是境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              textTime:'2018-1-15 14:07'
          },
          {
              textTitle:'人民日报：部分楼市放松限购政策部分楼市放松限购政策',
              textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              textTime:'2018-1-15 14:07'
          },
          {
              textTitle:'日本史上最大ipo要来了',
              textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              textTime:'2018-1-15 14:07'
          },
          {
              textTitle:'盘中直击：指数弱势反弹',
              textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              textTime:'2018-1-15 14:07'
          },
          {
              textTitle:'技术论事：沪指连阳终结',
              textInfo:'今年以来，虽然A股上涨了6.1（截止发稿前），但是境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              textTime:'2018-1-15 14:07'
          },
          {
              textTitle:'人民日报：部分楼市放松限购政策',
              textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              textTime:'2018-1-15 14:07'
          },
          {
              textTitle:'日本史上最大ipo要来了',
              textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              textTime:'2018-1-15 14:07'
          },
          {
              textTitle:'盘中直击：指数弱势反弹',
              textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
              textTime:'2018-1-15 14:07'
          }
      ],
      titleStyle:{color: '#36364d', fontWeight: 'bold'},
      timeStyle:{ textAlign:'left'}
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
      App.navigate('#/news')
    },
    tagClass(index){
        if(this.tags.length-1 == index){
            return 'tag-box-red'
        }else{
            return 'c-gray'
        }
    },
    jumpConcept(){
        App.navigate('#/index/concept')
    },
    scrollHandler(e){
        /* var LightJSBridge = weex.requireModule('LightJSBridge');
        this.offsetY = e.contentOffset.y;
       
        var percent = Math.abs(this.offsetY) / 500.0;
        if(percent>1){
            percent=1;
        }
        this.hint = '滚动了'+ this.offsetY + '百分比'+percent;
        var params={ "alpha":percent};
        LightJSBridge.call("head.setAlpha",params,null); */
        this.offsetY = e.contentOffset.y;
        var percent = Math.abs(this.offsetY) / 500.0;
        if(percent>1){
            percent=1;
        }
        this.bgc='rgba(222,48,47,'+percent+')'
        
    }
  },
  mounted(){
      /* 调native导航 */
       /* var LightJSBridge = weex.requireModule('LightJSBridge');
       var head = weex.requireModule('head');
       var event = weex.requireModule('event'); 
       LightJSBridge.call('head.setSearchView',{
           'icon':'search',
           'placeholderText':'股票代码或拼音简称',
           'placeholderTextColor':'#f3c4ce',
           'backgroundColor':'transparent'
        },function(res){
            console.log(res);
            App.navigate('#')
        })

        head.setRightItem({'title':'导航'},function(){ 
            App.navigate('#/nav')
        });
        head.setLeftItem({"icon":"msg"},function(){
            App.navigate('#/msg')
            // event.openNative('web',{startPage:'https://www.baidu.com'})
        }); */
  }
};
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
.navbar-img{ width: 55px; height: 55px; margin-left: 40px;}
.navbar-search{ align-items: center; flex-direction: row; justify-content: center;
     width: 510px; height: 70px; border-radius: 15px; background-color:rgba(255, 255, 255, 0.3); }
.navbar-search-icon{ width: 30px; height: 30px;}
.navbar-search-text{ color: #ebe8e9; font-size: 28px; margin-left: 10px;}

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
}
.item-text {
  padding-top: 10px;
  font-size: 28px;
  color: #363636;
}
.item-cont-wrap{
    width: 120px;
    height: 95px;
    align-items: center;
    justify-content: flex-end;
}
.item-dot {
  position: absolute;
  right: 6px;
  top: 2px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  border-radius: 22px;
  font-size: 24px;
  background-color: #f7585d;
}

.line {
  width: 750px;
  height: 1px;
  background-color: #edecee;
}

.topic-wrap{background-color: #fff;height: 100px;align-items: center;}
.topic-a{margin-left: 30px; margin-right: 30px;}
.topic-text{ color: #4e92e3; font-size: 30px;}

.concept-wrap{height: 450px;}
.concept-head{ height: 100px; flex-direction: row; align-items: center;justify-content: center;}
.concept-tit{ font-size: 36px; color: #414141; margin-left: 20px;}
.concept-img{ width: 43px; height: 54px;}

.concept-box{ align-items: center; width: 245px; height: 300px; margin-left: 30px; margin-right: 30px;
    margin-top: 10px; padding: 30px; border-style: solid; border-width: 1px; border-color: #ececec; border-radius: 8px;}
.concept-more{ background-color: #f3f3f3;}
.concept-more-img{ width: 108px; height: 108px; margin-top: 20px;}
.concept-more-text{color: #bababa; font-size: 32px; margin-top: 20px;}
.concept-name{ color: #333; font-size: 38px; margin-top: 10px;}
.concept-price{font-size: 44px; margin-top: 50px;}
.concept-info{ color: #929292; font-size: 26px; lines:2; margin-top: 20px;}

.tag-wrap{ height: 250px; padding-left: 40px; padding-right: 40px; padding-top:30px; flex-direction: row;flex-wrap: wrap; justify-content: space-between;}
.tag-box{align-items: center; justify-content: center; height: 60px; padding-left: 20px; padding-right: 20px; 
    margin-top: 20px; border-style: solid; border-width: 1px; border-color: #eaeaea; border-radius: 20px;}
.tag-box-red{ border-color: #dc7070; color: #dc7070;}
.tag-text{ font-size: 30px;}

.msg-wrap{ padding-top: 40px; padding-left: 20px; padding-bottom: 60px; padding-right: 50px;}
.msg-head{ height: 80px; align-items: center;}
.msg-head-img{ width: 70px; height: 70px; border-radius: 35px; margin-left: 20px;}
.msg-head-name{ color: #333; font-size: 32px;}
.msg-head-time{ color: #979797; font-size: 24px;} 
.msg-head-attent{align-items: center; justify-content: center; width: 100px; height: 50px; border-style: solid; border-width: 1px; border-color: #d4d4d4; }
.msg-head-attent-text{ color: #4a90e2; font-size: 28px;}

.msg-cont{ margin-top: 30px; margin-left: 20px;}
.msg-cont-topic{ font-size: 32px; color: #414141; font-weight: bold;}
.msg-cont-detail{ font-size: 32px; color: #5b5b5b; margin-top: 20px; lines:2;}

.msg-reply{background-color: #f3f3f5; padding: 30px; margin-top: 50px; margin-left: 20px;}
.msg-reply-name{color: #5681b2; font-weight: bold; font-size: 28px;}
.msg-reply-msg{color: #545454; font-size: 28px; flex:1; margin-left: 10px;}

.func-wrap{ width: 365px; height: 160px; background-color: #fff; justify-content: center; align-items: center;}
.func-wrap-img{ width: 66px; height: 53px;}
.func-wrap-tit{color: #323232; font-weight: bold; font-size: 34px;}
.func-wrap-tip{color: #d4d4d4; font-size: 26px; margin-top: 10px;}

.info-list{ padding-top: 50px; padding-bottom: 40px; padding-left: 30px; padding-right: 30px;
      border-bottom-style: solid; border-bottom-color: #eae9ec; border-bottom-width: 1px; }
.info-list-tit{ font-size: 32px; lines:2; color: #36364d; font-weight: bold;}
.info-list-info{ font-size: 26px; lines:1; color: #9a9aa6; margin-top: 20px; }
.info-list-time{ text-align: left; color: #9a9aa6; font-size: 24px; margin-top: 20px;}

</style>
