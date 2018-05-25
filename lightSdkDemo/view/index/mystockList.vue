
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过JS接口获取自选股列表</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="tipStyle">tips:点击'查询'按钮获取自选股信息</text></div>
        <div class="normalList"><text class="buttonStyle" @click="mystockList()">查询</text></div>
        <list class="contactWrap">
            <cell class="contactList" v-for="info in stock">
                <div class="wrapRow"><text class="contactName">{{info.stockCode}}</text><text>{{info.codeType}}</text></div>
            </cell>
        </list>
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
                stock:[]
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_mystocklist.html'})
            },
            mystockList:function(){
                var that = this;
                LightSDK.native.mystockList({},function(data){
                    weex.requireModule('modal').alert({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                    that.stock =data&& data.data.result;
                    
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
