
<template>
    <div class="apiContent">
    <scroller> 
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js控制屏幕方向</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
             

             <text class="checked-text">选中项 {{checkedList.toString()}}</text>        
            <div class="operateWrap">
                <lc-checkbox-list :list="list" :config="config"
            @LcCheckboxListChecked="LcCheckboxListChecked"></lc-checkbox-list>
            </div>
            <div class="listWidth mb30">
                <lc-button text="设置可旋转的屏幕方向"
                type="normal" 
                @LcButtonClicked="setSupportScreenOrientation()"></lc-button>
            </div>
            <div class="listWidth mb30">
                <lc-button text="左横屏"
                    type="normal" 
                    @LcButtonClicked="setScreenOrientation('landscape_left')"></lc-button>
                    
             </div>
             <div class="listWidth mb30">
                <lc-button text="右横屏"
                    type="normal" 
                    @LcButtonClicked="setScreenOrientation('landscape_right')"></lc-button>
             </div>
             <div class="listWidth">
                <lc-button text="竖屏"
                    type="normal" 
                    @LcButtonClicked="setScreenOrientation('portrait')"></lc-button>
             </div>
        </div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </scroller>
     </div>
</template>
<script>
    import LightSDK from "light-sdk";
    import LcButton from 'lighting-ui/packages/lc-button';
    import LcCheckboxList from 'lighting-ui/packages/lc-checkbox-list';
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
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_setscreenorientation.html'})
            },
            setScreenOrientation:function(style){
                LightSDK.native.setScreenOrientation({
                    screenOrientation:style
                },function(data){
                    if(data.info.error_code!='0'){
                        that.Dialog.toast({
                            message: data.info.error_message,
                            duration: 2
                        });
                        return false;
                    }
                })
            },
            setSupportScreenOrientation:function(){
                var that = this;
                LightSDK.native.setSupportScreenOrientation({
                    supportScreenOrientation:that.checkedList
                },function(data){
                    if(data.info.error_code!='0'){
                        that.Dialog.toast({
                            message: data.info.error_message,
                            duration: 2
                        });
                        return false;
                    }
                    that.Dialog.toast({
                        message: "设置成功",
                        duration: 2
                    });
                })
            },
            LcCheckboxListChecked:function(e){
                this.checkedList = e.checkedList;
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>
.buttonStyle{
    width:100px;
}
.normalList{
    justify-content:space-between;
    width:340px;
}
</style>
