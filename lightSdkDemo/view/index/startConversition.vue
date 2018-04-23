
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js打开聊天室</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="viewOnlineApi flex-row"><text class="viewOnline" @click="startConversition()">打开聊天室</text></div>
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
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/chooseImage.html'})
            },
            startConversition:function(){
                LightSDK.native.startConversition({
                    "userId":"123123",
                    "userName":"测试321321",
                    "imgUrl":"http://xxxxx_imgUrl.png",
                    "targetUserId":"321321",
                    "targetUserName":"测试123123",
                    "conversitionType":"privateChat",
                    "RY_AppKey":"RY_AppKey",
                    "RY_AppSecret":"RY_AppSecret"
                },function(data){
                    alert(JSON.stringify(data));
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
