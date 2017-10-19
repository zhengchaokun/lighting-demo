
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js接口获取客户端版本信息</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">获取设备版本号示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p class="tips"><span>tips:</span>点击'查询'按钮后，将会显示app的版本号</p>
            <p><span class="buttonStyle" @click="getVersion()">查询</span></p>
            <p><span>{{version}}</span></p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                ifshow:false,
                version:""
            }
        },
        methods:{
            getVersion:function(){
                var that = this;
                LightSDK.native.getVersion(function(data){
                    that.version = data.data.version;
                })
            },
            closed:function(){
                this.ifshow=false;
                this.version=""
            },
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/getVersion.html"
            }
        }
    }
</script>
<style lang="less">

</style>
