
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js控制是否隐藏状态栏</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
             <div class="listWidth mb30">
                <lc-button text="隐藏"
                    type="normal" 
                    @LcButtonClicked="statusBar(true)"></lc-button>
                    
             </div>
             <div class="listWidth">
                <lc-button text="显示"
                    type="normal" 
                    @LcButtonClicked="statusBar(false)"></lc-button>
             </div>
        </div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </div>
</template>
<script>
    import LightSDK from "light-sdk";
    import LcButton from 'lighting-ui/packages/lc-button';
    export default {
        data(){
            return {}
        },
        components:{LcButton},
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_setsystemstatusbar.html'})
            },
            statusBar:function(bool){
                LightSDK.native.setSystemStatusBar({
                    hidden:bool
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>
.normalList{
    justify-content:space-between;
    width:160px;
}
</style>
