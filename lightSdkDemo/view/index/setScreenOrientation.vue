
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js控制屏幕方向</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
             <div class="listWidth mb30">
                <lc-button text="左横屏"
                    type="normal" 
                    @LcButtonClicked="setScreenOrientation('landscape_left')"></lc-button>
                    
             </div>
             <div class="listWidth mb30">
                <lc-button text="右横屏"
                    type="normal" 
                    @LcButtonClicked="setScreenOrientation('landscape_right')"></lc-button>
             </div>
             <div class="listWidth">
                <lc-button text="竖屏"
                    type="normal" 
                    @LcButtonClicked="setScreenOrientation('portrait')"></lc-button>
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
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_setscreenorientation.html'})
            },
            setScreenOrientation:function(style){
                LightSDK.native.setScreenOrientation({
                    screenOrientation:style
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>
.buttonStyle{
    width:100px;
}
.normalList{
    justify-content:space-between;
    width:340px;
}
</style>
