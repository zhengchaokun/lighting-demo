
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js接口在网页中返回指定股票和市场的排序股票信息</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">行情股票排序示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span class="w50">类型代码</span><input v-model="en_hq_type_code" class="inputStyle" type="text" placeholder="如SS,SZ 用逗号隔开"></p> 
            <p><span class="w50">排序类型</span><input v-model="sort_type" class="inputStyle" type="text" placeholder="0表示升序，1表示降序"></p> 
            <p><span class="w50">展示个数</span><input v-model="data_count" class="inputStyle" type="text" placeholder="默认20条"></p>  
            <p><span class="buttonStyle" @click="sort()">查询</span></p>
            <p :class="{'colorRed':ifError==true,'tips':ifError==false}"><span>tips:</span>{{tipsCont}}</p>
            <ul class=infoList>
                <li v-for="(value, key, index) in newdata" v-show="index>0">
                    <span>股票代码：{{key}}</span>
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
                ifError:false,
                en_hq_type_code:"",
                sort_field_name:"",
                sort_type:"1",
                data_count:"",
                tipsCont:"点击排序后将按指定条件排序，这里以最新价last_px进行排序为例",
                newdata:{}
            }
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/sort.html"
            },
            closed:function(){
                this.ifshow=false;
                this.ifError=false;
                this.tipsCont="点击排序后将按指定条件排序";
                this.newdata={};
            },
            sort:function(){
                var that = this;
                if(!that.en_hq_type_code){
                    that.tipsCont="请输入类型代码";
                    that.ifError=true;
                    return false;
                }
                if(!that.sort_type){
                    that.tipsCont="请输入排序方式";
                    that.ifError=true;
                    return false;
                }
                LightSDK.native.sort({
                        "en_hq_type_code":that.en_hq_type_code,
                        "sort_field_name":"last_px",
                        "data_count":that.data_count,
                        "start_pos":1,
                        "sort_type":that.sort_type,
                        "fields":"open_px,high_px,low_px,last_px"
                },function(data){
                    var a = {}
                    data.data.sort.forEach(function(obj){
                        for(var i in obj){
                            a[i]=i;
                        }
                    })
                    that.newdata = a;
                    that.tipsCont="点击排序后将按指定条件排序";
                    that.ifError=false;
                })
            }
        }
    }
</script>
<style lang="less">

</style>
