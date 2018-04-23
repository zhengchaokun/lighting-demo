
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过JS向客户端传递推送alias，用于推送服务器定点推送</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text>alias:</text><input v-model="alias" class="inputStyle" type="text"/></div>
        <div class="normalList"><text class="buttonStyle" @click="pushSetAlias()">设置</text></div>
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
                alias:"1234"
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_setAlias.html'})
            },
            pushSetAlias:function(){
                var that = this;
                LightSDK.native.pushSetAlias({
                    alias:that.alias
                },function(data){
                    JSON.stringify(data);
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
