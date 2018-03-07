
<template>
    <div>
        <ul class="btn-wrap">
            <li v-for="btn in buttons" :class="{selected:$route.path==='/'+btn.path}" @click="jump(btn.path,btn.params)">{{btn.title}}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {};
        },
        props:['buttons']
    }
</script>
<style lang="less" scoped>
    .btn-wrap{
        display: flex;
        border-bottom: 1px solid #d7d7d7;
        li{
            flex:1;
            text-align: center;
            font-size: 0.3rem;
            color: #999999;
            line-height: 0.8rem;
            background-color: #fff;
            &+li{
                border-left: 1px solid #d7d7d7;
            }
            &.selected{
                background: #4A90E2;
                color: #fff;
            }
        }
    }
</style>
