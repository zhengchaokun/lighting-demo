
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js接口获取客户端版本信息</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="tipStyle">tips:点击'查询'按钮显示app的版本号</text></div>
        <div class="listWidth"><lc-button text="查询"
                    type="normal" 
                    @LcButtonClicked="getVersion"></lc-button></div>
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
                version:""
            }
        },
        components:{LcButton},
        methods:{
            getVersion:function(){
                var that = this;
                LightSDK.native.version({},function(data){
                    if(data.info.error_code!='0'){
                        that.Dialog.toast({
                            message: data.info.error_message,
                            duration: 2
                        });
                        return false;
                    }
                    weex.requireModule('modal').alert({
                        message: data.data.version,
                        duration: 2
                    });
                })
            },
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_version.html'})
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
