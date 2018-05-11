
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js设置登录用户信息</text></div>
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
                    @LcButtonClicked="setInfo"></lc-button>
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
