
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js修改导航栏背景色</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">设置导航栏背景色示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span class="w50">背景色</span><input v-model="bgColor" class="inputStyle" type="text" placeholder="如#333333"></p> 
            <p><span class="buttonStyle" @click="setBackgroundColor()">修改</span></p>
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
                ifError:false,
                bgColor:"",
                tipsCont:"点击修改按钮后请注意导航栏背景色"
            }
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/setBackgroundColor.html"
            },
            closed:function(){
                this.ifError=false;
                this.ifshow=false;
                this.bgColor=""
            },
            setBackgroundColor:function(){
                var that = this;
                if(!that.bgColor){
                    that.ifError=true;
                    that.tipsCont = "背景色必填";
                    return false;
                }
                LightSDK.native.setBackgroundColor({
                    color:that.bgColor
                })
            }
        }
    }
</script>
<style lang="less">

</style>
