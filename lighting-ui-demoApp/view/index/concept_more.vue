
<template>
    <div style="background-color:#f0eff4;">
       <scroller class="wrap">
           <text class="tips">根据概念实时涨跌幅排序</text>

            <div class="cell mt20" v-for="(cell,index) in cells" :key="index">
                <div class="concept-wrap">
                    <text :class="['bookmark', index<2 ? 'bgc-orange':'bgc-blue']">{{cell.type}}</text>
                    <text class="concept-title">{{cell.title}}</text>
                </div>
                <div class="flex-row align-center justify-end mt20">
                    <text class="concept-label">相关个股</text>
                    <a class="concept-a flex-row ml20" v-for="(s,i) in cell.stock" :key="i">
                        <text class="concept-name">{{s.name}}</text>                           
                        <text :class="['concept-price', s.price>0 ? 'c-red':'c-green']">{{s.price}}%</text>
                    </a>                       
                </div>
            </div>
         
       </scroller>
    </div>
</template>
<script>
import App from "light";
    export default {
        data(){
            return {
                cells:[
                    {
                        type:'黄金',
                        title:'春节效应与金价连涨刺激黄金股',
                        stock:[
                            { name:'紫金矿业', price:'+6.42' },
                            { name:'豫园股份', price:'0.00' },
                        ]
                    },
                    {
                        type:'核电',
                        title:'核电行业将迎金三角行情，国务院已批准中核和中核建重组',
                        stock:[
                            { name:'中核科技', price:'+0.58' },
                            { name:'*ST家电', price:'+1.04' },
                        ]
                    },
                    {
                        type:'黄金',
                        title:'春节效应与金价连涨刺激黄金股',
                        stock:[
                            { name:'紫金矿业', price:'+6.42' },
                            { name:'豫园股份', price:'0.00' },
                        ]
                    },
                    {
                        type:'核电',
                        title:'核电行业将迎金三角行情，国务院已批准中核和中核建重组',
                        stock:[
                            { name:'中核科技', price:'+0.58' },
                            { name:'*ST家电', price:'+1.04' },
                        ]
                    },
                    {
                        type:'黄金',
                        title:'春节效应与金价连涨刺激黄金股',
                        stock:[
                            { name:'紫金矿业', price:'+6.42' },
                            { name:'豫园股份', price:'0.00' },
                        ]
                    },
                    {
                        type:'核电',
                        title:'核电行业将迎金三角行情，国务院已批准中核和中核建重组',
                        stock:[
                            { name:'中核科技', price:'+0.58' },
                            { name:'*ST家电', price:'+1.04' },
                        ]
                    }
                ]
            }
        },
        methods:{
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>

.wrap{ padding: 20px;}
.tips{ color: #706f74; font-size: 30px;}
.cell{ width: 710px; padding-top: 40px; padding-right:68px; padding-bottom: 45px; background-color: #fff;}
.concept-wrap { flex-direction: row; align-items: baseline; justify-content: space-between; }
.bookmark {  width: 160px; height: 58px; line-height: 58px; font-size: 30px; color: #ffffff;
   border-bottom-right-radius: 40px; border-top-right-radius: 40px; padding-left: 20px;}
.concept-title{ color: #24272e; font-size: 32px; lines:2; flex:1; margin-left: 28px;}  
.concept-label{ color: #cacacc; font-size: 28px;}
.concept-a{ text-decoration: underline; align-items: center;}
.concept-name{ color: #555; font-size: 28px;} 
.concept-price{ font-size: 28px;}

</style>
