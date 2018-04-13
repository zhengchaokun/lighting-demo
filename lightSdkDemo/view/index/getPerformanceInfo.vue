
<template>
    <div>
       <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">获取页面性能数据</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="viewOnlineApi flex-row"><text class="viewOnline" @click="getPerformanceInfo()">获取性能信息</text></div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()"><text class="onlineLink">查看在线文档</text></div>
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
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_getperformanceinfo.html'})
            },
            getPerformanceInfo:function(){
                LightSDK.native.getPerformanceInfo(function(data){
                    alert(JSON.stringify(data));
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
