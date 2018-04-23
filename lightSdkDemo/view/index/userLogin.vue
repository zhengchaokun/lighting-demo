
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js登录用户，用户通过后台接口登录后，接口会返回一些用户信息，比如用户ID，用户令牌token等。用这些返回的信息向native注册信息，以便后续使用。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="mr10 fs14 width70">用户ID：</text><input v-model="uid" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">手机：</text><input v-model="mobile" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">token：</text><input v-model="token" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">昵称：</text><input v-model="nickname" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">头像：</text><input v-model="photoURL" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="buttonStyle" @click="userLogin()">登录</text></div>
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
            userLogin:function(){
                var that = this;
                if(!that.uid||!that.mobile||!that.token||!that.nickname||!that.photoURL){
                    that.tipsCont="请填写登录信息";
                    return false;
                }
                LightSDK.native.userLogin({
                    "uid":that.uid,
                    "mobile":that.mobile,
                    "token":that.token,
                    "nickname":that.nickname,
                    "photoURL":that.photoURL,
                    "logoutWhenExit":"true"
                },function(data){
                    that.tipsCont="登录成功";
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
