
<template>
    <div>
       <div class="top-head">
           <img src="" alt="">
       </div>
        <div class="form">
            <div class="input-control">
                <span>账号</span>
                <input type="text" placeholder="请输入账号">
            </div>
            <div class="input-control">
                <span>密码</span>
                <input type="password" placeholder="请输入登录密码">
            </div>
        </div>
        <div class="confirm-btn">登 录</div>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        }
    }
</script>
<style lang="less">
    .top-head{
        background-color: #efefef;
        width: 1.6rem;
        height: 1.6rem;
        margin: 0.6rem auto 0.8rem;
        border-radius: 50%;
    }
    .form{
        font-size: 0.34rem;
        color: #4A4A4A;
        padding-left: 0.3rem;

        .input-control{
            height: 1rem;
            border-bottom: 1px solid #D7D7D7;
            line-height: 1rem;;
            input{
                background: none;
                margin-left: 0.8rem;
            }
        }
    }
    .confirm-btn{
        width: 6.9rem;
        height: 0.88rem;
        margin: 0.6rem auto;
        background: #399DE2;
        border: 1px solid rgba(0,0,0,0.10);
        border-radius: 0.08rem;
        text-align: center;
        font-size: 0.34rem;
        line-height: 0.88rem;
        color: #FFFFFF;

    }
</style>
