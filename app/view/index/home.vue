<template>
    <div>
        <div class="main">
            <h1>欢迎来到Light！</h1>

            <button @click="checkFP()">检查是否支持指纹识别</button>
            <button @click="verifyFP()">指纹验证</button>


            <button @click="checkGL()">检查是否支持手势识别</button>
            <button @click="verifyGL()">手势验证</button>

            <a href="gmu://globalquote">进入行情</a>
        </div>
    </div>
</template>
<script>
    const GMUSDK = require("../../lib/gmuSDK");
    export default {
        data(){
            return {}
        },
        methods:{
            checkFP(){
                GMUSDK.checkFP(function (support) {
                    if(support){
                        alert("支持指纹识别");
                    }else{
                        alert("不支持指纹识别")
                    }
                })
            },
            checkGL(){
                GMUSDK.checkGL(function (support) {
                    if(support){
                        alert("支持手势识别");
                    }else{
                        alert("不支持手势识别")
                    }
                })
            },

            verifyFP(){
                GMUSDK.verifyFP(function (ok) {
                    if(ok){
                        alert("验证通过");
                    }else{
                        alert("验证失败")
                    }
                })
            },
            verifyGL(){
                GMUSDK.verifyGL(function (ok) {
                    if(ok){
                        alert("验证通过");
                    }else{
                        alert("验证失败")
                    }
                })
            }
        }
    }
</script>
<style lang="less">

</style>
