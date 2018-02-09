
<template>
    <div>
        <div class="info-wrap bgc-white" v-for="(info,index) in infoList" :key="index">
            <div class="flex-row justify-between align-center">
                <div class="flex-row align-center">
                    <text class="stock-name">{{info.name}}</text> 
                    <text class="stock-new ml25">最新 {{info.new}}</text> 
                    <text class="stock-new ml25 mr5">涨幅</text> 
                    <text :class="['stock-info', info.price>0 && 'c-red',info.price<0 && 'c-green']">{{info.price}}%</text>                                
                </div>
                <text class="stock-new">{{info.time}}</text>
            </div>
            <text class="info-title">{{info.title}}</text>
        </div>
    </div>
</template>
<script>
import App from "light";
    export default {
        data(){
            return {
                infoList:[
                    {
                        title:'恒生电子：鲸腾网络正式成立，致力于AI基础服务及区块链联盟运营服务',
                        time:'2018-1-15',
                        name:'恒生电子',
                        price:'+0.54',
                        new:'43.77',
                        type:'新闻'             
                    },
                    {
                        title:'恒生电子：业绩符合预期，受益监管进一步规范与新技术应用',
                        time:'2018-1-15',
                        name:'恒生电子',
                        price:'-0.38',
                        new:'43.77',
                        type:'研报'
                    },
                    {
                        title:'恒生电子动态点评：技术创新驱动业绩强劲复苏',
                        time:'2018-1-15',
                        name:'恒生电子',
                        price:'+0.3',
                        new:'43.77',
                        type:'研报'
                    },
                    {
                        title:'恒生电子：业绩符合预期，受益监管进一步规范与新技术应用',
                        time:'2018-1-15',
                        name:'恒生电子',
                        price:'+0.65',
                        new:'43.77',
                        type:'研报'
                    },
                    {
                        title:'恒生电子：引领金融AI发展，主营业务稳定增长',
                        time:'2018-1-15',
                        name:'恒生电子',
                        price:'-0.23',
                        new:'43.77',
                        type:'研报'
                    },
                    {
                        title:'恒生电子：业绩符合预期，受益监管进一步规范与新技术应用',
                        time:'2018-1-15',
                        name:'恒生电子',
                        price:'+0.28',
                        new:'43.77',
                        type:'研报'
                    },
                    {
                        title:'恒生电子：业绩符合预期，受益监管进一步规范与新技术应用',
                        time:'2018-1-15',
                        name:'恒生电子',
                        price:'+0.3',
                        new:'43.77',
                        type:'研报'
                    },
                    {
                        title:'恒生电子：业绩符合预期，受益监管进一步规范与新技术应用',
                        time:'2018-1-15',
                        name:'恒生电子',
                        price:'+0.3',
                        new:'43.77',
                        type:'研报'
                    }
                ]
            }
        },
        methods: {
            jump(view) {
                App.navigate(view);
            }
        }    
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>

.info-wrap{ padding: 26px; border-bottom-color: #f4f4f4; border-bottom-width: 1px;}
.info-title{ color: #474c50; font-size: 32px; lines:2; text-overflow: ellipsis; margin-top: 15px;}
.stock-name{ color: #b2b2b2; font-size: 26px;}
.stock-new{ color: #a9a9a9; font-size: 24px;}
.stock-info{ font-size: 24px;}

</style>
