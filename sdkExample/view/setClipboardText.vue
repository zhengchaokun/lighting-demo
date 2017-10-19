
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">有时候在特定的环境下，为了方便，我们需要对页面中的内容进行复制到剪贴板，这样我们可以在其他的地方根据需要使用，比如我们经常在淘宝上复制订单编号来查询快递</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">复制内容到剪切板示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <input v-model="copyValue" class="inputStyle" type="text" placeholder=""> <span class="buttonStyle" @click="setClipboardText()">复制</span>
            <p :class="{'colorRed':ifError==true,'tips':ifError==false}"><span>tips:</span>{{tipsCont}}</p>
            <p v-show="jumpShow==true"><span class="toCheck" @click="jump('getClipboardText')">去粘贴</span></p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                ifshow:false,
                copyValue:"",
                ifError:false,
                jumpShow:false,
                tipsCont:"请输入要复制的内容"
            }
        },
        methods:{
            jump:function(view){
                location.href = "#/"+view;
            },
            closed:function(){
                this.ifshow=false;
                this.ifError=false;
                this.copyValue='';
                this.jumpShow = false;
                this.tipsCont='请输入要复制的内容'
            },
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/clipBoardText.html"
            },
            setClipboardText:function(){
                var that = this;
                if(!that.copyValue){
                    that.tipsCont = "内容不能为空";
                    that.ifError = true;
                    return false;
                }
                LightSDK.native.setClipboardText({
                    value:that.copyValue
                },function(){
                    that.ifError = false;
                    that.tipsCont = "复制成功，去粘贴试试吧！";
                    that.jumpShow = true;
                })
            }
        }
    }
</script>
<style lang="less">

</style>
