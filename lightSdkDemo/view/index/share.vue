
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js分享内容到各平台。使用此API可实现分享文字、图片、图文、音乐、视频、链接到微信、微博、钉钉、QQ等多个平台。调用 share 接口，模块会弹出可分享平台列表（可通过 config.xml 和 key.xml 文件配置信息自定义数量）菜单供用户选择分享。使用本模块需要到对应开发平台申请开发者账号，并创建应用获取对应分享的 Appkey</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap flex-column">
            <div class="listWidth mb5"><lc-input label="标题" v-model="title"></lc-input></div>
            <div class="listWidth mb5"><lc-input label="内容" :has-top-border="false" v-model="content"></lc-input></div>
            <div class="listWidth mb5"><lc-input label="图片地址" :has-top-border="false" v-model="imgsrc"></lc-input></div>
            <div class="listWidth mb5"><lc-input label="链接地址" :has-top-border="false" v-model="url"></lc-input></div>
            <div class="listWidth"><lc-button text="分享"
                    type="normal" 
                    @LcButtonClicked="share"></lc-button></div>
        </div>
        <div class="normalList"><text class="tipStyle">tips:{{tipsCont}}</text></div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </div>
</template>
<script>
    import LightSDK from "light-sdk";
    import LcInput  from 'lighting-ui/packages/lc-input';
    import LcButton from 'lighting-ui/packages/lc-button';
    export default {
        data(){
            return {
                tipsCont:"请填写要分享的内容，其中标题，图片地址，链接地址为必填",
                title:"",
                content:"",
                imgsrc:"",
                url:""
            }
        },
        components:{LcInput,LcButton},
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/share.html'})
            },
            share:function(){
                var that = this;
                if(!that.title||!that.url||!that.imgsrc){
                    that.tipsCont="标题，图片地址，url地址不能为空";
                    return false;
                }
                LightSDK.native.socialShare({
                    title:that.title,
                    content:that.content,
                    url:that.url, //分享出去的链接打开后显示的地址
                    image:that.imgsrc//分享出去的图片地址
                },function(data){
                    that.tipsCont="请填写要分享的内容，标题，图片地址，url地址为必填";
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
