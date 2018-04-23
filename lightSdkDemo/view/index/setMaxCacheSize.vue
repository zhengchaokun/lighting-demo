
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">设置沙盒缓存最大值</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="mr10 fs14 width70">最大值：</text><input v-model="maxSize" class="inputStyle" type="text"/></div>
        <div class="normalList"><text class="buttonStyle" @click="setMaxCacheSize()">确定</text></div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()"><text class="onlineLink">查看在线文档</text></div>
    </div>
</template>
<script>
    import LightSDK from "light-sdk";
    export default {
        data(){
            return {
                maxSize:1024
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_setmaxcachesize.html'})
            },
            setMaxCacheSize:function(){
                var that = this;
                LightSDK.native.setMaxCacheSize({
                    maxCacheSize:that.maxSize
                },function(data){
                    alert(JSON.stringify(data.data.result));
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
