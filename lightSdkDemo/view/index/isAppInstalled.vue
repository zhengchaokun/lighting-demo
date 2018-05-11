
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js判断各个平台app在设备上是否已安装。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
            <lc-input label="平台类型" v-model="type" placeholder="qq、weixin、weibo（任填一个）" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="是否安装" v-model="ifInstall" placeholder="--" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <div class="listWidth">
                <lc-button text="查询"
                    type="normal" 
                    @LcButtonClicked="isAppInstalled"></lc-button>
             </div>
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
                ifInstall:"",
                type:"",
                tipsCont:"根据平台类型查询app是否已安装，true表示已安装 false表示没安装，目前类型只支持qq，weibo，weixin三个"
            }
        },
        components:{LcInput,LcButton},
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/isAppInstalled.html'})
            },
            isAppInstalled:function(){
                var that = this;
                if(!that.type){
                    that.tipsCont="平台类型不能为空，请输入，只支持qq,weibo,weixin三个";
                    return false;
                }
                if(that.type!="qq"&&that.type!="weibo"&&that.type!="weixin"){
                    that.tipsCont="类型输入有误，请重新输入，只支持qq,weibo,weixin三个";
                    return false;
                }
                LightSDK.native.isAppInstalled({type:that.type},function(data){
                    that.ifInstall = data.data.status; 
                    that.tipsCont="根据平台类型查询app是否已安装，true表示已安装 false表示没安装，目前类型只支持qq，weibo，weixin三个";
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
