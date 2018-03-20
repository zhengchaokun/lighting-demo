

<template>
    <div>
        <div class="line"></div>            
        <li class="cell pdr20" @click="showPickModal">
            <span>
                <span class="text-label inline-b">机构</span>
                <span class="text-label ml20 inline-b">{{ dept.deptName }}</span>
            </span>
            
            <div class="fright">
                <span class="text-sub inline-b">选择</span>
                <img src="../../../../images/more.svg" class="icon-more fright ml22" />
            </div>
        </li>
        <div class="line mb30"></div>

        <radio-list v-model="dept" :list="depts" type="deptName" :visible.sync="show_pick_dept" @visible-change="handleVisibleChange"></radio-list>


        <div class="query-body">
            <ul class="tab-bar mb30 flex">
                <li v-for="(tab,index) in tabs" :key="index" class="tab-item" :class="{'is-active': activeIndex===index}" @click="switchTab(index)">{{tab}}</li>
                <li class="flex1"></li>
            </ul>
            <div class="tab-page">
                <div v-if="items.length>0" v-for="(item, index) in items" :key="index">
                    <div v-for="(detail, idx) in item.details" :key="idx" class="tab-page-item bg-white mb30" @click="goDetail(item, index)">
                        <div class="line"></div>
                        <div class="tab-page-title">{{item.customerShortname}}</div>
                        <div class="line line-left"></div>
                        <div class="tab-page-content fs30">
                            <div class="clear">
                                <span class="text-muted fleft mr106">{{detail.productName}}</span>
                                <span class="text-muted fleft">{{detail.brandName}}</span>
                            </div>
                            <div class="clear">
                                <span class="text-error fleft ls0">{{ getByValue('spotOpenDirection', item.spotOpenDirection) }}</span>
                                <span>
                                    <span class="text-muted fleft ml80 mr14 ls0">价格</span><span class="text-muted-bold fleft">{{ detail.spotPrice }}</span>
                                </span>
                                <span>
                                    <span class="text-muted fleft ml80 mr14 ls0">数量</span><span class="text-muted-bold fleft">{{ detail.tradeAmount }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="line"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import App from "light"
    const API = require('api')
    const Dict = require('dict');
    import RadioList from "../../../../ui/radio-list"

    export default {
        components: { RadioList },
        data(){
            return {
                dept: {},
                depts: [],
                matchInfo: {},
                preconts: [[],[],[]],
                show_pick_dept: false,
                tabs: ['未匹配','待处理','已匹配'],
                activeIndex: 0,
                items:[]
            }
        },
        watch: {
            dept: {
                deep: true,
                handler(val) {
                    var that = this;
                    API.contQuery({
                        deptIdStr: JSON.stringify(val.deptId),
                        precontStatusStr: '1,2,3'
                    }).then(function(data){
                        var preconts = data;
                        
                        preconts.forEach(function(item) {
                            if(item.precontractStatus==='1') {
                                that.preconts[0].push(item)
                            } else if (item.precontractStatus==='3') {
                                that.preconts[1].push(item)
                            } else if(item.precontractStatus==='2') {
                                that.preconts[2].push(item)
                            }
                        })
                        that.items = that.preconts[that.activeIndex];
                    });

                }
            }
        },
        methods: {
            getByValue(dict, value) {
                return Dict.getByValue(dict, value);
            },
            switchTab(index) {
                this.activeIndex = index;
                this.items = this.preconts[index];
            },
            showPickModal() {
                this.show_pick_dept = true
            },
            handleVisibleChange(val) {
                this.show_pick_dept = val;
            },
            goDetail(item, index) {
                App.navigate("lay/contract/deal/detail", { 
                    precontId: item.precontId,
                    preconts: JSON.stringify(this.preconts[this.activeIndex]),
                    index: index
                })
            }
        },
        mounted() {
            var that = this;
            API.deptQuery({}).then(function(data) {
                //新建后立即匹配指令
                that.depts = data;
                if(that.$route.query.precontId) {
                    // var precontId = that.$route.query.precontId;
                    // API.contMatchInfoQuery({ contId: precontId}).then(function(data1) {
                    //     that.matchInfo = data1;
                        
                    //     data.forEach(function(dept) {
                    //         if(dept.deptId = that.matchInfo.deptId) {
                    //             that.dept = dept;
                    //         }
                    //     })
                    // })
                } else {
                    that.dept = that.depts[0];
                }
                
                
            })
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


