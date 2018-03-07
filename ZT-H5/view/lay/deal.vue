
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
                    title:"未确认",
                    path:"lay/deal/list",
                    params:{type:1},
                },{
                    title:"待处理",
                    params:{type:2},
                    path:"lay/deal/list"
                },{
                    title:"已确认",
                    params:{type:3},
                    path:"lay/deal/list"
                },{
                    title:"已作废",
                    params:{type:4},
                    path:"lay/deal/list"
                },{
                    title:"查询",
                    path:"lay/deal/query"
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
