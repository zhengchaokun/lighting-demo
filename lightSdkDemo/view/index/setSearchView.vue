
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js设置导航栏搜索视图。搜索视图添加后，点击视图触发回调函数，在回调函数中用户可以根据需求做处理，比如点击搜索视图后，页面跳转到搜索页面。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
            <lc-input label="背景色" v-model="bgColor" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="文字" v-model="textDesc" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="文字颜色" v-model="textColor" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <div class="listWidth">
                <lc-button text="添加"
                    type="normal" 
                    @LcButtonClicked="setSearchView"></lc-button>
             </div>
        </div>
        <div class="normalList"><text class="tipStyle">tips:{{tipsCont}}</text></div>
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
                bgColor:"",
                textDesc:"",
                textColor:"",
                tipsCont:"点击'添加'按钮后，请注意导航栏新添了搜索视图，点击试试吧"
            }
        },
        components:{LcInput,LcButton},
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/termAPI/setSearchView.html'})
            },
            setSearchView:function(){
                var that = this;
                LightSDK.native.setSearchView({
                    "backgroundColor":that.bgColor,
                    "placeholderText":that.textDesc,
                    "placeholderTextColor":that.textColor
                },function(data){
                    that.Dialog.toast({
                        message: "我被点击啦",
                        duration: 2
                    });
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
