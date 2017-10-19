
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js接口在网页中返回产品检索结果列表。根据证券代码关键字等信息作为入参，来查询所有符合条件的证券代码。</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">按键精灵数据查询示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span class="w50">产品代码</span><input v-model="prod_code" class="inputStyle" type="text" placeholder="如60057"></p> 
            <p><span class="w50">交易所码</span><input v-model="en_finance_mic" class="inputStyle" type="text" placeholder='如SS,SZ 用逗号隔开'></p> 
            <p><span class="w50">返回数量</span><input v-model="data_count" class="inputStyle" type="text" placeholder="默认是50"></p> 
            <p><span class="buttonStyle" @click="wizard()">查询</span></p>
            <p :class="{'colorRed':ifError==true,'tips':ifError==false}"><span>tips:</span>{{tipsCont}}</p>
            <ul class=infoList>
                <li v-for="info in prodList"><span>{{info.prod_code}}</span><em>{{info.prod_name}}</em></li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                ifshow:false,
                ifError:false,
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
                location.href="https://document.lightyy.com/termAPI/wizard.html"
            },
            closed:function(){
                this.ifshow=false;
                this.ifError=false;
                this.prod_code="";
                this.en_finance_mic=[];
                this.data_count="";
                this.prodList=[];
                this.tipsCont="点击查询按钮后将会返回符合条件的证券代码"
            },
            wizard:function(){
                var that = this;
                if(!that.prod_code){
                    that.tipsCont="产品代码为必填";
                    that.ifError=true;
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
                    that.ifError=false;
                    that.tipsCont="点击查询按钮后将会返回符合条件的证券代码";
                    that.prodList = data.data;
                })
            }
        }
    }
</script>
<style lang="less">

</style>
