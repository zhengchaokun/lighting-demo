
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">有时候为了方便我们需要把一些信息编辑成二维码，这样其他人就可以通过扫描该二维码来查看这些信息（该接口最终返回的是生成的二维码的base64编码，不包含头）</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap flex-column">
            <div class="listWidth mb5"><lc-input placeholder="这里输入二维码内容"  v-model="ewmCont"></lc-input></div>
            
        </div>
        <div class="normalList"><text class="mr10 fs14">二维码图片：</text><image class="imgSize" :src="imgsrc"></image></div>
        <div class="listWidth">
            <lc-button text="生成二维码"
                    type="normal" 
                    @LcButtonClicked="genCode"></lc-button>
        </div>
        <div class="ml20 mb30"><text class="tipStyle">tips:{{tipsCont}}</text></div>
        <div class="listWidth">
            <lc-button text="扫一扫"
            type="normal" 
            @LcButtonClicked="scanCode"></lc-button>
        </div>
        
        <div><text class="detailHead">说明：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </div>
</template>
<script>
    import LightSDK from "light-sdk";
    import LcInput  from 'lighting-ui/packages/lc-input';
    import LcButton from 'lighting-ui/packages/lc-button';
    export default {
        data(){
            return {
                ewmCont:"",
                imgsrc:"https://light.hscloud.cn/data/file/5ad552622193f668f0fc2227?type=image",
                tipsCont:"点击生成按钮，将会生成对应内容的二维码图片"
            }
        },
        components:{LcInput,LcButton},
        methods:{
            toOnlineApi:function(){
                 var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_gencode.html'})
            },
            scanCode:function(){
                LightSDK.native.scanCode({},function(data){
                    JSON.stringify(data);
                    var event = weex.requireModule('event');
                    event.openNative('web',{startPage:encodeURIComponent(data.data.result)});      //your code
                })
            },
            genCode:function(){
                var that = this;
                if(!that.ewmCont){
                    that.tipsCont="需要生成的二维码的内容不能为空";
                    return false;
                }
                LightSDK.native.genCode({
                    desc:that.ewmCont, //需要被编码成二维码的内容
                    size:"200"   //二维码尺寸,默认为300x300
                },function(data){
                    that.tipsCont="二维码生成成功";
                    that.imgsrc = "data:image/png;base64,"+data.data.result; 
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
