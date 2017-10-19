
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">当剪切板中有内容时，我们就可以调用此方法捕获到剪切板的内容，比如当执行完上一条的复制内容至剪切板后，再调用此方法获取剪切板内容时，就可以获取到对应的内容</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">获取剪切板内容示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="ifshow=false;copyValue=''"></em>
            <input v-model="copyValue" class="inputStyle" type="text" placeholder=""> <span class="buttonStyle" @click="getClipBoardText()">粘贴</span>
            <p class="tips"><span>tips:</span>{{tipsCont}}</p>
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
                tipsCont:"点击'粘贴'按钮可以将剪切板中的内容填充到输入框"
            }
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/clipBoardText.html"
            },
            getClipBoardText:function(){
                var that = this;
                LightSDK.native.getClipboardText(function(data){
                    if(data.error_no!='0'){
                        alert(data.error_info);
                        return false;
                    }else{ 
                        that.copyValue = data.data
                    }
                })
            }
        }
    }
</script>
<style lang="less">

</style>
