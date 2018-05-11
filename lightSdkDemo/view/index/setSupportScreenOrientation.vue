
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js设置屏幕可旋转的方向</text></div>
        <div><text class="detailHead">示例：</text></div>
        <text class="checked-text">选中项 {{checkedList.toString()}}</text>        
        <div class="operateWrap">
            <lc-checkbox-list :list="list" :config="config"
          @LcCheckboxListChecked="LcCheckboxListChecked"></lc-checkbox-list>
        </div>
        <div class="listWidth">
            <lc-button text="设置"
            type="normal" 
            @LcButtonClicked="setSupportScreenOrientation()"></lc-button>
        </div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </div>
</template>
<script>
    import LightSDK from "light-sdk";
    import LcCheckboxList from 'lighting-ui/packages/lc-checkbox-list';
    import LcButton from 'lighting-ui/packages/lc-button';
    export default {
        data(){
            return {
                normalsrc:"images/normal.jpg",
                selectsrc:"images/select.jpg",
                left:0,
                right:0,
                vertical:0,
                list:[
                    {label:"左横屏",value:"landscape_left"},
                    {label:"右横屏",value:"landscape_right"},
                    {label:"竖屏",value:"portrait",checked:true}
                ],
                checkedList: ["portrait"],
                config: {
                    checkedColor: '#f63031',
                    checkedIcon: ''
                }
            }
        },
        components: { LcCheckboxList,LcButton },
        methods:{
            LcCheckboxListChecked:function(e){
                this.checkedList = e.checkedList;
            },
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_setsupportscreenorientation.html'})
            },
            setSupportScreenOrientation:function(){
                var that = this;
                LightSDK.native.setSupportScreenOrientation({
                    supportScreenOrientation:that.checkedList
                },function(){

                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>
.normalList{
    justify-content:space-between;
    width:150px;
}
.imageStyle{
    width:35px;
    height:35px;
    margin-right:10px;
}
</style>
