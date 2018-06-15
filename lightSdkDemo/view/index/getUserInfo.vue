
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js获取登录用户信息</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
            <lc-input label="用户ID" v-model="userInfo.uid" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="手机" v-model="userInfo.mobile" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="token" v-model="userInfo.token" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="昵称" v-model="userInfo.nickname" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="头像" v-model="userInfo.photoURL" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <div class="listWidth">
                <lc-button text="获取登录信息"
                    type="normal" 
                    @LcButtonClicked="getUserInfo"></lc-button>
             </div>
        </div>
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
                userInfo:{}
            }
        },
        components:{LcInput,LcButton},
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_getuserinfo.html'})
            },
            getUserInfo:function(){
                var that = this;
                LightSDK.native.userGetInfo(function(data){
                    weex.requireModule('modal').alert({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                    that.userInfo=data;
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
