
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js获取登录用户信息</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">获取用户信息示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"><em></em></em>
            <p><span class="buttonStyle" @click="getUserInfo()">确定</span></p>
            <p><span style="width:0.6rem">userid：</span><em>{{userInfo.uid}}</em></p> 
            <p><span style="width:0.6rem">mobile：</span><em>{{userInfo.mobile}}</em></p>
            <p><span style="width:0.7rem">token：</span><em>{{userInfo.token}}</em></p>
            <p><span style="width:0.7rem">nickname：</span><em>{{userInfo.nickname}}</em></p>
            <p><span style="width:1.2rem">headpic：</span><em>{{userInfo.photoURL}}</em></p>
            <p><span style="width:0.9rem">退出是否注销：</span><em>{{userInfo.logoutWhenExit?userInfo.logoutWhenExit:""}}</em></p>
            <p><span style="width:0.9rem">其他信息：</span><em>{{userInfo.extraInfo?userInfo.extraInfo:""}}</em></p>
            <p class="tips"><span>tips:</span>点击'确定'按钮后将会获取到用户的登录信息，需要先登录才能获取</p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                userInfo:{},
                ifshow:false
            }
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/userInfo.html#user-getInfo"
            },
            closed:function(){
                this.ifshow=false;
                this.userInfo={};
            },
            getUserInfo:function(){
                var that = this;
                LightSDK.native.getUserInfo(function(data){
                    that.userInfo=data.result;
                })
            }
        }
    }
</script>
<style lang="less">
</style>
