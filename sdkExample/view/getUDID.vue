
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">获取设备唯一标识码。由native生成的来唯一标识设备的标志码。</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">获取设备唯一标识码示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p class="tips"><span>tips:</span>点击'查询'按钮后，将会显示设备的唯一标识码，即UDID</p>
            <p><span class="buttonStyle" @click="getUDID()">查询</span></p>
            <p><span style="word-break: break-all;">{{udid}}</span></p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                ifshow:false,
                udid:""
            }
        },
        methods:{
            getUDID:function(){
                var that = this;
                LightSDK.native.getUDID(function(data){
                    that.udid = data.data.UDID;
                })
            },
            closed:function(){
                this.ifshow=false;
                this.udid=""
            },
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/chooseImage.html"
            }
        }
    }
</script>
<style lang="less">

</style>
