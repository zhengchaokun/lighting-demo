
<template>
      <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">经常我们在做开发的时候会遇到需要某个url地址中的某段内容时，就可以使用这个方法，比如我们现在需要恒生官网中的title标签中的内容，这时我们就可以使用这个方法来取到http://www.hundsun.com/的内容，从而拿到title的值。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap flex-column">
            <div class="listWidth"><lc-button text="获取标题内容"
                    type="normal" 
                    @LcButtonClicked="getTitle"></lc-button></div>
            <lc-input label="url" 
            v-model="url" 
            placeholder="" 
            :has-top-border="false"
            :has-bottom-border="false">
            </lc-input>
            <lc-input label="标题" 
            v-model="title" 
            placeholder="点击获取按钮试试吧" 
            :has-top-border="false"
            :has-bottom-border="false">
            </lc-input>
            
        </div>   
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
    import Dialog from '../../lib/dialog.js';
    export default {
        data(){
            return {
                url:"http://www.hundsun.com/",
                title:""
            }
        },
        components:{LcInput,LcButton},
        methods:{
            toOnlineApi:function(){
                 var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_fetchurl.html'})
            },
            getTitle:function(){
                var that = this;
                if(!that.url){
                    Dialog.tips("请先输入url");
                    return false;
                }
                LightSDK.native.fetchURL({
                    url:that.url
                },function(data){
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
