
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js设置屏幕可旋转的方向</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><image class="imageStyle" @click="select('left')" :src="left==0?normalsrc:selectsrc"></image><text>左横屏</text></div>
        <div class="normalList"><image class="imageStyle" @click="select('right')" :src="right==0?normalsrc:selectsrc"></image><text>右横屏</text></div>
        <div class="normalList"><image class="imageStyle" @click="select('vertical')" :src="vertical==0?normalsrc:selectsrc"></image><text>竖    屏</text></div>
        <div class="normalList"><text class="buttonStyle" @click="setSupportScreenOrientation()">设置</text></div>
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
                normalsrc:"images/normal.jpg",
                selectsrc:"images/select.jpg",
                left:0,
                right:0,
                vertical:0
            }
        },
        methods:{
            select:function(type){
                var that = this;
                switch(type){
                    case 'left':
                        if(that.left==0){
                            that.left=1;
                        }else{
                            that.left=0
                        };
                    break;
                    case 'right':
                        if(that.right==0){
                            that.right=1;
                        }else{
                            that.right=0
                        };
                    break;
                    case 'vertical':
                        if(that.vertical==0){
                            that.vertical=1;
                        }else{
                            that.vertical=0
                        };
                    break;
                }
            },
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_setsupportscreenorientation.html'})
            },
            setSupportScreenOrientation:function(){
                var that = this;
                var typeArray = [];
                if(that.left==1){
                    typeArray.push("landscape_left");
                }
                if(that.right==1){
                    typeArray.push("landscape_right");
                }
                if(that.vertical==1){
                    typeArray.push("portrait");
                }
                LightSDK.native.setSupportScreenOrientation({
                    supportScreenOrientation:typeArray
                },function(){

                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>
.normalList{
    justify-content:space-between;
    width:150px;
}
.imageStyle{
    width:35px;
    height:35px;
    margin-right:10px;
}
</style>
