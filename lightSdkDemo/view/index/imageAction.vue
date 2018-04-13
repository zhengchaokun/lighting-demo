
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">看到一张想要保存的图片，我们想通过点击或者长按图片将图片保存到本地相册中，就可以使用此方法实现</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><image @click="saveImage()" class="imgSize" :src="imgsrc"></image></div>
        <div class="ml20"><text class="tipStyle">tips:{{tipsCont}}</text></div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </div>
</template>
<script>
    import LightSDK from "light-sdk";
    export default {
        data(){
            return {
                tipsCont:"点击图片后保存到本地相册中",
                imgsrc:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502080755380&di=038b685eaf4c6b40f50994cbc2a01a42&imgtype=0&src=http%3A%2F%2Fimg01.taopic.com%2F150704%2F240499-150F40QS335.jpg"
            }
        },
        methods:{
            saveImage:function(){
                var that = this;
                LightSDK.native.imageAction({
                    image:that.imgsrc
                },function(data){
                    that.tipsCont="保存成功";
                    console.log(data);//your code
                })
            },
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_imageaction.html'})
            }
            
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
