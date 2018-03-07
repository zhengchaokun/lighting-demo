

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
                <img src="../../../../images/more.svg" class="icon-more fright ml11" />
            </div>
        </li>
        <div class="line mb30"></div>

        <div class="query-body">
            <ul class="tab-bar mb30 flex">
                <li v-for="(tab,index) in tabs" :key="index" class="tab-item" :class="[{'is-active': activeIndex===index},{'flex1':index===tabs.length-1}]">{{tab}}</li>
            </ul>
            <div class="tab-page">
                <div v-for="(item, index) in items" :key="index" class="tab-page-item mb30">
                    <div class="line"></div>
                    <div class="tab-page-title">{{item.name}}</div>
                    <div class="line line-left"></div>
                    <div class="tab-page-content fs15">
                        <div>
                            <span class="text-muted">{{item.label}}</span>
                            <span class="text-muted">{{item.brand}}</span>
                        </div>
                        <div>
                            <span class="text-error">采购</span>
                            <span>
                                <span class="text-muted">价格</span><span>{{item.price}}</span>
                            </span>
                            <span>
                                <span class="text-muted">数量</span><span>{{item.amount}}</span>
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
    export default {
        data(){
            return {
                tabs: ['未确认','待处理','已完成','已作废'],
                activeIndex: 0,
                items:[{
                    name: '东南新材料',
                    brand: 'xxx',
                    label: '2017/2018年度棉花',
                    price: '4480.0',
                    amount: '1200'
                }]
            }
        }
    }
</script>
<style lang="less" scoped>
    .tab-item {
        display: inline-block;
        box-sizing: content-box;
        width: 0.45rem;
        height: 21px;
        padding: 9px 20px;
        font-size: 0.15rem;
        color: #999999;
        letter-spacing: 0;
        line-height: 21px;
        border-bottom: solid 1px #D7D7D7;
    }
    .tab-item.is-active { 
        color: #0FABFC;
        border: solid 1px #D7D7D7;
        border-bottom-color: transparent;
        background: #ffffff;
        font-weight: bold;

        &:first-child {
            border-left-color: transparent;
        }
        // &:last-child {
        //     border-right-color: transparent;
        // }
    }
    .tab-page-item {
        // padding: 10px 15px;
        // height: 105px;
    }
    .tab-page-title {
        font-size: 0.17rem;
        color: #4A4A4A;
        letter-spacing: 0.25px;
        line-height: 15px;
        font-weight: bold;
        height: 35px;
        padding: 10px 15px;
    }
    .tab-page-content {
        height: 68px;
        padding: 8px 15px 10px 15px;
    }
</style>

