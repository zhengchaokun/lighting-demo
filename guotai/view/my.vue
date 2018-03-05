
<template>
    <div>
        <scroller>
            <image src="images/my.jpg" style="width:750px; height:1200px;"></image>
        </scroller> 
    </div>
</template>
<script>
    import LightSDK from 'light-sdk';
    export default {
        data(){
            return {}
        },
        mounted(){
            LightSDK.native.setTitle({title:'我的资产'})
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
</style>
