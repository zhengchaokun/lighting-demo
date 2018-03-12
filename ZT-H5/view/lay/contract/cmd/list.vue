

<template>
    <div>
        <div class="line"></div>            
        <li class="cell pdr20">
            <span>
                <span class="text-label inline-b">机构</span>
                <span class="text-label ml20 inline-b">杭城善事</span>
            </span>
            
            <div class="fright" @click="showPickModal">
                <span class="text-sub inline-b">选择</span>
                <img src="../../../../images/more.svg" class="icon-more fright ml22" />
            </div>
        </li>
        <div class="line mb30"></div>

        <div class="query-body">
            <ul class="tab-bar mb30 flex">
                <!-- <li v-for="(tab,index) in tabs" :key="index" class="tab-item" :class="[{'is-active': activeIndex===index},{'flex1':index===tabs.length-1}]">{{tab}}</li> -->
                
                <li v-for="(tab,index) in tabs" :key="index" class="tab-item" :class="{'is-active': activeIndex===index}" v-on:click="switchTab(index)">{{tab}}</li>
                <li class="flex1"></li>
            </ul>
            <div class="tab-page">
                <div v-for="(item, index) in items" :key="index" class="tab-page-item bg-white mb30" v-on:click="goDetail(item)">
                    <div class="line"></div>
                    <div class="tab-page-title">{{item.name}}</div>
                    <div class="line line-left"></div>
                    <div class="tab-page-content fs30">
                        <div class="clear">
                            <span class="text-muted fleft mr106">{{item.label}}</span>
                            <span class="text-muted fleft">{{item.brand}}</span>
                        </div>
                        <div class="clear">
                            <span class="text-error fleft ls0">采购</span>
                            <span>
                                <span class="text-muted fleft ml80 mr14 ls0">价格</span><span class="text-muted-bold fleft">{{item.price}}</span>
                            </span>
                            <span>
                                <span class="text-muted fleft ml80 mr14 ls0">数量</span><span class="text-muted-bold fleft">{{item.amount}}</span>
                            </span>
                        </div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import App from "light"
    export default {
        data(){
            return {
                show_pick_modal: false,
                tabs: ['未匹配','待处理','已匹配'],
                activeIndex: 0,
                allItems:[[{
                    name: '东南新材料',
                    brand: '品牌xxx',
                    label: '2017/2018年度棉花',
                    price: '4480.0',
                    amount: '1200'
                }],
                [{
                    name: '西北新材料',
                    brand: '品牌xxx',
                    label: '2017/2018年度棉花',
                    price: '1180.0',
                    amount: '3400'
                }]
                ],
                items:[]
            }
        },
        methods: {
            switchTab(index) {
                this.activeIndex = index;
                this.items = this.allItems[index];
            },
            showPickModal() {
                this.show_pick_modal = true
            },
            goDetail(item) {
                App.navigate("lay/contract/cmd/detail",item)
            }
        },
        mounted() {
            this.items = this.allItems[0]
        }
    }
</script>
<style lang="less" scoped>
    .ml80 {
        margin-left: 0.8rem;
    }
    .mr106 {
        margin-right: 1.06rem;
    }
    .mr14 {
        margin-right: 0.14rem;
    }
    .ls0 {
        letter-spacing: 0 !important;
    }
    .tab-bar li {
        border-bottom: solid 0.02rem #D7D7D7;
    }
    .tab-item {
        display: inline-block;
        box-sizing: content-box;
        width: 0.9rem;
        height: 0.42rem;
        padding: 0.18rem 0.4rem;
        font-size: 0.3rem;
        color: #999999;
        letter-spacing: 0;
        line-height: 0.42rem;
        border-bottom: solid 0.02rem #D7D7D7;
    }
    .tab-item.is-active { 
        color: #0FABFC;
        border: solid 0.02rem #D7D7D7;
        border-bottom-color: transparent;
        background: #ffffff;
        font-weight: bold;

        &:first-child {
            border-left-color: transparent;
        }
    }
    .tab-page-title {
        font-size: 0.34rem;
        color: #4A4A4A;
        letter-spacing: 0.005rem;
        line-height: 0.3rem;
        font-weight: bold;
        height: 0.7rem;
        padding: 0.2rem 0.3rem;
    }
    .tab-page-content {
        height: 1.36rem;
        padding: 0.16rem 0.3rem 0.2rem 0.3rem;
    }
    .text-muted {
        color: #9B9B9B;
        letter-spacing: 0.0044rem;
        line-height: 0.42rem;
    }
    .text-muted-bold {
        color: #787878;
        letter-spacing: 0;
        line-height: 0.42rem;
    }
    .text-error {
        color: #F56778;
        letter-spacing: 0;
        line-height: 0.42rem;
    }
</style>


