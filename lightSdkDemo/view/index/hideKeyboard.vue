
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">隐藏安全键盘</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="viewOnline" @click="hideKeyboard()">隐藏</text></div>
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
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_safekeyboard_hide.html'})
            },
            hideKeyboard:function(){
                var that = this;
                LightSDK.native.hideKeyboard({},function(data){
                    alert(JSON.stringify(data));
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
