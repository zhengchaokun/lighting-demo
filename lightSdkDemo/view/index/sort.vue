
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js接口在网页中返回指定股票和市场的排序股票信息</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="mr10 fs14 width70">类型代码：</text><input v-model="en_hq_type_code" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">排序类型：</text><input v-model="sort_type" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="mr10 fs14 width70">展示个数：</text><input v-model="data_count" class="inputStyle" type="text" placeholder=""/></div>
        <div class="normalList"><text class="buttonStyle" @click="sort()">查询</text></div>
        <div class="normalList"><text class="tipStyle">tips:{{tipsCont}}</text></div>
        <list class="contactWrap">
            <cell class="contactList"  v-for="(value, key, index) in newdata" v-if="index>0">
                <div class="wrapRow"><text class="contactName">股票代码：{{key}}</text></div>
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
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/sort.html'})
            },
            sort:function(){
                var that = this;
                if(!that.en_hq_type_code){
                    that.tipsCont="请输入类型代码";
                    return false;
                }
                if(!that.sort_type){
                    that.tipsCont="请输入排序方式";
                    return false;
                }
                LightSDK.native.quoteSort({
                        "en_hq_type_code":that.en_hq_type_code,
                        "sort_field_name":"last_px",
                        "data_count":that.data_count,
                        "start_pos":1,
                        "sort_type":that.sort_type,
                        "fields":"open_px,high_px,low_px,last_px"
                },function(data){
                    weex.requireModule('modal').alert({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                    var a = {}
                    data&&data.data.sort.forEach(function(obj){
                        for(var i in obj){
                            a[i]=i;
                        }
                    })
                    that.newdata = a;
                    that.tipsCont="点击排序后将按指定条件排序";
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
