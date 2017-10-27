
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">在某些情况下需要删除已存储在本地的属性，比如个人中心已登录状态下击退出登录按钮的时候，需要删除登录的时候已经写在本地的数据。</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">本地删除数据示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span>属性名：</span><input v-model="jsonName" class="inputStyle" type="text" placeholder=""></p> 
            <p><span class="buttonStyle" @click="deleteData()">删除</span></p>
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
                ifError:false,
                tipsCont:"请输入要删除的属性的名称"
            }
        },
        methods:{
            closed:function(){
                this.ifshow = false;
                this.ifError = false;
                this.jsonName = "";
                this.tipsCont = "请输入要删除的属性的名称";
            },
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/localData.html"
            },
            deleteData:function(){
                var that = this;
                if(!that.jsonName){
                    that.tipsCont = "属性名不能为空";
                    that.ifError = true;
                    return false;
                }
                LightSDK.native.deleteGlobalData(that.jsonName,function(data){
                    if(data.error_no!="0"){
                        alert(data.error_info);
                        return;
                    }else{
                        that.tipsCont = "删除成功！";
                        that.ifError = false;
                    }
                })
            }
        }
    }
</script>
<style lang="less">

</style>
