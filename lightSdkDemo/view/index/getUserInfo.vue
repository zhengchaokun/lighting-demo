
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js获取登录用户信息</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="buttonStyle" @click="getUserInfo()">获取</text></div>
        <div class="normalList"><text class="mr10 fs14 width70">用户ID：</text><input v-model="userInfo.uid" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">手机：</text><input v-model="userInfo.mobile" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">token：</text><input v-model="userInfo.token" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">昵称：</text><input v-model="userInfo.nickname" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">头像：</text><input v-model="userInfo.photoURL" class="inputStyle" type="text" placeholder=""/></div>
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
                userInfo:{}
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_getuserinfo.html'})
            },
            getUserInfo:function(){
                var that = this;
                LightSDK.native.getUserInfo(function(data){
                    that.userInfo=data;
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
