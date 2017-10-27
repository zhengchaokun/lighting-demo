
<template>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过JS获取推送registrationID。经常我们在手机上会收到app发来的消息通知，需要用到getRegistrationID ，通过从native拿到的getRegistrationID来设置后续的操作，见下一条的setAlias</div>
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
                location.href="https://document.lightyy.com/termAPI/setAlias.html"
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
