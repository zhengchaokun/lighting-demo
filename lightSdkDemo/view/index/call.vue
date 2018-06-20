
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">打开native系统特殊的外部链接 如电话，邮箱，短信，网页，其他APP等。</text></div>
        <div><text class="detailHead">示例：</text></div>
       <div class="operateWrap flex-column">
           
             <div class="listWidth mb30">
                <lc-button text="拨打号码"
                    type="normal" 
                    @LcButtonClicked="openURL('tel://10086')"></lc-button>
             </div>
             <div class="listWidth mb30">
                <lc-button text="发送短信"
                    type="normal" 
                    @LcButtonClicked="openURL('sms:10086')"></lc-button>
             </div>
             <div class="listWidth mb30">
                <lc-button text="发送邮件"
                    type="normal" 
                    @LcButtonClicked="openURL('mailto://abc@163.com')"></lc-button>
             </div>
             <div class="listWidth mb30">
                <lc-button text="打开微信APP"
                    type="normal" 
                    @LcButtonClicked="openURL('weixin://')"></lc-button>
             </div>
             <div class="listWidth">
                <lc-button text="打开百度首页"
                    type="normal" 
                    @LcButtonClicked="openURL('https://www.baidu.com')"></lc-button>
             </div>
        </div>
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
            return {phoneNum:"10086"}
        },
        components:{LcInput,LcButton},
        methods:{
            openURL:function(cont){
                LightSDK.native.openURL({url:cont})
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style lang="less">

</style>
