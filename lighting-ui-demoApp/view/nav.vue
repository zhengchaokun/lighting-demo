
<template>
    <div style="background-color:#f0eff4;">
        <scroller>
            <lc-cell :cell-style="cellStyle" :has-arrow="true">
                <div class="flex-row pos-r align-center" slot="label">                   
                    <image class="cell-img" src="images/guide1.png"></image>
                    <text class="cell-tit">功能全解析</text>
                    <text class="ml20 cell-text">涨乐5.0全新上线啦</text>
                    <image class="cell-icon" src="images/icon-zl.png"></image>                    
                </div>               
            </lc-cell>

            <div class="mt20 bgc-white">
                <lc-cell label="业务办理" :has-arrow="false" :label-style="labelStyle" :cell-style="cellStyle1"></lc-cell>
                <div class="nav-wrap">
                    <div class="nav-cont">
                        <text class="nav-text">个人信息</text>
                        <text class="nav-text">密码修改</text>
                        <text class="nav-text">网上开户</text>
                    </div>
                    <div class="nav-cont">
                        <text class="nav-text">在线客服</text>
                        <text class="nav-text">创业板转签</text>
                        <text class="nav-text">辅资金账户</text>
                    </div>
                    <div class="nav-cont">
                        <text class="nav-text">三方存管变更</text>
                        <text class="nav-text">开通股东账户</text>
                        <text class="nav-text">身份证更新</text>
                    </div>
                    <div class="nav-cont">
                        <text class="nav-text">更多业务办理</text>
                        <text class="nav-text"></text>
                        <text class="nav-text"></text>
                    </div>
                </div>
            </div>

            <div class="mt20 bgc-white mb20">
                <lc-cell label="股票" :has-arrow="false" :label-style="labelStyle" :cell-style="cellStyle1"></lc-cell>
                <div class="nav-wrap">
                    <div class="nav-cont">
                        <text class="nav-text">买入</text>
                        <text class="nav-text">卖出</text>
                        <text class="nav-text">撤单</text>
                    </div>
                    <div class="nav-cont">
                        <text class="nav-text">委托成交</text>
                        <text class="nav-text">我的持仓</text>
                        <text class="nav-text">银证转账</text>
                    </div>
                    <div class="nav-cont">
                        <text class="nav-text">查询资金</text>
                        <text class="nav-text">查询交割</text>
                        <text class="nav-text">融资融券</text>
                    </div>
                    <div class="nav-cont">
                        <text class="nav-text">自选股</text>
                        <text class="nav-text">持仓股</text>
                        <text class="nav-text">交易</text>
                    </div>
                </div>
            </div>
        </scroller> 
    </div>
</template>
<script>
import App from "light";
import LcCell from "lighting-ui/packages/lc-cell";
    export default {
        components: { LcCell },
        data(){
            return {
                cellStyle:{height:'165px'},
                cellStyle1:{height:'105px'},
                labelStyle:{ color:'#a8a7ac'}
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>

.cell-tit{ padding-left: 20px; padding-right: 20px; color: #343434; font-size: 32px; border-right-width: 1px; border-right-color: #e2e2e2;}
.cell-img{ width:50px; height: 60px; }
.cell-icon{ position: absolute; top:-15px; left: 510px; width:87px; height: 40px; }
.cell-text{ color: #569df7; font-size: 28px;}

.nav-wrap{ padding-left: 25px; padding-right: 25px;}
.nav-cont{ height: 100px; border-bottom-color: #e4e4e4; border-bottom-width: 1px; align-items: center; justify-content: space-around; flex-direction: row;}
.nav-text {color: #565658; font-size: 30px; width: 220px; text-align: left;}

</style>
