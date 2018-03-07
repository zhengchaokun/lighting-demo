
<template>
    <div>
       <div class="operateWrap">
           <div v-if="com.checkProd" class="buyCont buyStyle">
                <div class="itemList">
                    <div class="subitem">
                        <span>产品</span><span>301杭实善成</span><em>选择</em>
                    </div>
                </div>
            </div>
            <div class="codeMenu flex"  v-if="com.checkFilter">
                <span class="flex1" :class="{current:currentFilterIdx==index}" v-for="(filter,index) in com.checkFilter">{{filter.title}}</span>
            </div>
            <div class="operateList" v-for="(item,index) in list" @click="currentItemChecked=index">
                <span class="operateBut" :class="com.clickBtn.cls" v-show="currentItemChecked==index"><em>{{com.clickBtn.title}}</em></span>
                <h2>30101 焦煤投资策略组合1/产品名称</h2>
                <p>
                    <span class="code">{{item.code}}</span>
                    <span class="colorRed">{{item.status}}</span>
                    <span>{{type.type}}</span>
                    <span>持仓均价<em>4448.0</em></span>
                </p>
                <p>
                    <span>指令数量<em>12</em></span>
                    <span>已委托<em>12</em></span>
                    <span>已成交<em>12</em></span>
                </p>
            </div>
       </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                currentFilterIdx:0,

                type:3,

                list:[{
                    code:'IF1806',
                    status:'买入',
                    type:"投机"
                },{
                    code:'IF1806',
                    status:'买入',
                    type:"投机"
                },{
                    code:'IF1806',
                    status:'买入',
                    type:"投机"
                }],

                currentItemChecked:null
            }
        },
        methods:{
            itemClicked(item){

            }
        },
        mounted(){
        },
        props:['com']
    }
</script>
<style lang="less">

</style>
