
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">提醒对话框展示</text></div>
        <div><text class="detailHead">示例：</text></div>
       <div class="operateWrap flex-column">
           
            <div class="listWidth"><lc-button text="点击显示对话框"
                    type="normal" 
                    @LcButtonClicked="showDialog"></lc-button></div>
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
    export default {
        data(){
            return {}
        },
        components:{LcButton},
        methods:{
            showDialog:function(){
                var that = this;
                LightSDK.native.showDialog({
                    title:"提醒框",
                    buttons:["确定","取消"],
                    message:"确定删除吗",
                    height:200,
                    width:300,
                    image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502080755380&di=038b685eaf4c6b40f50994cbc2a01a42&imgtype=0&src=http%3A%2F%2Fimg01.taopic.com%2F150704%2F240499-150F40QS335.jpg"
                },function(data){
                    that.Dialog.toast({
                        message: JSON.stringify(data),
                        duration: 2
                    });
                })
            },
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_showdialog.html'})
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style lang="less">

</style>
