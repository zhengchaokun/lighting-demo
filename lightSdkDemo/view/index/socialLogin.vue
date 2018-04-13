
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js登录到各平台。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="mr10 fs14">平台类型：</text><input v-model="type" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="buttonStyle" @click="socialLogin()">登录</text></div>
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
            return {
                ifInstall:"--",
                type:"",
                tipsCont:"平台类型不能为空，只支持qq,weibo,weixin三个"
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/isAppInstalled.html'})
            },
            socialLogin:function(){
                var that = this;
                if(!that.type){
                    that.tipsCont="平台类型不能为空，请输入，只支持qq,weibo,weixin三个";
                    return false;
                }
                if(that.type!="qq"&&that.type!="weibo"&&that.type!="weixin"){
                    that.tipsCont="类型输入有误，请重新输入，只支持qq,weibo,weixin三个";
                    return false;
                }
                LightSDK.native.socialLogin({type:that.type},function(data){
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
