
<template>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">此方法可以调用手机的拍照和从相册中选取照片功能，拍照或者选图成功后会返回此图片的编码信息供开发者使用，返回的图片编码格式有base64编码和二进制编码字符串（开发者可按需使用）</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="chooseImage()">图片选择示例</span></div>
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
