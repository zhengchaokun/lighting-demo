
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">删除自选股</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="fs12 mr10">股票代码</text><input v-model="stockCode" class="inputStyle" type="text"/></div>
        <div class="normalList"><text class="fs12 mr10">市场代码</text><input v-model="codeType" class="inputStyle" type="text"/></div>
        <div class="normalList"><text class="buttonStyle" @click="mystockDelete()">删除</text></div>
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
                stockCode:"600570",
                codeType:"XSHG"
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_mtstockdelete.html'})
            },
            mystockDelete:function(){
                var that = this;
                LightSDK.native.mystockDelete({
                    stockCode:that.stockCode,
                    codeType:that.codeType
                },function(data){
                    alert(JSON.stringify(data));
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
