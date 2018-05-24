
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">当前用户删除标签</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="fs12 mr10">标签</text><input v-model="alias" class="inputStyle" type="text"/></div>
        <div class="normalList"><text class="buttonStyle" @click="deleteTags()">删除</text></div>
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
                alias:['tag1']
            }
        },
        methods:{
            toOnlineApi:function(){
                 var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/genAndScan.html'})
            },
            deleteTags:function(){
                var that = this;
                LightSDK.native.pushDeleteTags({
                    alias:that.alias
                },function(data){
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
