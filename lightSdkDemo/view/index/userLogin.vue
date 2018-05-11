
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js登录用户，用户通过后台接口登录后，接口会返回一些用户信息，比如用户ID，用户令牌token等。用这些返回的信息向native注册信息，以便后续使用。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
            <lc-input label="用户ID" v-model="uid" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="手机" v-model="mobile" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="token" v-model="token" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="昵称" v-model="nickname" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="头像" v-model="photoURL" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <div class="listWidth">
                <lc-button text="登录"
                    type="normal" 
                    @LcButtonClicked="userLogin"></lc-button>
             </div>
        </div>
        <div class="normalList"><text class="tipStyle">tips:{{tipsCont}}</text></div>
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
        components:{LcInput,LcButton},
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
