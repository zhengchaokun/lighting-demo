

<template>
    <div>
        <div class="line"></div>            
        <li class="cell pdr20 pick" @click="showPickModal">
            <span>
                <span class="text-label inline-b">机构</span>
                <span class="text-label ml40 inline-b">{{ dept.deptName }}</span>
            </span>
            
            <div class="fright">
                <span class="text-sub inline-b">选择</span>
                <img src="../../../../images/more.svg" class="icon-more fright ml22" />
            </div>
        </li>
        <div class="line mb30"></div>

        <radio-list :top="0.8" v-model="dept" :list="depts" type="deptName" :visible.sync="show_pick_dept" @visible-change="handleVisibleChange"></radio-list>

        <div class="query-body">
            <!-- <ul class="tab-bar mb30 flex">
                <li v-for="(tab,index) in tabs" :key="index" class="tab-item" :class="{'is-active': activeIndex===index}" v-on:click="switchTab(index)">{{tab}}</li>
                <li class="flex1"></li>
            </ul> -->
            <div class="tab-page">
                <div v-if="preconts.length>0" v-for="(precont, index) in preconts" :key="index">
                    <div  v-for="(detail, idx) in precont.details" :key="idx" class="tab-page-item bg-white mb30" @click="goDetail(precont)">
                        <div class="line"></div>
                        <div class="tab-page-title">
                            <span class="fleft mr30">{{ precont.customerShortname }}</span>
                            <span class="fleft fs30" :class="setColor(precont.precontractStatus)">{{ getByValue('precontractStatus', precont.precontractStatus) }}</span>                        
                        </div>
                        <div class="line line-left"></div>
                        <div class="tab-page-content fs30">
                            <div class="clear">
                                <span class="text-muted fleft mr106">{{ detail.productName }}</span>
                                <span class="text-muted fleft">{{ detail.brandName }}</span>
                            </div>
                            <div class="clear">
                                <span class="text-error fleft ls0">{{ getByValue('spotOpenDirection', precont.spotOpenDirection) }}</span>
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
                <div v-else>暂无预合同</div>
            </div>
        </div>
    </div>
</template>
<script>
    import App from "light"
    import API from "../../../../lib/api"
    import RadioList from "../../../../ui/radio-list"
    const Dict = require('dict');
    export default {
        components: { RadioList },

        data(){
            return {
                dept: {},
                depts: [],
                show_pick_dept: false,
                // tabs: ['未确认','待处理','已完成','已作废'],
                // activeIndex: 0,
                // preconts: [[], [], [], []],
                // items:{},
                preconts: [],
                scrollTop: 0
            }
        },
        methods: {
            permitScroll() {
                API.permitScroll()
                window.scrollTo(0, this.scrollTop);
            },
            getByValue(dict, value) {
                if(dict=='precontractStatus' && [1,2].indexOf(value)>-1) {
                    return '未确认';
                }
                return Dict.getByValue(dict, value);
            },
            setColor(value) {
                if(value==4) return 'text-green';
                return 'text-red'
            },
            handleVisibleChange(val) {
                this.show_pick_dept = val;
            },
            showPickModal() {
                this.show_pick_dept = true;
                this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                API.forbidScroll();
            },
            goDetail(precont) {
                App.navigate("lay/contract/query/detail",{ precontId: precont.precontId })
            }
        },
        watch: {
            dept: {
                deep: true,
                handler(val) {
                    var that = this;
                    API.contQuery({
                        deptIdStr: JSON.stringify(val.deptId),
                        precontStatusStr: '1,2,3,4,5'
                    }).then(function(data){
                        var preconts = that.preconts = data;
                        
                        // preconts.forEach(function(item) {
                        //     if(item.precontractStatus==='3') {
                        //         that.preconts[1].push(item)
                        //     } else if (item.precontractStatus==='4') {
                        //         that.preconts[2].push(item)
                        //     } else if(item.precontractStatus==='5') {
                        //         that.preconts[3].push(item)
                        //     }
                        // })
                        // that.items = that.preconts[that.activeIndex];
                    });

                }
            },
            show_pick_dept(val) {
                if(!val) {
                    this.permitScroll();
                }
            }
        },
        mounted() {
            document.body.addEventListener('touchstart', function () { });
            var that = this;

            //查询结构列表 
            API.deptQuery({}).then(function(data) {
                // if(that.$route.query.precont) {
                //     that.precont = JSON.parse(that.$route.query.precont);
                // }
                that.depts = data;
                that.dept = that.depts[0];
                that.depts.forEach(function(dept) {
                    // if(dept.deptId = that.precont.deptId) {
                    //     that.dept = dept;
                    // }
                })
            })

            
        },
        afterHide () {
            API.permitScroll();
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
        line-height: 0.3rem;
        font-weight: bold;
        height: 0.7rem;
        padding: 0.2rem 0.3rem;
    }
    // .text-status {
    //     font-size: 
    // }
    .tab-page-content {
        height: 1.36rem;
        padding: 0.16rem 0.3rem 0.2rem 0.3rem;
    }
    .text-muted {
        color: #9B9B9B;
        line-height: 0.42rem;
    }
    .text-muted-bold {
        color: #787878;
        line-height: 0.42rem;
    }
    .text-error {
        color: #F56778;
        line-height: 0.42rem;
    }
</style>

