
<template>
    <div>
       <list class="new-list">
           <cell class="news-item" v-for="row in rows"  @click="jump('index/newsInfo')">
               <div class="new-line-1">
                   <text class="news-bandage">NEW</text>
                   <text class="news-title">A股调整或因短期情绪，长期震荡向上趋势不改</text>
               </div>
               <text class="new-line-2">2018-02-09 04:02:00</text>
           </cell>
       </list>
    </div>
</template>
<script>
import App from 'light';
import LightSDK from 'light-sdk';
    export default {
        data(){
            return {
                rows:[{},{},{},{},{},{},{},{},{},{},{},{},{}]
            }
        },
        methods:{
            jump(view) {
                App.navigate(view);
            }
        },
        mounted(){
            LightSDK.native.setTitle({title:'资讯'})
        }
    }
</script>
<style scoped>
    .new-list{
        
    }
    .news-item{
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 35px;
        padding-right: 35px;
        border-bottom-style: solid;
        border-bottom-color: #f1f1f1;
        border-bottom-width: 1px;
        flex-direction: column;
    }
    .new-line-1{
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .news-bandage{
        font-size: 16px;
        color:#fff;
        background-color: #d70b30;
        width: 60px;
        height: 20px;
        text-align: center;
        margin-right: 10px;
    }
    .news-title{
        font-size: 30px;
        line-height: 30px;
        color:#333;
        lines:2;
    }
    .new-line-2{
        color:#aaa;
        font-size: 26px;
        margin-top: 10px;
    }
</style>
