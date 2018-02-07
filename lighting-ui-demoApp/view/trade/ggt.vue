
<template>
    <div style="background-color:#f0eff4;">
       <scroller>
           <div class="trade-grid flex-row bgc-white">
               <div class="trade-grid-wrap bgc-white" v-for="(trade,i) in trades" :key="i">
                   <image class="trade-grid-img" :src="trade.src"></image>
                   <text class="trade-grid-text">{{trade.val}}</text>
               </div>
           </div>

           <lc-cell class="mt10" label="港股通汇率、余额查询" :has-arrow="true" :cell-style="cellStyle" ></lc-cell>

            <div class="mt20">
                <lc-cell label="我的港股持仓" :cell-style="cellStyle" :has-arrow="true" :has-bottom-border="false"></lc-cell>
                <lc-cell label="我的当日委托" :cell-style="cellStyle" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>
                <lc-cell label="我的当日成交" :cell-style="cellStyle" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>
                <lc-cell label="我的港股交割" :cell-style="cellStyle" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>
                <lc-cell label="交易日历" :cell-style="cellStyle" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>
                <lc-cell label="查询资金" :cell-style="cellStyle" cell-index="last" :has-arrow="true" :has-top-border="false"></lc-cell>
            </div>

            <div class="flex-row mt40 mb40">
                <text class="wh">?</text>
                <text class="wh-text">什么是港股通，了解港股通交易规则</text>
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
                ],
                cellStyle:{height:'100px'}
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
.trade-grid{ height: 228px; padding-top: 30px; padding-bottom: 30px; flex-wrap: wrap; justify-content: center;}
.trade-grid-wrap{ align-items: center; justify-content: center; width: 200px; height: 150px; border-right-width: 1px; border-right-color: #f1f1f1;}
.trade-grid-img{width: 84px; height: 84px;}
.trade-grid-text{ color: #a39fa0; font-size: 28px; margin-top: 20px;}

.wh{ width: 32px; height: 32px; line-height: 32px; text-align: center; color: #fff; font-size: 26px;
 border-radius: 16px; background-color: #d9d9d9; margin-left: 40px;}
.wh-text{ color: #d9d9d9; font-size: 26px; margin-left: 10px;}

</style>
