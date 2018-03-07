
<template>
    <div>
        <button-tab :buttons="buttons"></button-tab>
        <sub-view></sub-view>
    </div>
</template>
<script>
    import ButtonTab from "../../ui/button-tab.vue"
    export default {
        data(){
            return {
                buttons:[{
                    title:"买入",
                    path:"lay/outer/bs",
                    params:{type:1},
                },{
                    title:"卖出",
                    path:"lay/outer/bs",
                    params:{type:2},
                },{
                    title:"撤单",
                    path:"lay/order",
                    params:{type:1,from:"outer"},
                },{
                    title:"指令",
                    path:"lay/cmd",
                    params:{type:1,from:"outer"},
                },{
                    title:"持仓",
                    path:"lay/cmd",
                    params:{type:2,from:"outer"},
                }]
            }
        },
        components:{
            ButtonTab
        }
    }
</script>
<style lang="less">

</style>
