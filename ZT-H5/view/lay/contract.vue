
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
                    path:"",
                    selected:true
                },{
                    title:"查询",
                    path:""
                },{
                    title:"匹配指令",
                    path:""
                },{
                    title:"匹配成交",
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
