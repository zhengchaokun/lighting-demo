
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">有时候为了方便我们需要把一些信息编辑成二维码，这样其他人就可以通过扫描该二维码来查看这些信息（该接口最终返回的是生成的二维码的base64编码，不包含头）</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">生成二维码示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span>内容：</span><input v-model="ewmCont" class="inputStyle" type="text" placeholder=""></p> 
            <p><span class="buttonStyle" @click="genCode()">生成</span></p>
            <p>二维码：<img :src="imgsrc"></p>
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
                ewmCont:"",
                imgsrc:"",
                tipsCont:"点击生成按钮，将会生成对应内容的二维码图片"
            }
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/genAndScan.html"
            },
            closed:function(){
                this.ewmCont="";
                this.imgsrc="";
                this.ifshow=false;
                this.ifError=false;
                this.tipsCont="点击生成按钮，将会生成对应内容的二维码图片"
            },
            genCode:function(){
                var that = this;
                if(!that.ewmCont){
                    that.tipsCont="需要生成的二维码的内容不能为空";
                    that.ifError=true;
                    return false;
                }
                LightSDK.native. genCode({
                    desc:that.ewmCont, //需要被编码成二维码的内容
                    ewmsize:"200"   //二维码尺寸,默认为300x300
                },function(data){
                    if(data.error_no!="0"){
                        alert(data.error_info);
                        return false;
                    }else{
                        that.tipsCont="二维码生成成功";
                        that.ifError=false;
                        that.imgsrc = "data:image/png;base64,"+data.data; 
                    }
                
                })
            }
        }
    }
</script>
<style lang="less">

</style>
