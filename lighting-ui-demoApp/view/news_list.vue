
<template>
    <div>
       <div class="title-bar">
           <image src="images/back.png" class="icon-back" @click="onBackClick()"></image>
           <text class="fs32 f-white">{{title}}</text>
           <image src="images/search.png" class="icon-search mr20" @click="onSearchClick()"></image>
       </div>
       <scroller>
           <div class="news-item" v-for="news in newsData">
               <text class="news-item-title f-black">{{news.title}}</text>
               <div class="row-item align-end">
                   <text class="fs22 f-dark mt40">{{news.date}}</text>
               </div>
           </div>
       </scroller>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                title: '公告',
                newsData: [{
                    title: '关于PR洪市政（124165）盘中临时停牌的公告',
                    date: '2018-02-26'
                },{
                    title: '富控互动（600634）2018-02-26 09:30至2018-02-27 09：30停牌一天。重大事项未公告。',
                    date: '2018-02-26'
                },{
                    title: '风范股份（601700）2018-02-26 09:30至2018-02-27 09：30停牌一天。重大事项未公告。',
                    date: '2018-02-26'
                },{
                    title: '新华百货（600785）2018-02-26 09:30至2018-02-27 09：30停牌一天。重大事项未公告。',
                    date: '2018-02-26'
                }]
            }
        },
        methods:{
            onBackClick(){
                
            },
            onSearchClick(){

            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style lang="less">
    .title-bar{
        height: 80px;
        background-color: #df2f2f;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .icon-back{
        width: 60px;
        height: 60px;
    }
    .icon-search{
        width: 40px;
        height: 40px;
    }
    .news-item{
        padding-top: 20px;
        padding-bottom: 20px;
        margin-left: 20px;
        margin-right: 20px;
        border-bottom-width: 1px;
        border-bottom-color: #cecdcd;
    }
    .news-item-title{
        font-size: 30px;
        line-height: 48px; 
    }
</style>
