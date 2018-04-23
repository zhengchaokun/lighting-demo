
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js接口清除H5异步加载的沙盒缓存。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="mr10 fs14 width70">组件ID：</text><input v-model="id" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="buttonStyle" @click="clearWidget()">清除</text></div>
        <div class="normalList"><text class="tipStyle">tips:{{tipsCont}}</text></div>
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
            return {
                id:"",
                tipsCont:"点击清除按钮将清除该组件的沙盒缓存"
            }
        },
        methods:{
            toOnlineApi:function(){
                 var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_clearwidget.html'})
            },
            clearWidget:function(){
                var that = this;
                LightSDK.native.clearWidget({
                    "widgetID":that.id  
                },function(data){
                    that.tipsCont = "清除成功";
                });
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
