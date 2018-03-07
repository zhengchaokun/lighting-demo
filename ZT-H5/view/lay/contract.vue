
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
                    path:"lay/contract/add",
                },{
                    title:"查询",
                    path:"lay/contract/query",
                },{
                    title:"匹配指令",
                    path:"lay/contract/cmd",
                    params:{type:1},
                },{
                    title:"匹配成交",
                    path:"lay/contract/cmd",
                    params:{type:2},
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
