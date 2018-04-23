
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">当前用户添加标签</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="fs12 mr10">标签</text><input v-model="alias" class="inputStyle" type="text"/></div>
        <div class="normalList"><text class="buttonStyle" @click="addTags()">添加</text></div>
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
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/'})
            },
            addTags:function(){
                var that = this;
                LightSDK.native.addTags({
                    alias:that.alias
                },function(data){
                    alert(JSON.stringify(data));
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
