
<template>
    <div class="apiContent">
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">拨打电话功能</text></div>
        <div><text class="detailHead">示例：</text></div>
       <div class="operateWrap flex-column">
             <lc-input label="号码" v-model="phoneNum" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <div class="listWidth">
                <lc-button text="拨打号码"
                    type="normal" 
                    @LcButtonClicked="call"></lc-button>
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
            call:function(){
                LightSDK.native.openURL({url:"tel://"+this.phoneNum})
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style lang="less">

</style>
