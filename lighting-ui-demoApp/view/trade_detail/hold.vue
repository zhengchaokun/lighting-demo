
<template>
    <div>
       <div class="align-center" style="margin-top: 120px;">
           <image src="images/holding_shares_empty.png" class="icon-empty"/>
           <text class="f-dark2 fs44 mt20">暂无记录</text>
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
            Light.trigger('tabChange', 4)
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .icon-empty{
        width: 240px;
        height: 240px;
    }
</style>