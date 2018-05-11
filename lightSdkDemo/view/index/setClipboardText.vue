
<template>
      <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">有时候在特定的环境下，为了方便，我们需要对页面中的内容进行复制到剪贴板，这样我们可以在其他的地方根据需要使用，比如我们经常在淘宝上复制订单编号来查询快递</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap flex-column">
            <div class="listWidth mb5"><lc-input placeholder="请输入要复制的内容"  v-model="copyValue"></lc-input></div>
            <div class="listWidth"><lc-button text="复制"
                    type="normal" 
                    @LcButtonClicked="setClipboardText"></lc-button></div>
        </div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </div>
</template>
<script>
    import LightSDK from "light-sdk";
    import App from "light";
    import LcInput  from 'lighting-ui/packages/lc-input';
    import LcButton from 'lighting-ui/packages/lc-button';
    import Dialog from '../../lib/dialog.js';
    export default {
        data(){
            return {
                copyValue:"",
                ifError:false,
                jumpShow:false
            }
        },
        components:{LcInput,LcButton},
        methods:{
            jump(view){
                App.navigate(view,{},{
                    replace:true
                })
            },
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_setclipboardcontent.html'})
            },
            setClipboardText:function(){
                var that = this;
                if(!that.copyValue){
                    that.Dialog.toast({
                        message: "内容不能为空",
                        duration: 2
                    });
                    return false;
                }
                
                LightSDK.native.setClipBoardContent({
                    value:that.copyValue
                },function(){
                   that.Dialog.toast({
                        message: "复制成功，去粘贴试试吧！",
                        duration: 2
                    });
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
