
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过参数配置将程序中可以运行期控制、面向不同使用场景差异化的部分在平台管理起来，开发时可以使用平台提供的API，获取运行期的配置,调用此接口即可使用配置好的参数信息。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="viewOnlineApi flex-row mb30">
            <lc-button text="获取配置参数"
                    type="normal" 
                    @LcButtonClicked="getParams"></lc-button>
            
        </div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()"><text class="onlineLink">查看在线文档</text></div>
    </div>
</template>
<script>
    import LightSDK from "light-sdk";
    import LcButton from 'lighting-ui/packages/lc-button';
    export default {
        data(){
            return {}
        },
        components: {LcButton},
        methods:{
            getParams:function(){
                LightSDK.config.get(function (params) {
                    if(params.err_no!='0'){
                        that.Dialog.toast({
                            message: params.err_info,
                            duration: 2
                        });
                        return false;
                    }
                   weex.requireModule('modal').alert({
                        message: JSON.stringify(params.data),
                        duration: 2
                    });
                    //token
                });
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style lang="less">

</style>
