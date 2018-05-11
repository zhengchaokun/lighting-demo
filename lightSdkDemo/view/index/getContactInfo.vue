
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">通过js获取通讯录信息，有时候再某种特定情况下需要获取手机的通讯录信息，这时候可以使用这个方法获取，接口将会返回手机通讯录中的所有联系人的名字和电话。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="normalList"><text class="tipStyle">tips:点击'查询'按钮获取通讯录信息</text></div>
        <div class="listWidth"><lc-button text="查询"
                    type="normal" 
                    @LcButtonClicked="getContactInfo"></lc-button></div>
        <list class="contactWrap">
            <cell class="contactList" v-for="info in contactInfoList">
                <div class="wrapRow"><text class="contactName">{{info.contactName}}</text><text>{{info.contactTelphone}}</text></div>
            </cell>
        </list>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </div>
</template>
<script>
    import LightSDK from "light-sdk";
    import LcButton from 'lighting-ui/packages/lc-button';
    const modal = weex.requireModule('modal')
    export default {
        data(){
            return {
                contactInfoList:[]
            }
        },
        components:{LcButton},
        methods:{
            getContactInfo:function(){
                var that = this;
                LightSDK.native.getContactInfo({},function(data){
                    that.contactInfoList = data.data;
                })
            },
            toOnlineApi:function(){
                 var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_getcontactinfo.html'})
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>
.contactWrap{
    height:300px;
    margin-left:20px;
}
.contactList{
    border-bottom-width:1px;
    border-bottom-style:solid;
    border-bottom-color:#f5f5f5;
    margin-top:5px;
    margin-bottom:5px;
    justify-content:space-between;
}
</style>
