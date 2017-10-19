
<template>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">当我们需要启用二维码的扫一扫功能时，可以使用此功能（类似于支付宝的扫一扫，微信的扫一扫），扫描成功后将会返回二维码的内容信息，我们可以根据需要对这些信息进行处理了。</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="scanCode()">二维码扫描示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/genAndScan.html"
            },
            scanCode:function(){
                LightSDK.native. scanCode(function(data){
                    if(data.error_no!="0"){
                        alert(data.error_info);
                        return false;
                    }else{
                        location.href="gmu://web?startPage="+encodeURIComponent(data.data);                            //your code
                    }
                })
            }
        }
    }
</script>
<style lang="less">

</style>
