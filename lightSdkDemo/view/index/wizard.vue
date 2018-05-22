
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js接口在网页中返回产品检索结果列表。根据证券代码关键字等信息作为入参，来查询所有符合条件的证券代码。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="mr10 fs14 width70">产品代码：</text><input v-model="prod_code" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">交易所码：</text><input v-model="en_finance_mic" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">返回数量：</text><input v-model="data_count" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="buttonStyle" @click="wizard()">查询</text></div>
        <div class="normalList"><text class="tipStyle">tips:{{tipsCont}}</text></div>
        <list class="contactWrap">
            <cell class="contactList"  v-for="info in prodList">
                <div class="wrapRow"><text class="contactName">{{info.prod_code}}</text><text>{{info.prod_name}}</text></div>
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
                prod_code:"",
                en_finance_mic:[],
                data_count:"",
                prodList:[],
                financeList:[],
                tipsCont:"点击查询按钮后将会返回符合条件的证券代码"
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/wizard.html'})
            },
            wizard:function(){
                var that = this;
                if(!that.prod_code){
                    that.tipsCont="产品代码为必填";
                    return false;
                }
                that.financeList = [];
                if(that.en_finance_mic!=""){
                    var financeLists = that.en_finance_mic.split(",");
                    financeLists.forEach(function(obj){
                        that.financeList.push(obj);
                    })
                }
                LightSDK.native.wizard({
                    "prod_code":that.prod_code,
                    "en_finance_mic":that.financeList,
                    "data_count":that.data_count
                },function(data){
                    weex.requireModule('modal').alert({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                    that.tipsCont="点击查询按钮后将会返回符合条件的证券代码";
                    that.prodList = data.data;
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
