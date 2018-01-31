
<template>
    <div style="background-color:#f0eff4;">
       <scroller>
           <div class="trade-grid flex-row bgc-white">
               <div class="trade-grid-wrap" :class="[ (i+1)%3!=0 && 'border-right']" v-for="(trade,i) in trades" :key="i">
                   <text class="trade-grid-tit">{{trade.tit}}</text>
                   <text class="trade-grid-text">{{trade.val}}</text>
               </div>
           </div>

           <div class="flex-row bgc-white grid-wrap mt20">
               <lc-grid :cols="4" :list="girds" @itemClicked="clickHandler"></lc-grid>
           </div>

           <div class="mt20">
                <lc-cell label="重要通知" :cell-style="cellStyle1" :has-arrow="true" :has-bottom-border="false"></lc-cell>
                <lc-cell label="我的两融持仓" :cell-style="cellStyle1" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>
                <lc-cell label="两融总资产" :cell-style="cellStyle1" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>
                <lc-cell label="两融总负债" :cell-style="cellStyle1" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>                           
                <lc-cell label="两融合约" :cell-style="cellStyle1" cell-index="last" :has-arrow="true" :has-top-border="false"></lc-cell>
            </div>

            <div class="mt20">
                <lc-cell label="综合查询" :cell-style="cellStyle1" :has-arrow="true" :has-bottom-border="false"></lc-cell>
                <lc-cell label="标的查询" :cell-style="cellStyle1" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>
                <lc-cell label="两融公告" :cell-style="cellStyle1" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>
                <lc-cell label="更多" :cell-style="cellStyle1" cell-index="last" :has-arrow="true" :has-top-border="false"></lc-cell>
            </div>

            <div class="mt20 bgc-white flex-row kf-wrap">
                <div class="flex-row align-center">
                    <image src="images/icon-kf.png" class="kf-img"></image>
                    <div class="ml30">
                        <text class="kf-tit-1">7x24小时客服在线</text>
                        <text class="kf-tit-2">融资融券答疑解惑</text>
                    </div>
                </div>
                <text class="kf-button">在线咨询</text>
            </div>

            <div class="mb40">
                <lc-cell label="融资融券基础知识" :cell-style="cellStyle2" :label-style="titleTextStyle2" :has-arrow="true" :has-bottom-border="false"></lc-cell>
                <lc-cell label="新手操作指南" :cell-style="cellStyle2" :label-style="titleTextStyle2" cell-index="last" :has-arrow="true" :has-top-border="false"></lc-cell>
            </div>

       </scroller>
    </div>
</template>
<script>
import App from "light";
import LcCell from "lighting-ui/packages/lc-cell";
import LcGrid from 'lighting-ui/packages/lc-grid';
    export default {
        components: { LcCell,LcGrid},
        data(){
            return {
                trades:[
                    {tit:'买入',val:'担保品'},
                    {tit:'融买',val:'融资买入'},
                    {tit:'还',val:'还款还券'},
                    {tit:'卖出',val:'担保品'},
                    {tit:'融卖',val:'融券卖出'},
                    {tit:'延',val:'合约延期'}
                ],
                cellStyle:{height:'120px'},
                cellStyle1:{height:'100px'},
                cellStyle2:{backgroundColor:'#f3f3f5'},
                titleTextStyle:{fontSize:'24px',color:'#c0c0c0'},
                titleTextStyle1:{ fontSize:'24px',color:'#d2d2d2',textAlign:'left'},
                titleTextStyle2:{color:'#939393'},
                girds:[
                    {
                        label:"撤单",
                        icon: "images/grid-icon-1.png",
                        path: ""
                    },
                    {
                        label:"委托成交",
                        icon: "images/grid-icon-2.png",
                        path: ""
                    },
                    {
                        label:"担保划转",
                        icon: "images/grid-icon-3.png",
                        path: ""
                    },
                    {
                        label:"银证转账",
                        icon: "images/grid-icon-4.png",
                        path: ""
                    }
                ]
            }
        },
        methods:{
            clickHandler({item, index}){
                console.log(item, index)
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
.trade-grid{ height: 370px; padding-top: 20px; padding-bottom: 20px; flex-wrap: wrap; justify-content: space-around;align-content: stretch;}
.trade-grid-wrap{ align-items: center; justify-content: center; width: 245px; height: 125px; margin-top: 25px;}
.border-right{ border-right-style: solid; border-right-width: 1px; border-right-color: #d4d4d4;}    
.trade-grid-tit{ color: #de4c5f; font-size: 40px;}
.trade-grid-text{ color: #938f8e; font-size: 30px; margin-top: 20px;}

.grid-wrap{ height: 145px;}

.kf-wrap{ height: 165px; padding: 40px; align-items: center; justify-content: space-between;}
.kf-img{ width: 66px; height: 53px; }
.kf-button{ width: 125px; height: 50px; line-height: 50px; text-align: center;border-style: solid; border-width: 1px; font-size: 24px; border-color: #a98d77; color: #a98d77;}
.kf-tit-1{ color: #2f2f2f; font-size: 36px; font-weight: bold;}
.kf-tit-2{ color: #ddd; font-size: 30px;}

</style>
