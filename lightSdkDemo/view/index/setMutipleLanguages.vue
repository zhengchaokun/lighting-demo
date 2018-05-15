
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js接口设置多国语言</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text>测试</text><input class="inputStyle" type="text"/></div>
        <div class="normalList"><text class="buttonStyle" @click="setMutipleLanguages()">设置</text></div>
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
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_setmutiplelanguages.html'})
            },
            setMutipleLanguages:function(){
                LightSDK.native.setMutipleLanguages({
                    language:"en"
                },function(data){
                    weex.requireModule('modal').alert({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>
.inputStyle{
    border-style:solid;
    border-width:1px;
    border-color:#f5f5f5
}
</style>
