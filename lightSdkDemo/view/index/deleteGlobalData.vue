
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">在某些情况下需要删除已存储在本地的属性，比如个人中心已登录状态下击退出登录按钮的时候，需要删除登录的时候已经写在本地的数据。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="mr10 fs14">属性名：</text><input v-model="jsonName" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="buttonStyle" @click="deleteData()">删除</text></div>
        <div class="normalList"><text class="tipStyle">tips:{{tipsCont}}</text></div>
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
                tipsCont:"请输入要删除的属性的名称"
            }
        },
        methods:{
            toOnlineApi:function(){
                 var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_deletedata.html'})
            },
            deleteData:function(){
                var that = this;
                if(!that.jsonName){
                    that.tipsCont = "属性名不能为空";
                    return false;
                }
                LightSDK.native.deleteData({
                    key:that.jsonName
                },function(data){
                    that.tipsCont = "删除成功！";
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
