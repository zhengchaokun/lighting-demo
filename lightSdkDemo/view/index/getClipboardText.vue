
<template>
      <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">当剪切板中有内容时，我们就可以调用此方法捕获到剪切板的内容，比如当执行完上一条的复制内容至剪切板后，再调用此方法获取剪切板内容时，就可以获取到对应的内容</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap flex-column">
            <div class="listWidth mb5"><lc-input placeholder="点击粘贴按钮试试吧"  v-model="copyValue"></lc-input></div>
            <div class="listWidth"><lc-button text="粘贴"
                    type="normal" 
                    @LcButtonClicked="getClipBoardText"></lc-button></div>
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
    import Dialog from '../../lib/dialog.js';
    export default {
        data(){
            return {
                ifshow:false,
                copyValue:"",
                tipsCont:"点击'粘贴'按钮可以将剪切板中的内容填充到输入框"
            }
        },
        components:{LcInput,LcButton},
        methods:{
            toOnlineApi:function(){
                 var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_getclipboardcontent.html'})
            },
            getClipBoardText:function(){
                var that = this;
                LightSDK.native.getClipBoardContent({},function(data){
                        that.copyValue = data.data.result;
                        that.Dialog.toast({
                            message: "粘贴成功",
                            duration: 2
                        });
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
