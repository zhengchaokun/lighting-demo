
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">获取设备唯一标识码。由native生成的来唯一标识设备的标志码。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="tipStyle">tips:点击'查询'按钮显示设备的唯一标识码UDID</text></div>
        <div class="listWidth"><lc-button text="查询"
                    type="normal" 
                    @LcButtonClicked="getUDID"></lc-button></div>
        <div class="normalList">{{udid}}</div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </div>
</template>
<script>
    import LightSDK from "light-sdk";
    import LcButton from 'lighting-ui/packages/lc-button';
    export default {
        data(){
            return {
                udid:""
            }
        },
        components:{LcButton},
        methods:{
            getUDID:function(){
                var that = this;
                LightSDK.native.getUDID({},function(data){
                    that.udid = data.data.UDID;
                })
            },
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_getudid.html'})
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
