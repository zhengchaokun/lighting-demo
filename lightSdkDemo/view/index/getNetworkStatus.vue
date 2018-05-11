
<template>
    <div>
       <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js接口获取当前网络状态</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="viewOnlineApi flex-row"><text class="viewOnline" @click="getNetworkStatus()">获取网络状态</text></div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()"><text class="onlineLink">查看在线文档</text></div>
    </div>
    </div>
</template>
<script>
    import LightSDK from "light-sdk";
    var modal = weex.requireModule('modal')
    export default {
        data(){
            return {}
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_getnetworkstatus.html'})
            },
            getNetworkStatus:function(){
                var that = this;
                LightSDK.native.getNetworkStatus({},function(data){
                    that.Dialog.toast({
                        message: data.data.result,
                        duration: 2
                    });
                    
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
