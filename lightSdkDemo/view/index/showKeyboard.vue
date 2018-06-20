
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">打开关闭安全键盘</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="viewOnline" @click="showKeyboard()">打开安全键盘</text></div>
        <div class="normalList mb30"><text class="viewOnline" @click="hideKeyboard()">隐藏安全键盘</text></div>

        <div class="normalList"><text class="viewOnline" @click="showtradeKeyboard()">打开交易键盘</text></div>
        <div class="normalList"><text class="viewOnline" @click="hidetradeKeyboard()">隐藏交易键盘</text></div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
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
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_safekeyboard_show.html'})
            },
            showtradeKeyboard:function(){
                var that = this;
                LightSDK.native.tradekeyboardShow({
                    "type" : 'price',
                    "buttons" :["button1","button2","button3"],
                    "describe" :"键盘描述"
                },function(data){
                    if(data.info.error_code!='0'){
                        that.Dialog.toast({
                            message: data.info.error_message,
                            duration: 2
                        });
                        return false;
                    }
                })
            },
            hidetradeKeyboard:function(){
                var that = this;
                LightSDK.native.tradekeyboardHide({},function(data){
                })
            },
            hideKeyboard:function(){
                var that = this;
                LightSDK.native.safekeyboardHide({},function(data){
                })
            },
            showKeyboard:function(){
                var that = this;
                LightSDK.native.safekeyboardShow({
                    "textShow" :"InstantAsterisk",  
                    "disorder" :"numberAndAlpha",  
                    "pressEffect" :"default",
                    "keyboardType" :"alpha",
                    "maxLength" : 11,
                    "encryptMode" :"MD5",
                    "titleText" :"adasdasd"
                },function(data){
                    if(data.info.error_code!='0'){
                        that.Dialog.toast({
                            message: data.info.error_message,
                            duration: 2
                        });
                        return false;
                    }
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
