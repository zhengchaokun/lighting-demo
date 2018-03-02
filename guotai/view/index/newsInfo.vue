
<template>
    <div>
       <scroller class="news-wrap">
           <text class="title">美国国会参众两院通过临时法案 结束联邦政府“关门”僵局</text>
           <div class="mt30 flex-row info-wrap">
               <div class="flex-row align-center">
                   <text class="info-tit">来源：人民日报</text>
                   <text class="info-tit ml20">2018-01-23 07:08</text>
               </div>
           </div>
           <div class="news-cont mt30">
               <text class="news-cont-text">美国国会参众两院22日通过一份为期三周的临时拨款法案以维持美国联邦政府运转至2月8日，结束了美国联邦政府“关门”三天的僵局。</text>
               <image class="news-cont-img" @load="onImageLoad" src="images/banner-2.png"></image>
               <text class="news-cont-text">1月22日，参议院以81比18通过了短期拨款法案，维持联邦政府运营至2月8日，国会众议院也以266票赞成、150票反对、37票弃权的结果通过该法案，这意味着美国联邦政府部门将在关门3天后重新“开张”。</text>
               <text class="news-cont-text">在20日当天美国国会参议院就复会重新开始谈判，不过两党相互指责，进展不大。参议院共和党人提出一个近三周的临时拨款法案，并承诺积极协商移民问题。两党25名温和派议员也在周末沟通，希望寻找双方都能接受的方案，最终参议院决定在22日中午进行表决。</text>
           </div>
           <lc-tip :show="show" type="text" :message="message"></lc-tip>            
       </scroller>
    </div>
</template>
<script>
import App from "light";
import LcTip from 'lighting-ui/packages/lc-tip';
    export default {
        components: { LcTip },
        data(){
            return {
                isSC:false,
                show:false,
                message:''
            }
        },
        methods:{
            onImageLoad (event) {
                if (event.success) {
                    console.log(1)
                }
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
.news-wrap{padding: 20px;}
.title{ color: #2d2d2d; font-size: 42px; font-weight: bold; line-height: 60px; lines:2;}
.info-wrap{ align-items: center; justify-content: space-between;}
.info-tit{ color: #818181; font-size: 28px;}
.info-img{ width: 37px; height: 37px; margin-right: 10px;}
.info-img-tit{ color: #3d4144; font-size: 28px;}
.news-cont{ align-items: center;}
.news-cont-img{ width: 700px; height: 200px; margin-top: 15px; margin-bottom: 15px;}
.news-cont-text{ color: #313538; font-size: 34px; text-indent: 60px; margin-top: 20px; line-height: 50px;}
</style>
