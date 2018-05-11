
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js修改导航栏透明度</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
            <lc-input label="透明度" v-model="opacity" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <div class="listWidth">
                <lc-button text="添加"
                    type="normal" 
                    @LcButtonClicked="setAlpha"></lc-button>
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
    import LcInput  from 'lighting-ui/packages/lc-input';
    import LcButton from 'lighting-ui/packages/lc-button';
    export default {
        data(){
            return {
                opacity:""
            }
        },
        components:{LcInput,LcButton},
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/genAndScan.html'})
            },
            setAlpha:function(){
                var that = this;
                LightSDK.native.setAlpha({
                    alpha:that.opacity
                },function(data){
                    that.Dialog.toast({
                        message: "修改成功",
                        duration: 2
                    });
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
