
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js登录到各平台。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap flex-column">
            <lc-radio :list="list" :config="config"
                 @LcRadioListChecked="LcRadioListChecked"></lc-radio>
            <div class="listWidth"><lc-button text="登录"
                    type="normal" 
                    @LcButtonClicked="socialLogin"></lc-button></div>
        </div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </div>
</template>
<script>
    import LightSDK from "light-sdk";
    import LcInput  from 'lighting-ui/packages/lc-input';
    import LcButton from 'lighting-ui/packages/lc-button';
    import LcRadio from 'lighting-ui/packages/lc-radio';
    export default {
        data(){
            return {
                list:[
                    { title: 'QQ', value: "qq", },
                    { title: '微信', value:"weixin" ,checked: true},
                    { title: '微博', value:"weibo" }
                ],
                type:"",
                 config: {
                    checkedColor: '#f63031',
                    checkedIcon: ''
                },
                checkedInfo:{ title: '微信', value:"weixin", oldIndex: -1, index: 1 }
            }
        },
        components:{LcInput,LcButton,LcRadio},
        methods:{
            LcRadioListChecked (e) {
                this.checkedInfo = e;
            },
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/isAppInstalled.html'})
            },
            socialLogin:function(){
                var that = this;
                LightSDK.native.socialLogin({type:that.checkedInfo.value},function(data){
                    // if(data.info.error_code!='0'){
                    //     that.Dialog.toast({
                    //         message: data.info.error_message,
                    //         duration: 2
                    //     });
                    //     return false;
                    // }
                    that.Dialog.toast({
                        message: data.data.result.userName+"，您已成功登录"+that.checkedInfo.value,
                        duration: 2
                    });
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
