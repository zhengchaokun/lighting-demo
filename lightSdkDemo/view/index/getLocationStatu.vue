
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">获取当前是否可获取定位状态</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="viewOnline" @click="getLocationStatus()">获取</text></div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()"><text class="onlineLink">查看在线文档</text></div>
    </div>
</template>
<script>
    import LightSDK from "light-sdk";
    export default {
        data(){
            return {}
        },
        methods:{
            getLocationStatus:function(){
                var that = this;
                LightSDK.native.getLocationStatus({},function(data){
                    that.Dialog.toast({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                });
            },
            toOnlineApi:function(){
                 var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/chooseImage.html'})
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
