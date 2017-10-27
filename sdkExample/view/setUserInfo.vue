
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js设置登录用户信息,即修改用户信息</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">示例</span></div>
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
            <p><span class="w50">其他：</span><input placeholder="属性名" style="width:0.6rem" v-model="extraName" class="inputStyle" type="text">：<input placeholder="属性值" style="width:0.6rem" v-model="extraValue" class="inputStyle" type="text"></p>
            <p><span class="buttonStyle" @click="setUserInfo()">确定</span></p>
            <p class="tips"><span>tips:</span>{{tipsCont}}</p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                uid:"",
                mobile:"",
                token:"",
                nickname:"",
                photoURL:"",
                extraValue:"",
                extraName:"",
                tipsCont:"点击确定'按钮'后将会重新设置用户的登录信息",
                ifshow:false
            }
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/userInfo.html"
            },
            closed:function(){
                this.ifshow=false;
                this.tipsCont="点击确定'按钮'后将会重新设置用户的登录信息"
            },
            setUserInfo:function(){
                var that = this;
                var extraInfo = {};
                extraInfo[that.extraName]=that.extraValue;
                LightSDK.native.setUserInfo({
                    "uid":that.uid,
                    "mobile":that.mobile,
                    "token":that.token,
                    "nickname":that.nickname,
                    "photoURL":that.photoURL,
                    "logoutWhenExit":"false",
                    "extraInfo":extraInfo
                },function(data){
                    that.tipsCont="设置成功，你可以去获取用户信息验证下设置的内容"
                })
            }
        }
    }
</script>
<style lang="less">

</style>
