
<template>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js登录到各平台。即用第三方账号登录软件，现在有很多软件在登录页面上都会有用第三方账号登录的入口，你可以在登录页面点击用QQ，微博或者微信账号登录，这里就可以调用我们的socialLogin方法，接口会返回第三方账号的用户昵称和头像地址以及三方平台返回的唯一标识。我们可以用返回的信息来登录该软件。</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="chooseImage()">示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/socialLogin.html"
            },
            chooseImage:function(){
                LightSDK.native.chooseImage({},function(data){
                    console.log(data);
                })
            }
        }
    }
</script>
<style lang="less">

</style>
