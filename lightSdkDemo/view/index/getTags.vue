
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">获取当前用户的所有标签</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="fs12 mr10">标签</text><input v-model="alias" class="inputStyle" type="text"/></div>
        <div class="normalList"><text class="buttonStyle" @click="getTags()">查询</text></div>
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
                alias:["tag1","tag2"]
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/genAndScan.html'})
            },
            getTags:function(){
                var that = this;
                LightSDK.native.getTags({},function(data){
                    that.Dialog.toast({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                    that.alias = (data.data.tags).join(",");
                    
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
