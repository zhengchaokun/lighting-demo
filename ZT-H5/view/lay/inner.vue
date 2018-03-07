
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
                    path:"",
                    selected:true
                },{
                    title:"卖出",
                    path:""
                },{
                    title:"撤单",
                    path:""
                },{
                    title:"指令",
                    path:""
                },{
                    title:"持仓",
                    path:""
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
