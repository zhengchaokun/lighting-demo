
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js接口查询存储在本地的属性</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="mr10 fs14">属性名：</text><input v-model="jsonName" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="buttonStyle" @click="readData()">读取</text></div>
        <div class="normalList"><text class="mr10 fs14">属性值：</text><input v-model="jsonvalue" class="inputStyle" type="text" placeholder=""/></div>
        <div class="ml20"><text class="tipStyle">tips:{{tipsCont}}</text></div>
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
                jsonName:"",
                jsonvalue:"",
                tipsCont:"点击'查询'按钮后存储在本地的'属性名'对应的值会填充到下方'属性值'的输入框"
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_readdata.html'})
            },
            readData:function(){
                var that = this;
                if(!that.jsonName){
                    that.tipsCont = "属性名不能为空！";
                    return false;
                }
                
                LightSDK.native.readData({
                    key:that.jsonName,
                },function(data){
                    alert(JSON.stringify(data));
                    that.jsonvalue = data.data.result;
                    that.tipsCont = "点击'查询'按钮后存储在本地的'属性名'对应的值会填充到下方'属性值'的输入框"
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
