
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js接口在native中发送广播</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="mr10 fs14 width70">广播内容：</text><input v-model="content" class="inputStyle" type="text"/></div>
        <div class="normalList"><text class="buttonStyle" @click="sendContentBroadcast()">确定</text></div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()"><text class="onlineLink">查看在线文档</text></div>
    </div>
</template>
<script>
    import LightSDK from "light-sdk";
    export default {
        data(){
            return {
                content:""
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_sendcontentbroadcast.html'})
            },
            sendContentBroadcast:function(){
                var that = this;
                LightSDK.native.sendContentBroadcast({
                    content:that.content,
                    action:""
                },function(data){
                    weex.requireModule('modal').alert({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
