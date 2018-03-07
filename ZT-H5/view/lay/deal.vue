
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
                    path:"",
                    selected:true
                },{
                    title:"待处理",
                    path:""
                },{
                    title:"已确认",
                    path:""
                },{
                    title:"已作废",
                    path:""
                },{
                    title:"查询",
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
