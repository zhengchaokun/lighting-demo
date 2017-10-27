
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js接口在网页中返回指定产品的实时行情信息。</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">行情报价数据查询示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span class="w50">产品代码</span><input v-model="prod_code" class="inputStyle" type="text" placeholder="如600570.ss,600113.ss 用逗号隔开"></p> 
            <p><span class="buttonStyle" @click="real()">查询</span></p>
            <p :class="{'colorRed':ifError==true,'tips':ifError==false}"><span>tips:</span>{{tipsCont}}</p>
            <ul class=infoList>
                <li v-for="data in newdata">
                    <span>股票名字：{{data.prod_name}}</span><em>上市时间：{{data.issue_date}}</em>
                </li>
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
                prod_code:"",
                ifError:false,
                newdata:[],
                prodCodeList:[],
                tipsCont:"点击查询后将返回指定产品的指定行情信息,这里以指定返回股票名称和股票上市时间为例"
            }
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/real.html"
            },
            closed:function(){
                this.ifshow=false;
                this.ifError=false;
                this.prod_code="";
                this.newdata=[];
                this.tipsCont="点击查询后将返回指定产品的指定行情信息,这里以指定返回股票名称和股票上市时间为例"
            },
            real:function(){
                var that = this;
                that.prodCodeList=[];
                if(!that.prod_code){
                    that.tipsCont="请输入要查询的股票代码，多个以逗号隔开";
                    that.ifError=true;
                    return false;
                }
                var prodCodes = that.prod_code.split(",");
                prodCodes.forEach(function(obj){
                    that.prodCodeList.push(obj);   //拼接股票代码成数组格式
                })
                LightSDK.native.real({
                    "prod_code":that.prodCodeList,
                    "fields":["prod_name","issue_date"]
                },function(data){
                    var Data = data.data.data;
                    var fields = data.data.fields;
                    that.newdata=[];
                    Data.forEach(function(el,index){
                        for(var n in el){
                            var newobj={};
                            for(var i=0;i<fields.length;i++){
                                newobj[fields[i]]=el[n][i];
                            }
                            that.newdata.push(newobj);
                        }
                    })
                    that.ifError=false;
                    that.tipsCont="点击查询后将返回指定产品的指定行情信息,这里以指定返回股票名称和股票上市时间为例"
                })
            }
        }
    }
</script>
<style lang="less">

</style>
