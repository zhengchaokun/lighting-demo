
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">当有些数据需要多次使用的时候，我们可以把这些数据存到本地，需要使用的时候再从本地读取这些已存的数据（见下面从本地读取数据），比如账户的用户名、密码等信息。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
             <div class="normalList"><text class="mr10 fs14">属性名：</text><input v-model="jsonName" class="inputStyle" type="text" placeholder=""/></div>
             <div class="normalList"><text class="mr10 fs14">属性值：</text><input v-model="jsonvalue" class="inputStyle" type="text" placeholder=""/></div>
             <div class="normalList"><text class="buttonStyle" @click="writeData()">保存</text></div>
             <div class="ml20"><text class="tipStyle">tips:{{tipsCont}}</text></div>
             <div class="ml20" v-if="jumpShow==true"><text class="toCheck" @click="jump('index/readGlobalData')">去读取数据</text></div>
        </div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </div>
</template>
<script>
    import App from "light";
    import LightSDK from "light-sdk";
    export default {
        data(){
            return {
                tipsCont:"请输入要保存的属性名称/值对",
                jsonName:"",
                jsonvalue:"",
                jumpShow:false
            }
        },
        methods:{
            jump(view){
                App.navigate(view)
            },
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_writedata.html'})
            },
            writeData:function(){
                var that = this;
                var jsonObj = {};//要保存到本地的数据
                if(!that.jsonName||!that.jsonvalue){
                    that.ifError = true;
                    that.tipsCont = "属性名称或值不能为空！";
                    return false;
                }
                jsonObj[that.jsonName] = that.jsonvalue;
                LightSDK.native.writeData({
                    name:"34"
                },function(data){
                    that.tipsCont = "保存成功，现在去读取数据试试吧！";
                    that.jumpShow = true;
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
