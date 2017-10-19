
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">当有些数据需要多次使用的时候，我们可以把这些数据存到本地，需要使用的时候再从本地读取这些已存的数据（见下面从本地读取数据），比如账户的用户名、密码等信息。</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">本地存储数据示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span>属性名：</span><input v-model="jsonName" class="inputStyle" type="text" placeholder=""></p> 
            <p><span>属性值：</span><input v-model="jsonvalue" class="inputStyle" type="text" placeholder=""></p>
            <p><span class="buttonStyle" @click="writeData()">保存</span></p>
            <p :class="{'colorRed':ifError==true,'tips':ifError==false}"><span>tips:</span>{{tipsCont}}</p>
            <p v-show="jumpShow==true"><span class="toCheck" @click="jump('readGlobalData')">去读取数据</span></p>
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
                tipsCont:"请输入要保存的属性名称/值对",
                jsonName:"",
                jsonvalue:"",
                jumpShow:false
            }
        },
        methods:{
            jump:function(view){
                location.href = "#/"+view;
            },
            closed:function(){
                this.ifshow = false;
                this.jumpShow = false;
                this.jsonName = "";
                this.jsonvalue = "";
                this.tipsCont = "请输入要保存的属性名称/值对"
            },
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/localData.html"
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
                LightSDK.native.writeGlobalData(jsonObj,function(data){
                    if(data.error_no!="0"){
                        alert(data.error_info);
                        return;
                    }else{
                        that.tipsCont = "保存成功，现在去读取数据试试吧！";
                        that.jumpShow = true;
                    }
                
                })
            }
        }
    }
</script>
<style lang="less">

</style>
