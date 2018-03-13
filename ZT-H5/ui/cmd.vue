
<template>
    <div>
       <div class="operateWrap">
           <div v-if="com.prodData" class="buyCont buyStyle">
                <div class="itemList">
                    <div class="subitem">
                        <span>产品</span><span>{{com.prodData.fundList[com.prodData.current].fundCode}}{{com.prodData.fundList[com.prodData.current].fundName}}</span><em>选择</em>
                    </div>
                </div>
            </div>
            <div v-if="com.listData">
                <div class="codeMenu flex" v-if="currentFilter!=='default'">
                    <span class="flex1" :class="{current:currentFilter==key}" @click="currentFilter=key" v-for="(item,key) in com.listData">{{key}}</span>
                </div>
                <div class="operateList" v-for="(item,index) in com.listData[currentFilter]" @click="currentItemChecked=index">
                    <span class="operateBut" :class="com.clickBtn.cls" @click="com.clickBtn.handler(item)" v-show="currentItemChecked==index"><em>{{com.clickBtn.title}}</em></span>
                    <h2>{{item.fundId}} {{item.combiName}}/{{item.fundName}}</h2>
                    <p>
                        <span class="code">{{item.insId}}</span>
                        <span class="colorRed">{{dictByValue('entrustDirection',item.entrustDirection).substring(0,2)}}</span>
                        <span>{{dictByValue('entrustDirection',item.entrustDirection).substring(2,4)}}</span>
                        <span>持仓均价<em>{{item.insPrice}}</em></span>
                    </p>
                    <p>
                        <span>指令数量<em>{{item.entrustAmount}}</em></span>
                        <span>已委托<em>{{item.insAmount}}</em></span>
                        <span>已成交<em>{{item.dealAmount}}</em></span>
                    </p>
                </div>
            </div>
       </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                currentFilter:'default',
                currentItemChecked:null
            }
        },
        methods:{
            itemClicked(item){
            }
        },
        mounted(){
        },
        props:['com'],
        watch:{
            'com.listData':function(){
                if(this.com.listData){
                    this.currentItemChecked = null;
                    this.currentFilter = Object.keys(this.com.listData)[0]
                }
            }
        }
    }
</script>
<style lang="less">

</style>
