
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
                    title:"新建",
                    path:"lay/contract/add/step1",
                },{
                    title:"查询",
                    path:"lay/contract/query/list",
                },{
                    title:"匹配指令",
                    path:"lay/contract/cmd/list",
                },{
                    title:"匹配成交",
                    path:"lay/contract/deal/list",
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
