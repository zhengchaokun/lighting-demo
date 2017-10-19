
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js登录用户，用户通过后台接口登录后，接口会返回一些用户信息，比如用户ID，用户令牌token等。用这些返回的信息向native注册信息，以便后续使用。</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">用户登录示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span class="w50">用户id：</span><input v-model="uid" class="inputStyle" type="text" placeholder=""></p> 
            <p><span class="w50">手机：</span><input v-model="mobile" class="inputStyle" type="text" placeholder=""></p>
            <p><span class="w50">token：</span><input v-model="token" class="inputStyle" type="text" placeholder=""></p>
            <p><span class="w50">昵称：</span><input v-model="nickname" class="inputStyle" type="text" placeholder=""></p>
            <p><span class="w50">头像：</span><input v-model="photoURL" class="inputStyle" type="text" placeholder=""></p>
            <p><span class="buttonStyle" @click="userLogin()">登录</span></p>
            <p :class="{'colorRed':ifError==true,'tips':ifError==false}"><span>tips:</span>{{tipsCont}}</p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                ifError:false,
                ifshow:false,
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
                location.href="https://document.lightyy.com/termAPI/userLogin.html"
            },
            closed:function(){
                this.ifshow=false;
                this.tipsCont="为了方便测试，我们这里的用户登录信息手动输入"
            },
            userLogin:function(){
                var that = this;
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
<style lang="less">

</style>
