
<template>
    <div>
       <div class="tabBar">
           <div class="flex-1 flex-row justify-center align-center pd10">
               <text>当日委托</text>
           </div>
           <div class="flex-1 flex-row justify-center align-center pd10">
               <text>当日成交</text>
           </div>
       </div>
    </div>
</template>
<script>
    import Light from 'light'
    export default {
        data(){
            return {}
        },
        mounted(){
            Light.trigger('tabChange', 3)
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .tabBar{
        position: fixed;
        left: 0;
        right: 0;
        height: 60px;
        flex-direction: row;
        align-items: center;
        background-color: #ffffff;
        border-bottom-width: 1px;
        border-bottom-color: #dddddd;
    }
</style>
