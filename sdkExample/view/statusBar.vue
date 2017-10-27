
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js控制是否隐藏状态栏</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">状态栏是否隐藏示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span style="margin-right:0.2rem;" class="buttonStyle" @click="statusBar(true)">隐藏</span><span class="buttonStyle" @click="statusBar(false)">显示</span></p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
               ifshow:false 
            }
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/setSystemStatusBar.html"
            },
            closed:function(){
                this.ifshow=false;
            },
            statusBar:function(bool){
                LightSDK.native.statusBar({
                    hidden:bool
                })
            }
        }
    }
</script>
<style lang="less">

</style>
