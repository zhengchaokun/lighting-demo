
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">当我们需要启用二维码的扫一扫功能时，可以使用此功能（类似于支付宝的扫一扫，微信的扫一扫），扫描成功后将会返回二维码的内容信息，我们可以根据需要对这些信息进行处理了。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="viewOnlineApi flex-row"><text class="viewOnline" @click="scanCode()">扫一扫</text></div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
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
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_scancode.html'})
            },
            scanCode:function(){
                LightSDK.native.scanCode({},function(data){
                    JSON.stringify(data);
                    var event = weex.requireModule('event');
                    event.openNative('web',{startPage:encodeURIComponent(data.data.result)});      //your code
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
