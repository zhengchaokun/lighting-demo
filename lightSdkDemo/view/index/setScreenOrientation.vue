
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js控制屏幕方向</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList">
            <text class="buttonStyle" @click="setScreenOrientation('landscape_left')">左横屏</text>
            <text class="buttonStyle" @click="setScreenOrientation('landscape_right')">右横屏</text>
            <text class="buttonStyle" @click="setScreenOrientation('portrait')">竖屏</text>
        </div>
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
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_setscreenorientation.html'})
            },
            setScreenOrientation:function(style){
                LightSDK.native.setScreenOrientation({
                    screenOrientation:style
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>
.buttonStyle{
    width:100px;
}
.normalList{
    justify-content:space-between;
    width:340px;
}
</style>
