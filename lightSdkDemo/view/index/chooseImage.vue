
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">此方法可以调用手机的拍照和从相册中选取照片功能，拍照或者选图成功后会返回此图片的编码信息供开发者使用，返回的图片编码格式是base64编码</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="viewOnlineApi flex-row mb30">
            <lc-button text="拍照"
                    type="normal" 
                    @LcButtonClicked="chooseImage"></lc-button>
            
        </div>
        <div class="normalList"><image @click="saveImage()" class="imgSize" :src="imgsrc"></image></div>
        <!--<div class="ml20"><text class="tipStyle">点击图片可保存到本地相册中</text></div>-->
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()"><text class="onlineLink">查看在线文档</text></div>
    </div>
</template>
<script>
    import LightSDK from "light-sdk";
    import LcButton from 'lighting-ui/packages/lc-button';
    export default {
        data(){
            return {
                imgsrc:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502080755380&di=038b685eaf4c6b40f50994cbc2a01a42&imgtype=0&src=http%3A%2F%2Fimg01.taopic.com%2F150704%2F240499-150F40QS335.jpg"
            }
        },
        components: {LcButton},
        methods:{
            toOnlineApi:function(){
                 var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_chooseimage.html'})
            },
            saveImage:function(){
                var that = this;
                LightSDK.native.imageAction({
                    image:that.imgsrc
                },function(data){
                    that.tipsCont="保存成功";
                    console.log(data);//your code
                })
            },
            chooseImage:function(){
                var that = this;
                LightSDK.native.chooseImage({
                    "imagePickType":"CAMERA_MUTIL-ALBUM"
                },function(data){
                    if(data.info.error_code!='0'){
                        that.Dialog.toast({
                            message: data.info.error_message,
                            duration: 2
                        });
                        return false;
                    }

                    that.imgsrc = "data:image/png;base64,"+data.data.result
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
