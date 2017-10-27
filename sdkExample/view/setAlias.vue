
<template>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过JS向客户端传递推送alias，用于推送服务器定点推送。从上一条的getRegistrationID方法中我们拿到了RegistrationID，通过这个ID我们可以从后台接口中拿到一个唯一的别名alias，然后把这个别名作为入参传给设置推送的接口setAlias，这样我们就完成了推送的设置。</div>
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
                location.href="https://document.lightyy.com/termAPI/chooseImage.html"
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
