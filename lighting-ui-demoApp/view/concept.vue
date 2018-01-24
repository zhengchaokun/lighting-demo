
<template>
    <div style="background-color:#f0eff4;">
       <scroller>
            <div class="head">
                <image class="head-img" src="images/bj-1.png"></image>
                <div class="pos-a head-box">
                    <text class="head-tit">电商</text>
                    <text class="head-text">高基数下，市场或进入高成长期。</text>
                </div>               
            </div>   
            <lc-cell label="上榜•理由" :has-arrow="true" :label-style="labelStyle"></lc-cell> 
            <div class="bgc-white concept-cont">
                <text class="concept-cont-tit">国美触角延至农产品 入局生鲜电商大战</text>
                <text class="concept-cont-info">近日，国美宣布与中国优质农产品开发服务协会(下称优农)进行合作，共推地方优质农产品的公用品牌建设及线上线下流通渠道建设。通过此次合作，国美的触角延伸至农产品供应链上游，而国美零售商的角色也将快速发生转变。</text>
            </div> 

            <lc-cell class="mt20" label="相关个股" :has-arrow="true" :label-style="labelStyle"></lc-cell> 
            <div class="bgc-white concept-wrap">
                <div class="concept-box" v-for="(concept,index) in concepts" :key="index">
                    <text :class="['concept-name', concept.price>0 && 'c-red',concept.price<0 && 'c-green']">{{concept.name}}</text> 
                    <text class="concept-code">({{concept.code}})</text> 
                    <text :class="['concept-price', concept.price>0 && 'c-red',concept.price<0 && 'c-green']">{{concept.price}}%</text>                    
                </div> 
            </div>

            <lc-cell class="mt20" label="事件追踪" :has-arrow="false" :label-style="labelStyle"></lc-cell> 
            <div class="bgc-white">
                <lc-info-list type="text" :infoList="infoList" @infoClick="infoClick"
                    :titleStyle="titleStyle"
                ></lc-info-list>
            </div>
                                    
       </scroller>
    </div>
</template>
<script>
import App from "light";
import LcCell from "lighting-ui/packages/lc-cell";
import LcInfoList from "lighting-ui/packages/lc-info-list";

    export default {
        components: { LcCell,LcInfoList },
        data(){
            return {
                labelStyle:{fontSize:'30px',color:'#434343'},
                concepts:[
                    {name:'南极电商',price:'-0.7',code:'002127'},
                    {name:'焦点科技',price:'+0.3',code:'002315'},
                    {name:'腾邦国际',price:'+0.33',code:'300178'},
                ],
                infoList:[
                    {
                        textTitle:'技术论事：沪指连阳终结',
                        textTime:'2018-01-22'
                    },
                    {
                        textTitle:'人民日报：部分楼市放松限购政策',
                        textTime:'2018-01-22'
                    },
                    {
                        textTitle:'日本史上最大ipo要来了',
                        textTime:'2018-01-22'
                    },
                    {
                        textTitle:'盘中直击：指数弱势反弹',
                        textTime:'2018-01-22'
                    }
                ],
                titleStyle:{ fontSize:'36px',color:'#2c2c2c'}
            }
        },
        methods:{
            infoClick(e) {
                console.log("clicked" + e.index);
                App.navigate('#/news')
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
.head{ position: relative; height: 500px; align-items: center; flex-direction: row;}
.head-img{ width:750px; height: 500px; }
.head-box{ width: 570px; margin-left: 90px; top: 285px;}
.head-tit{ color: #edfffb; font-size: 34px; font-weight: bold; text-align: center;}
.head-text{ color: #b1bfc8; font-size: 28px; margin-top: 35px;}

.concept-cont{ padding-top:38px; padding-left: 45px; padding-right: 45px; padding-bottom: 60px; align-items: center; }
.concept-cont-tit{color: #2a292f; font-size: 38px; font-weight: bold;}
.concept-cont-info{color: #707072; font-size: 32px; margin-top: 20px; line-height: 50px;}

.concept-wrap{ padding-top: 40px; padding-bottom: 40px; padding-left: 30px; padding-right: 30px;
     align-items: center; justify-content: space-between; flex-direction: row;}
.concept-box{ align-items: center; width: 220px; height: 205px; padding: 20px; border-style: solid; border-width: 1px; border-color: #eae6e7; border-radius: 8px;}
.concept-name{ font-size: 32px; margin-top: 10px;}
.concept-code{ color: #3b3c40; font-size: 26px; margin-top: 10px;}
.concept-price{font-size: 40px; margin-top: 20px;}


</style>
