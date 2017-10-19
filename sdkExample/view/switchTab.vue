
<template>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js接口在网页中切换底部tab。根据传入接口的index值，来打开相应的webview窗口。（index值所对应的webview由native设定）</div>
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
                location.href="https://document.lightyy.com/termAPI/switchTab.html"
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
