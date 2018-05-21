
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js分享内容到各平台。使用此API可实现分享文字、图片、图文、音乐、视频、链接到微信、微博、钉钉、QQ等多个平台。调用 share 接口，模块会弹出可分享平台列表（可通过 config.xml 和 key.xml 文件配置信息自定义数量）菜单供用户选择分享。使用本模块需要到对应开发平台申请开发者账号，并创建应用获取对应分享的 Appkey</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="viewOnlineApi flex-row"><text class="viewOnline" @click="share()">分享内容</text></div>
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
            return {}
        },
        components:{LcInput,LcButton},
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/share.html'})
            },
            share:function(){
                var that = this;
                LightSDK.native.socialShare({
                    title:"light",
                    content:"light,让金融变简单",
                    url:"https://light.hscloud.cn/portal/index.html", //分享出去的链接打开后显示的地址
                    image:"https://passport.hscloud.cn/iuccasserver/statics/images/light.svg"//分享出去的图片地址
                },function(data){
                   
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
