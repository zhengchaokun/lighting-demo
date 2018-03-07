
<template>
    <div>
       <div class="operateWrap">
           <div v-if="type!=1" class="buyCont buyStyle">  
                <div class="itemList">
                    <div class="subitem">
                        <span>产品</span><span>301杭实善成</span><em>选择</em>
                    </div>
                </div>
            </div>
            <div class="codeMenu flex" v-if="type==2">
                <span class="flex1 current">未执行</span>
                <span class="flex1">执行中</span>
                <span class="flex1">已完成</span>
                <span class="flex1">已撤销</span>
            </div>
            <div class="operateList">
                <span class="operateBut" :class="{'bgRed':type!=3,'bgBlue':type==3}" ><em>{{type==3 ? "平仓" :"撤销"}}</em></span>
                <h2>30101 焦煤投资策略组合1/产品名称</h2>
                <p>
                    <span class="code">IF1806</span>
                    <span class="colorRed">买入</span>
                    <span>{{type==3 ? "投机" :"开仓"}}</span>
                    <span>{{type==3 ? "持仓均价" :"价格"}}<em>4448.0</em></span>
                </p>
                <p>
                    <span>{{type==3 ? "持仓" :"指令数量"}}<em>12</em></span>
                    <span>{{type==3 ? "可平" :"已委托"}}<em>12</em></span>
                    <span v-if="type!=3">已成交<em>12</em></span>
                </p>
            </div>
       </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                type:""
            }
        },
        watch:{
            '$route.query.type':function(){
                this.type = this.$route.query.type;
            }
        },
        mounted(){
            this.type = this.$route.query.type;
        }
    }
</script>
<style lang="less">

</style>
