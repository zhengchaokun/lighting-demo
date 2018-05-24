
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js判断各个平台app在设备上是否已安装。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
            <lc-radio :list="list" :config="config"
                 @LcRadioListChecked="LcRadioListChecked"></lc-radio>
             <div class="listWidth">
                <lc-button text="查询"
                    type="normal" 
                    @LcButtonClicked="isAppInstalled"></lc-button>
             </div>
             <lc-input label="是否安装" v-model="ifInstall" placeholder="--" :has-top-border="false" :has-bottom-border="false"></lc-input>
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
                ifInstall:"",
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
            isAppInstalled:function(){
                var that = this;
                LightSDK.native.socialAppInstalled({type:that.checkedInfo.value},function(data){
                    if(data.info.error_code!='0'){
                        that.Dialog.toast({
                            message: data.info.error_message,
                            duration: 2
                        });
                        return false;
                    }
                    that.ifInstall = data.data.status; 
                    that.Dialog.toast({
                        message: data.data.status?"已安装":"未安装",
                        duration: 2
                    });
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
