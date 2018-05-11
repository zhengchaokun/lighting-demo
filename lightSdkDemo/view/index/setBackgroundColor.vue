
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js修改导航栏背景色</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
            <lc-input label="背景色" v-model="bgColor" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <div class="listWidth">
                <lc-button text="修改"
                    type="normal" 
                    @LcButtonClicked="setBackgroundColor"></lc-button>
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
                bgColor:"",
                tipsCont:"点击修改按钮后请注意导航栏背景色"
            }
        },
        components:{LcInput,LcButton},
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_setbackgroundcolor.html'})
            },
            setBackgroundColor:function(){
                var that = this;
                if(!that.bgColor){
                    that.tipsCont = "背景色必填";
                    return false;
                }
                LightSDK.native.setBackgroundColor({
                    color:that.bgColor
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
