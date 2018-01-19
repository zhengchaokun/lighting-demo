
<template>
    <div style="background-color:#f0eff4;">
       <scroller>
           <div class="trade-grid flex-row">
               <div class="trade-grid-wrap bgc-white" v-for="(trade,i) in trades" :key="i">
                   <image class="trade-grid-img" :src="trade.src"></image>
                   <text class="trade-grid-text">{{trade.val}}</text>
               </div>
           </div>

           <lc-cell label="我的持仓" title="交易账户未登录" :has-arrow="true" link="#"
                :cell-style="cellStyle" :title-text-style="titleTextStyle"
           ></lc-cell>

           <div class="mt20">
                <lc-cell label="打新神器" :cell-style="cellStyle1" :has-arrow="true" :has-bottom-border="false"></lc-cell>
                <lc-cell label="新债申购" :cell-style="cellStyle1" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>
                <lc-cell label="港股通" :cell-style="cellStyle1" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>
                <lc-cell label="国债理财" :cell-style="cellStyle1" title="（俗称国债逆回购）" :title-text-style="titleTextStyle1" cell-index="last" :has-arrow="true" :has-top-border="false"></lc-cell>
            </div>

            <div class="mt20">
                <lc-cell label="华泰理财产品" :cell-style="cellStyle1" :has-arrow="true" :has-bottom-border="false"></lc-cell>
                <lc-cell label="场外基金交易" :cell-style="cellStyle1" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>
                <lc-cell label="分级基金" :cell-style="cellStyle1" title="（场内）" :title-text-style="titleTextStyle1" cell-index="last" :has-arrow="true" :has-top-border="false"></lc-cell>
            </div>

            <div class="mt20">
                <lc-cell label="借钱神器" :cell-style="cellStyle1" title="（泰融e）" :title-text-style="titleTextStyle1" :has-arrow="true" :has-bottom-border="false"></lc-cell>
                <lc-cell label="其他交易" :cell-style="cellStyle1" cell-index="last" :has-arrow="true" :has-top-border="false"></lc-cell>
            </div>

            <lc-cell class="mt20 mb30" :cell-style="cellStyle" :has-arrow="true" link="#">
                <div class="flex-row pos-r align-items-center" slot="label">
                    <image class="cell-img" src="images/icon-zn.png"></image>
                    <text class="ml20 cell-text">新版交易操作指南</text>
                    <image class="cell-icon" src="images/icon-zl.png"></image>                    
                </div>               
            </lc-cell>
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
                ],
                cellStyle:{height:'120px'},
                cellStyle1:{height:'100px'},
                titleTextStyle:{fontSize:'24px',color:'#c0c0c0'},
                titleTextStyle1:{ fontSize:'24px',color:'#d2d2d2',textAlign:'left'},
                cellIcon:'images/icon-zn.png'
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
.trade-grid{ height: 450px; padding-left: 15px; padding-right: 15px; flex-wrap: wrap; justify-content: space-around;}
.trade-grid-wrap{ align-items: center; justify-content: center; width: 168px; height: 200px;
    margin-top: 16px; border-style: solid; border-width: 1px; border-color: #d4d4d4; border-radius: 8px;}
.trade-grid-img{width: 84px; height: 84px;}
.trade-grid-text{ color: #a39fa0; font-size: 28px; margin-top: 30px;}

.cell-img{ width:39px; height: 50px; }
.cell-icon{ position: absolute; top:-15px; left: 330px; width:87px; height: 40px; }
.cell-text{ color: #4a4a4a;}
</style>
