
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js设置登录用户信息</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="mr10 fs14 width70">用户ID：</text><input v-model="uid" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">手机：</text><input v-model="mobile" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">token：</text><input v-model="token" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">昵称：</text><input v-model="nickname" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">头像：</text><input v-model="photoURL" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="buttonStyle" @click="setInfo()">登录</text></div>
        <div class="normalList"><text class="tipStyle">tips:{{tipsCont}}</text></div>
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
                uid:"",
                mobile:"",
                token:"",
                nickname:"",
                photoURL:"",
                tipsCont:"为了方便测试，我们这里的用户登录信息手动输入"
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/userLogin.html'})
            },
            setInfo:function(){
                var that = this;
                if(!that.uid||!that.mobile||!that.token||!that.nickname||!that.photoURL){
                    that.tipsCont="请填写登录信息";
                    return false;
                }
                LightSDK.native.setInfo({
                    "uid":that.uid,
                    "mobile":that.mobile,
                    "token":that.token,
                    "nickname":that.nickname,
                    "photoURL":that.photoURL,
                    "logoutWhenExit":"true"
                },function(data){
                    that.tipsCont="设置成功";
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
