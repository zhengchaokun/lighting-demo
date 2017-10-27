
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js判断各个平台app在设备上是否已安装。</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">三方app安装状态示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span>平台类型：</span><input v-model="type" class="inputStyle" type="text" placeholder=""></p> 
            <p><span class="buttonStyle" @click="isAppInstalled()">查询</span></p>
            <p><span>是否安装：</span>{{ifInstall}}</p>
            <p :class="{'colorRed':ifError==true,'tips':ifError==false}"><span>tips:</span>{{tipsCont}}</p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                ifError:false,
                ifshow:false,
                ifInstall:"--",
                type:"",
                tipsCont:"根据平台类型查询app是否已安装，true表示已安装 false表示没安装，目前类型只支持qq，weibo，weixin三个"
            }
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/isAppInstalled.html"
            },
            closed:function(){
                this.ifInstall="--";
                this.ifError=false;
                this.ifshow=false;
                this.type=""
            },
            isAppInstalled:function(){
                var that = this;
                if(!that.type){
                    that.tipsCont="平台类型不能为空，请输入，只支持qq,weibo,weixin三个";
                    that.ifError=true;
                    return false;
                }
                if(that.type!="qq"&&that.type!="weibo"&&that.type!="weixin"){
                    that.tipsCont="类型输入有误，请重新输入，只支持qq,weibo,weixin三个";
                    that.ifError=true;
                    return false;
                }
                LightSDK.native.isAppInstalled({type:that.type},function(data){
                    that.ifInstall = data.status; 
                    that.ifError=false;
                    that.tipsCont="根据平台类型查询app是否已安装，true表示已安装 false表示没安装，目前类型只支持qq，weibo，weixin三个";
                })
            }
        }
    }
</script>
<style lang="less">

</style>
