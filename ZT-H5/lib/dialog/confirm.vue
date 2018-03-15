<template>
    <div>
        <div class="mask"></div>
        <div class="alert-box">
            <p>{{msg}}</p>
            <div class="btn-confirmbox-wrap">
                <div class="btn-confirmbox btn-confirm" @click="clicked('confirm')">{{confirmText}}</div>
                <div class="btn-confirmbox btn-cancel red-type" @click="clicked('cancel')">{{cancelText}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {};
        },
        props:['msg','confirmText','cancelText'],
        methods:{
            clicked(type){
                this.$emit(type)
            }
        }
    }
</script>
<style lang="less" scoped>
    .alert-box{
        padding: 0.8rem 0.4rem;
        width: 5.9rem;
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


        .btn-confirmbox-wrap{
            flex-direction: row;
            display: flex;
            justify-content: space-between;
            padding-top: 0.8rem;
            .btn-confirmbox{
                // flex: 1;
                border: 1px solid #1DB0FC;
                border-radius: 4px;
                font-size: 0.34rem;
                color: #399DE2;
                letter-spacing: 0;
                width: 2.4rem;
                height: 0.8rem;
                line-height: 0.8rem;
                &.red-type{
                     border: 1px solid #F56778;
                     border-radius: 4px;
                     color:#F56778;
                }
            }
        }
    }
</style>
