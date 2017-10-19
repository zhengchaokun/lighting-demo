
<template>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过JS注销当前登录用户</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="userLogout()">注销用户信息示例</span></div>
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
                location.href="https://document.lightyy.com/termAPI/userLogout.html"
            },
            userLogout:function(){
                LightSDK.native.userLogout(function(data){
                    alert("注销成功");
                })
            }
        }
    }
</script>
<style lang="less">

</style>
