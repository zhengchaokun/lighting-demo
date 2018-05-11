
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">在某些情况下需要删除已存储在本地的属性，比如个人中心已登录状态下击退出登录按钮的时候，需要删除登录的时候已经写在本地的数据。</text></div>
        <div><text class="detailHead">示例：</text></div>
            <div class="operateWrap">
            <lc-input label="属性名" v-model="jsonName" placeholder="请先输入一个存储在本地的属性" :has-top-border="false" :has-bottom-border="false"></lc-input>
            
             <div class="listWidth">
                <lc-button text="删除"
                    type="normal" 
                    @LcButtonClicked="deleteData"></lc-button>
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
                jsonName:"",
                tipsCont:"点击删除按钮，存储在本地的该属性将被删除"
            }
        },
        components:{LcInput,LcButton},
        methods:{
            toOnlineApi:function(){
                 var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_deletedata.html'})
            },
            deleteData:function(){
                var that = this;
                if(!that.jsonName){
                    that.tipsCont = "属性名不能为空";
                    return false;
                }
                LightSDK.native.deleteData({
                    key:that.jsonName
                },function(data){
                    that.tipsCont = "删除成功！";
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
