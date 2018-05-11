
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js接口查询存储在本地的属性</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
            <lc-input label="属性名" v-model="jsonName" placeholder="请先输入一个存储在本地的属性" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <lc-input label="属性值" v-model="jsonvalue" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <div class="listWidth">
                <lc-button text="查询"
                    type="normal" 
                    @LcButtonClicked="readData"></lc-button>
             </div>
        </div>
        <div class="ml20"><text class="tipStyle">tips:{{tipsCont}}</text></div>
        <div><text class="detailHead">文档：</text></div>
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
                jsonName:"",
                jsonvalue:"",
                tipsCont:"点击'查询'按钮后存储在本地的'属性名'对应的值会填充到下方'属性值'的输入框"
            }
        },
        components:{LcInput,LcButton},
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_readdata.html'})
            },
            readData:function(){
                var that = this;
                if(!that.jsonName){
                    that.Dialog.toast({
                        message: "属性名不能为空！",
                        duration: 2
                    });
                    return false;
                }
                
                LightSDK.native.readData({
                    key:that.jsonName,
                },function(data){
                    that.Dialog.toast({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                    that.jsonvalue = data.data.result;
                    that.tipsCont = "点击'查询'按钮后存储在本地的'属性名'对应的值会填充到下方'属性值'的输入框"
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
