
<template>
    <div>
       <navlist :navLists="navLists"></navlist> <!--头部导航-->

       <sliderlist :imageLists="imageLists" @imgOnClick="imgOnClick"></sliderlist> <!--轮播图-->

       <infolist :infolists="infolists"></infolist> <!-- 列表详情 -->
    </div>
</template>
<script>
    import navlist from '../../ui/navlist.vue'  /*头部导航*/
    import sliderlist from '../../ui/slider.vue'  /*轮播图*/
    import infolist from '../../ui/list.vue'  /*详情列表*/
    export default {
        data(){
            return {
                navLists:[
                    {index:0, name:'要闻'},
                    {index:1, name:'牛牛大学'},
                    {index:2, name:'自选'},
                    {index:3, name:'百科'},
                    {index:4, name:'财经日历'}
                ],
                imageLists: [
                    {
                        title: '详情介绍1111',
                        imgsrc: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                        src:'#'
                    },
                    {
                        title: '详情介绍2222',
                        imgsrc: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg',
                        src:'#'
                    },
                    {
                        title: '详情介绍3333',
                        imgsrc: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg',
                        src:''
                    }
                ],
                infolists:[
                    {
                        title: '开盘沪指下跌0.3%，下周有望反弹下周有望反弹下周有望反弹',
                        imgsrc: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                        time:'1分钟以前',
                        src:'#'
                    },
                    {
                        title: '开盘沪指下跌0.3%，下周有望反弹开盘沪指下跌0.3%，下周有望反弹开盘沪指下跌0.3%，下周有望反弹',
                        imgsrc: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                        time:'20分钟以前',
                        src:'#'
                    },
                    {
                        title: '开盘沪指下跌0.3%，下周有望反弹',
                        imgsrc: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                        time:'11:26',
                        src:'#'
                    },{
                        title: '开盘沪指下跌0.3%，下周有望反弹下周有望反弹下周有望反弹',
                        imgsrc: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                        time:'1分钟以前',
                        src:'#'
                    },
                    {
                        title: '开盘沪指下跌0.3%，下周有望反弹开盘沪指下跌0.3%，下周有望反弹开盘沪指下跌0.3%，下周有望反弹',
                        imgsrc: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                        time:'20分钟以前',
                        src:'#'
                    },
                    {
                        title: '开盘沪指下跌0.3%，下周有望反弹',
                        imgsrc: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                        time:'11:26',
                        src:'#'
                    },
                    {
                        title: '开盘沪指下跌0.3%，下周有望反弹',
                        imgsrc: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                        time:'11:26',
                        src:'#'
                    },{
                        title: '开盘沪指下跌0.3%，下周有望反弹下周有望反弹下周有望反弹',
                        imgsrc: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                        time:'1分钟以前',
                        src:'#'
                    },
                    {
                        title: '开盘沪指下跌0.3%，下周有望反弹开盘沪指下跌0.3%，下周有望反弹开盘沪指下跌0.3%，下周有望反弹',
                        imgsrc: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                        time:'20分钟以前',
                        src:'#'
                    },
                    {
                        title: '开盘沪指下跌0.3%，下周有望反弹',
                        imgsrc: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                        time:'11:26',
                        src:'#'
                    }
                ]
            }
        },
        components: { navlist,sliderlist,infolist },
        methods:{
            navListOnClick: function (e) {
                console.log('navListOnClick', e.index)
            },
            imgOnClick(e){
                console.log('imgOnClick', e.title)
            }
        }
    }
</script>
<style scoped>

</style>
