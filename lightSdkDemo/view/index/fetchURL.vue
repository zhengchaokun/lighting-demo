
<template>
      <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">经常我们在做开发的时候会遇到需要某个url地址中的某段内容时，就可以使用这个方法，比如我们现在需要恒生官网中的title标签中的内容，这时我们就可以使用这个方法来取到http://www.hundsun.com/的内容，从而拿到title的值。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList flex-row mb5"><text class="mr10">url:</text><input v-model="url" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList flex-row mb5"><text class="fs12 mr10">标题:</text><text class="fs12">{{title}}</text></div>
        <div class="normalList flex-row mb5"> <text class="buttonStyle mr10" @click="getTitle()">获取</text><text class="tipStyle">  (tips:{{tipsCont}})</text></div>
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
                url:"http://www.hundsun.com/",
                tipsCont:"点击获取后将会展示对应的标题信息",
                title:""
            }
        },
        methods:{
            toOnlineApi:function(){
                 var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_fetchurl.html'})
            },
            getTitle:function(){
                var that = this;
                if(!that.url){
                    that.tipsCont="请先输入url";
                    return false;
                }
                LightSDK.native.fetchURL({
                    url:that.url
                },function(data){
                    that.tipsCont="点击获取后将会展示对应的标题信息";
                    var content = data.data.result;
                    var outTit = content.substring(content.indexOf("<title>")+7,content.indexOf("</title>"))
                    if(outTit){
                        that.title=outTit
                    }else {
                        that.title=that.url;
                    }
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
