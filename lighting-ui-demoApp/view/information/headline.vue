
<template>
    <div style="background-color:#f0eff4;">
           <lc-lightbox autoPlay="true" ref="lc-lightbox"
                height="265"
                interval="5000"
                showIndicator="false"
                :image-list="imageList"
                @lcImgClick="lcImgClick">
            </lc-lightbox>

            <div class="mt10 bgc-white">
                <lc-info-list 
                    type="imgleft"
                    :infoList="infoList"
                    @infoClick="infoClick"
                    :imgStyle="imgStyle"
                ></lc-info-list>
            </div>

            <div class="mt10 bgc-white">
                <lc-info-list type="text" 
                    :infoList="infoList1" 
                    :titleStyle="titleStyle"
                    @infoClick="infoClick"
                ></lc-info-list>
            </div>
    </div>
</template>
<script>
import App from "light";
import LcLightbox from "lighting-ui/packages/lc-lightbox";
import LcInfoList from "lighting-ui/packages/lc-info-list";
    export default {
        components: { LcLightbox,LcInfoList},
        data(){
            return {
                imageList: [
                    { src: "images/banner-1.jpg",imgInfo:"'黑色星期一'后美股强力反弹" },
                    { src: "images/banner-2.jpg",imgInfo:"中国瘟鸡股市持续暴跌"  }
                ],
                 infoList:[
                    {
                        textTitle:'技术论事：沪指连阳终结',
                        textInfo:'今年以来，虽然A股上涨了6.1（截止发稿前），但是境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        src:'images/newpic.png',
                        textTime:'2018-02-08 16:00'
                    },
                    {
                        textTitle:'人民日报：部分楼市放松限购政策',
                        textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        src:'images/newpic1.png',
                        textTime:'2018-02-08 16:00'
                    },
                    {
                        textTitle:'日本史上最大ipo要来了',
                        textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        src:'images/newpic2.png',
                        textTime:'2018-02-08 16:00'
                    },
                    {
                        textTitle:'盘中直击：指数弱势反弹',
                        textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        src:'images/newpic3.png',
                        textTime:'2018-02-08 16:00'
                    }
                ],
                imgStyle:{ width:'165px',height:'125px'},
                infoList1:[
                    {
                        textTitle:'技术论事：沪指连阳终结',
                        textInfo:'今年以来，虽然A股上涨了6.1（截止发稿前），但是境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        textTime:'2018-1-15 14:07'
                    },
                    {
                        textTitle:'人民日报：部分楼市放松限购政策部分楼市放松限购政策',
                        textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        textTime:'2018-1-15 14:07'
                    },
                    {
                        textTitle:'日本史上最大ipo要来了',
                        textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        textTime:'2018-1-15 14:07'
                    },
                    {
                        textTitle:'盘中直击：指数弱势反弹',
                        textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        textTime:'2018-1-15 14:07'
                    },
                    {
                        textTitle:'技术论事：沪指连阳终结',
                        textInfo:'今年以来，虽然A股上涨了6.1（截止发稿前），但是境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        textTime:'2018-1-15 14:07'
                    },
                    {
                        textTitle:'人民日报：部分楼市放松限购政策',
                        textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        textTime:'2018-1-15 14:07'
                    },
                    {
                        textTitle:'日本史上最大ipo要来了',
                        textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        textTime:'2018-1-15 14:07'
                    },
                    {
                        textTitle:'盘中直击：指数弱势反弹',
                        textInfo:'境外资金持续走弱但是境外资金持续走弱但是境外资金持续走弱',
                        textTime:'2018-1-15 14:07'
                    }
                ],
                titleStyle:{color: '#36364d', fontWeight: 'bold',lines:'2'}
            }
        },
        methods: {
            jump(view) {
                App.navigate(view);
            },
            lcImgClick(e) {
                console.log("clicked" + e.index);
            },
            infoClick(e) {
                console.log("clicked" + e.index);
                App.navigate('#/news')
            }
        }    
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>


</style>
