
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">当开发者开发的组件中使用到了 开放平台提供的行情、资讯等OpenAPI接口的时候，此接口帮助开发者管理和维护OpenAPI的token。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="viewOnlineApi flex-row mb30">
            <lc-button text="获取openApiToken"
                    type="normal" 
                    @LcButtonClicked="getToken"></lc-button>
            
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
            getToken:function(){
                var that = this;
                LightSDK.openAPI.token(function (params) {
                    if(params.err_no!='0'){
                        that.Dialog.toast({
                            message: params.err_info,
                            duration: 2
                        });
                        return false;
                    }

                  that.Dialog.toast({
                        message: params.data.access_token,
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
