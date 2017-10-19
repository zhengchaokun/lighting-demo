
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js接口查询存储在本地的属性</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">本地读取数据示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span>属性名：</span><input v-model="jsonName" class="inputStyle" type="text" placeholder=""></p> 
            <p><span class="buttonStyle" @click="readData()">查询</span></p>
            <p><span>属性值：</span><input v-model="jsonvalue" class="inputStyle" type="text" placeholder=""></p>
            <p :class="{'colorRed':ifError==true,'tips':ifError==false}"><span>tips:</span>{{tipsCont}}</p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                ifshow:false,
                jsonName:"",
                jsonvalue:"",
                ifError:false,
                tipsCont:"点击'查询'按钮后存储在本地的'属性名'对应的值会填充到下方'属性值'的输入框"
            }
        },
        methods:{
            closed:function(){
                this.ifshow = false;
                this.ifError = false;
                this.jsonName = "";
                this.jsonvalue = "";
            },
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/localData.html"
            },
            readData:function(){
                var that = this;
                if(!that.jsonName){
                    that.tipsCont = "属性名不能为空！";
                    that.ifError = true;
                    return false;
                }
                LightSDK.native.readGlobalData(that.jsonName,function(data){
                    if(data.error_no!="0"){
                        alert(data.error_info);
                        return;
                    }else{
                        that.jsonvalue = data.data;
                        that.ifError = false;
                        that.tipsCont = "点击'查询'按钮后存储在本地的'属性名'对应的值会填充到下方'属性值'的输入框"
                    }
                
                })
            }
        }
    }
</script>
<style lang="less">

</style>
