
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js接口获取安全区域接口(适配iphoneX)</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="viewOnlineApi flex-row"><text class="viewOnline" @click="getSafeArea()">获取</text></div>
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
            return {}
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/genAndScan.html'})
            },
            getSafeArea:function(){
                LightSDK.native.getSafeArea({},function(data){
                    weex.requireModule('modal').alert({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
