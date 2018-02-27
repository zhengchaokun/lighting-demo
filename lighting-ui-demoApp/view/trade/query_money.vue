
<template>
    <div>
        <scroller style="height: 1334px;"> 
            <image class="topimg" src="images/kh.jpg"></image>
            <div class="query-wrap">
                <div class="money-wrap justify-center align-center">
                    <text class="money-title">人民币资产（元）</text>
                    <text class="money-detail">0.00</text>        
                </div>  
                <list class="list">
                    <cell class="cell">
                        <text class="cell-title">余额</text>
                        <text class="cell-detail">0.00</text> 
                    </cell>
                    <cell class="cell border border-l">
                        <text class="cell-title">可用</text>
                        <text class="cell-detail">0.00</text> 
                    </cell>
                    <cell class="cell border border-d">
                        <text class="cell-title">可取</text>
                        <text class="cell-detail">0.00</text> 
                    </cell>
                    <cell class="cell">
                        <text class="cell-title">冻结</text>
                        <text class="cell-detail">0.00</text> 
                    </cell>
                    <cell class="cell">
                        <text class="cell-title">股票市值</text>
                        <text class="cell-detail">0.00</text> 
                    </cell>
                </list>                   
            </div>
        </scroller>
    </div>
</template>
<script>
import App from "light";
import LcButton from "lighting-ui/packages/lc-button";
    export default {
        components: { LcButton},        
        data(){
            return {
            }
        },
        methods:{
        
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
.query-wrap{ padding-left: 100px; padding-right: 100px;}
.money-wrap{ height: 200px;}
.money-title{color: #666; font-size: 30px;}
.money-detail{color: #666; font-size: 46px; margin-top: 20px;}

.list{ height: 400px; margin-top: 30px;}
.cell{ height: 80px; flex-direction: row; justify-content: space-between; align-items: center;}
.cell-title{color: #838383; font-size: 30px;}
.cell-detail{color: #777; font-size: 32px; font-weight: bold;}
.border{ border-bottom-width: 1px; border-bottom-style: solid;}
.border-l{ border-bottom-color: #f3f3f3;}
.border-d{ border-bottom-color: #e4e4e4;}

</style>
