
<template>
    <div>
       <navlist :navLists="navLists"></navlist> <!--头部导航-->

       <sliderlist :imageLists="imageLists" @imgOnClick="imgOnClick"></sliderlist> <!--轮播图-->

    </div>
</template>
<script>
    import navlist from '../../ui/navlist.vue'  /*头部导航*/
    import sliderlist from '../../ui/slider.vue'  /*轮播图*/
    export default {
        data(){
            return {
                navLists:[
                    {index:0, name:'要闻'},
                    {index:1, name:'牛牛大学'},
                    {index:2, name:'要闻'},
                    {index:3, name:'牛牛大学'}
                ],
                imageLists: [
                    {
                        title: 'item A',
                        imgsrc: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg',
                        src:'#'
                    },
                    {
                        title: 'item B',
                        imgsrc: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg',
                        src:'#'
                    },
                    {
                        title: 'item C',
                        imgsrc: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg',
                        src:''
                    }
                ]
            }
        },
        components: { navlist,sliderlist },
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
