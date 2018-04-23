
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js获取是否含有手势或指纹验证信息</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="tipStyle">tips:点击'确定'按钮获取是否含有手势或指纹验证信息</text></div>
        <div class="normalList"><image class="imageStyle" @click="type=0" :src="type==0?selectsrc:normalsrc"></image><text>手势</text></div>
        <div class="normalList"><image class="imageStyle" @click="type=1" :src="type==1?selectsrc:normalsrc"></image><text>指纹</text></div>
        <div class="normalList"><text class="buttonStyle" @click="preVerifyOpeation()">确定</text></div>
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
                type:0,
                normalsrc:"images/normal.jpg",
                selectsrc:"images/select.jpg",
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/genAndScan.html'})
            },
            preVerifyOpeation:function(){
                var that = this;
                LightSDK.native.preVerifyOpeation({
                    verifyType:that.type==0?'GL':'FP'
                },function(data){
                    alert(JSON.stringify(data));
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>
.normalList{
    justify-content:space-between;
    width:120px;
}
.imageStyle{
    width:35px;
    height:35px;
    margin-right:10px;
}
</style>
