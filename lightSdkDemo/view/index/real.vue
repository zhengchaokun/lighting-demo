
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js接口在网页中返回指定产品的实时行情信息。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="mr10 fs14 width70">产品代码：</text><input v-model="prod_code" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="buttonStyle" @click="real()">查询</text></div>
        <div class="normalList"><text class="tipStyle">tips:{{tipsCont}}</text></div>
        <list class="contactWrap">
            <cell class="contactList"   v-for="data in newdata">
                <div class="wrapRow"><text class="contactName">股票名字：{{data.prod_name}}</text><text>上市时间：{{data.issue_date}}</text></div>
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
                newdata:[],
                prodCodeList:[],
                tipsCont:"点击查询后将返回指定产品的指定行情信息,这里以指定返回股票名称和股票上市时间为例"
            }
        },
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/real.html'})
            },
            real:function(){
                var that = this;
                that.prodCodeList=[];
                if(!that.prod_code){
                    that.tipsCont="请输入要查询的股票代码，多个以逗号隔开";
                    return false;
                }
                var prodCodes = that.prod_code.split(",");
                prodCodes.forEach(function(obj){
                    that.prodCodeList.push(obj);   //拼接股票代码成数组格式
                })
                LightSDK.native.quoteReal({
                    "en_prod_code":that.prodCodeList,
                    "fields":["prod_name","issue_date"]
                },function(data){
                    weex.requireModule('modal').alert({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                    var Data = data.data.data;
                    var fields = data.data.fields;
                    that.newdata=[];
                    Data&&Data.forEach(function(el,index){
                        for(var n in el){
                            var newobj={};
                            for(var i=0;i<fields.length;i++){
                                newobj[fields[i]]=el[n][i];
                            }
                            that.newdata.push(newobj);
                        }
                    })
                    that.tipsCont="点击查询后将返回指定产品的指定行情信息,这里以指定返回股票名称和股票上市时间为例"
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
