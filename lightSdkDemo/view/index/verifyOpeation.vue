
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js调用手势或指纹验证</text></div>
        <div><text class="detailHead">示例：</text></div>
        <lc-radio :list="list" :config="config"
                 @LcRadioListChecked="LcRadioListChecked"></lc-radio>
        <div class="listWidth mb30">
            <lc-button text="点击调用"
            type="normal" 
            @LcButtonClicked="verifyOpeation()"></lc-button></div>
          
        <div class="listWidth">
            <lc-button text="点击判断是否含有"
            type="normal" 
            @LcButtonClicked="preVerifyOpeation()"></lc-button>  
        </div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </div>
</template>
<script>
    import LightSDK from "light-sdk";
    import LcButton from 'lighting-ui/packages/lc-button';
    import LcRadio from 'lighting-ui/packages/lc-radio';
    export default {
        data(){
            return {
                type:0,
                normalsrc:"images/normal.jpg",
                list:[
                    { title: '指纹', value: "FP", checked: true},
                    { title: '手势', value:"GL" }
                ],
                selectsrc:"images/select.jpg",
                config: {
                    checkedColor: '#f63031',
                    checkedIcon: ''
                },
                checkedInfo:{ title: '指纹', value:"FP", oldIndex: -1, index: 1 }
            }
        },
        components: {LcButton,LcRadio },
        methods:{
            LcRadioListChecked (e) {
                this.checkedInfo = e;
            },
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/genAndScan.html'})
            },
            //是否含有指纹手势
            preVerifyOpeation:function(){
                var that = this;
                LightSDK.native.preVerifyOpeation({
                    verifyType:that.checkedInfo.value
                },function(data){
                    that.Dialog.toast({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                })
            },
            //调用指纹手势
            verifyOpeation:function(){
                var that = this;
                LightSDK.native.verifyOpeation({
                    verifyType:that.checkedInfo.value
                },function(data){
                    that.Dialog.toast({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>
.normalList{
    justify-content:space-between;
    width:120px;
}
.imageStyle{
    width:35px;
    height:35px;
    margin-right:10px;
}
</style>
