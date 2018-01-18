
<template>
    <div style="background-color:#f0eff4;">
       <scroller>
           <div class="trade-grid flex-row">
               <div class="trade-grid-wrap bgc-white" v-for="(trade,i) in trades" :key="i">
                   <image class="trade-grid-img" :src="trade.src"></image>
                   <text class="trade-grid-text">{{trade.val}}</text>
               </div>
           </div>
       </scroller>
    </div>
</template>
<script>
import App from "light";
import LcCell from "lighting-ui/packages/lc-cell";
    export default {
        components: { LcCell},
        data(){
            return {
                trades:[
                    {src:'images/g-1.png',val:'买入'},
                    {src:'images/g-2.png',val:'卖出'},
                    {src:'images/g-3.png',val:'撤单'},
                    {src:'images/g-4.png',val:'查询资金'},
                    {src:'images/g-5.png',val:'查询委托'},
                    {src:'images/g-6.png',val:'查询成交'},
                    {src:'images/g-7.png',val:'银证转账'},
                    {src:'images/g-8.png',val:'更多'},
                ]
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
.trade-grid{ height: 450px; padding-left: 15px; padding-right: 15px; flex-wrap: wrap; justify-content: space-around;}
.trade-grid-wrap{ align-items: center; justify-content: center; width: 168px; height: 200px;
    margin-top: 15px; border-style: solid; border-width: 1px; border-color: #d4d4d4; border-radius: 8px;}
.trade-grid-img{width: 84px; height: 84px;}
.trade-grid-text{ color: #a39fa0; font-size: 28px; margin-top: 30px;}
</style>
