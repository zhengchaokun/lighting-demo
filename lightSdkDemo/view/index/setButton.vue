
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js添加导航栏按钮，有时候我们需要在导航栏添加一些操作按钮，比如扫一扫、搜索等。就可以使用此方法。</text></div>
        <div><text class="detailHead">示例：</text></div>
        
        <div class="normalList"><text class="mr10 fs14 width70">按钮名称：</text><input v-model="title" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">icon地址：</text><input v-model="iconsrc" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="buttonStyle" @click="setButton()">添加</text></div>
        <div class="normalList"><text class="tipStyle">tips:{{tipsCont}}</text></div>
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
                iconsrc:"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3754198828,1208184486&fm=173&app=25&f=JPEG?w=218&h=146&s=C0A5925640B2CC795636C4C3020030BB",
                title:"",
                tipsCont:"点击'添加'按钮后，请注意导航栏新添了按钮，点击试试吧"
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_addbutton.html'})
            },
            a:function(){
                alert(444);
            },
            setButton:function(){
                var that = this;
                if(!that.title&&!that.iconsrc){
                    that.tipsCont="名称和icon图标地址必须选填一个";
                    return false;
                }
                var actionFunction = 'actionFunction_' + Math.floor(Math.random() * 1000);
                window[actionFunction] = that.a;
                LightSDK.native.addButton({
                    title:that.title,
                    icon:that.iconsrc,
                    action: "javascript:" + actionFunction + "();",
                    position:"right"
                },function(){
                    that.tipsCont="点击'添加'按钮后，请注意导航栏新添了按钮，点击试试吧";
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
