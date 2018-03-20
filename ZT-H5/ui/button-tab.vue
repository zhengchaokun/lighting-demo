
<template>
    <div>
        <ul class="btn-wrap-1">
            <li v-for="(btn, index) in buttons" :key="index" :class="{selected:checkMatch(btn)}" @click="jump(btn.path,btn.params,{history:false})">{{btn.title}}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {};
        },
        methods:{
            // checkMatch(btn){
            //     console.log(this.$route)
            //     const that = this;
            //     const pathMatch = this.$route.path==='/'+btn.path;
            //     if(!pathMatch){
            //         return false;
            //     }

            //     if(!btn.params){
            //         return pathMatch;
            //     }

            //     let match = true;
            //     Object.keys(btn.params).forEach(function (key) {
            //         if(btn.params[key]+'' !== that.$route.query[key]+''){
            //             match = false;
            //         }
            //     });

            //     return pathMatch && match;
            // }
            checkMatch(btn){
                const path = btn.path;
                var index = path.lastIndexOf("\/");
                var str = path.substring(0, index);
                const pathMatch = this.$route.path.indexOf(str)>-1;
                return pathMatch;
            }
        },
        props:['buttons']
    }
</script>
<style lang="less" scoped>
    .btn-wrap-1{
        display: flex;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom:0.3rem;
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
