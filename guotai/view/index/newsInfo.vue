
<template>
    <div>
       <list class="new-list">
           <cell class="news-item" v-for="row in rows">
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
    export default {
        data(){
            return {
                rows:[{},{},{},{},{},{},{},{},{},{},{},{},{}]
            }
        }
    }
</script>
<style scoped>
    .new-list{
        padding: 0 35px 0 35px;
    }
    .news-item{
        padding: 30px 0 30px 0;
        border-bottom-style: solid;
        border-bottom-color: #f1f1f1;
        border-bottom-width: 1px;
        flex-direction: column;
    }
    .new-line-1{
        flex-direction: row;
        justify-content: flex-start;
    }
    .news-bandage{
        font-size: 16px;
        color:#fff;
        background-color: #d70b30;
        width: 45px;
        height: 20px;
    }
    .news-title{
        font-size: 30px;
        line-height: 30px;
        color:#333;
    }
    .new-line-2{
        color:#aaa;
        font-size: 26px;
        margin-top: 5px;
    }
</style>
