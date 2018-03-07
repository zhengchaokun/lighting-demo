
<template>
    <div>
        <ul class="btn-wrap">
            <li v-for="btn in buttons" :class="{selected:checkMatch(btn)}" @click="jump(btn.path,btn.params)">{{btn.title}}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {};
        },
        methods:{
            checkMatch(btn){
                const that = this;
                const pathMatch = this.$route.path==='/'+btn.path;
                if(!pathMatch){
                    return false;
                }

                if(!btn.params){
                    return pathMatch;
                }

                let match = true;
                Object.keys(btn.params).forEach(function (key) {
                    if(btn.params[key] !== +that.$route.query[key]){
                        console.log(that.$route.query[key])
                        console.log(btn.params[key])
                        match = false;
                    }
                });

                return pathMatch && match;
            }
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
