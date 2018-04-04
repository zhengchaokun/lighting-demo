<template>
    <div>
        <div class="mask"></div>
        <div class="alert-box">
            <p>{{msg}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {};
        },
        props:['msg']
    }
</script>
<style lang="less" scoped>
    .alert-box{
        padding: 0.8rem 0.4rem;
        width: 5.9rem;
        padding:0.6rem;
        position: fixed;
        top:2.9rem;
        left:50%;
        transform: translate(-50%);
        background: #fff;
        border: 1px solid #DDF3FF;
        border-radius: 2px;
        z-index: 11;
        font-size: 0.34rem;
        color: #4A4A4A;
        text-align: center;
        line-height: 0.48rem;
    }
</style>
