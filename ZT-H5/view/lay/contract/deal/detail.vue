
<template>
    <div>
        <div class="edit-bar fs30">
            <span>合同明细</span>
        </div>
        <div class="line"></div>
        <div class="cell">
            <input readonly :value="info_main" class="w100 detail-input">
        </div>
        <div class="line line-left"></div>
        <div v-for="(item,index) in details" :key="index">
            <div class="cell">
                <input readonly :value="index+1+'/'+item" class="w100 detail-input">
            </div>
            <div class="line" :class="[{'line-left': index<details.length-1},{'mb30': index===details.length-1}]"></div>
        </div>
        

        <div class="line"></div>
        <li class="cell pdr20 pick" @click="showPickModal">
            <span class="text-label inline-b">匹配指令</span>
            <div class="fright">
                <span class="text-sub inline-b">选择</span>
                <img src="../../../../images/more.svg" class="icon-more fright ml22" />
            </div>
        </li>
        <div class="line mb20"></div>  

        <div v-show="show_pick_modal" class="modal">
            <div>
                <table-fixed v-if="tableData_all && tableData_all.length>0" :value="tableData_all" :checked="checked_deal" :columns="columns"></table-fixed> 
                <div v-else>暂无数据</div>
            </div> 
            <div class="pd30 pdb40">
                <button class="btn-normal bg-blue" @click="confirmDeal">确 定</button>
            </div>
        </div>

        <div>
            <table-fixed v-if="tableData_deal && tableData_deal.length>0" :readonly="true" :value="tableData_deal" :checked="checked" :columns="columns"></table-fixed> 
            <div v-else>暂无数据</div>
        </div> 

        <div class="pd30 pdb40">
            <button v-if="!nextFlag" class="btn-normal bg-blue" @click="confirmDeal">确 定</button>
            <button v-else :disabled="disabled" class="btn-normal btn-plain" @click="toNext">下一条</button>            
        </div>

        
        
       
    </div>
</template>
<script>
    import TableFixed from '../../../../ui/table-fixed.vue'
    const API = require('api')
    const Dict = require('dict')
    

    export default {
        components: { TableFixed },  
        data() {
            return {
                matchInfo: {},
                height: '3rem',
                info_main: '',
                details: [],
                columns: ['合约', '委托方向', '价格', '数量', '指令状态', '成交数量', '市场','下达人', '交易员'],
                tableData:[{
                    contract:'L1709',
                    direction: '买入开仓',//
                    price: '4448.0',
                    amount: '1200',
                    state: '已完成',
                    deal_amount: '1200',
                    market: '上期所',
                    operator: '李雷',
                    dealer: '韩梅梅'
                }, {
                    contract:'L1734',
                    direction: '买入开仓',//
                    price: '4438.0',
                    amount: '1140',
                    state: '已完成',
                    deal_amount: '987',
                    market: '上期所',
                    operator: '李雷',
                    dealer: '韩梅梅'
                }, {
                    contract:'L1104',
                    direction: '买入开仓',//
                    price: '2138.0',
                    amount: '5670',
                    state: '已完成',
                    deal_amount: '1350',
                    market: '上期所',
                    operator: '李雷',
                    dealer: '韩梅梅'
                }],
                deals: [],
                checked: [],
                checked_deal: [],                
                show_pick_modal: false,
                pageSize: 10,
                currentPage: 1,
                dealList: [],
                nextFlag: false,
                disabled: false,
                preconts: [],
                index: 0,
                tableData_all: [],
                tableData_deal: [],
                scrollTop: 0

            }
        },
        watch: {
            dealList: {
                deep: true,
                handler(val) {
                    var that = this;
                    that.tableData_all = that.setTableData(val);
                    that.deals = [];
                    that.checked_deal.forEach(function(deal) {
                        that.deals.push(that.dealList[deal])
                    })
                }
            },
            show_pick_modal(val) {
                if(!val) {
                    this.permitScroll();
                }
            }
        },
        methods: {
            permitScroll() {
                API.permitScroll()
                window.scrollTo(0, this.scrollTop);
            },
            setTableData(array) {
                var result = [];
                var that = this;

                array.forEach(function(d, i) {
                    let item = {};

                    item.reportCode = d.reportCode;
                    item.entrustDirection = that.getByValue('entrustDirection', d.entrustDirection);
                    item.insPrice = d.insPrice;
                    item.insAmount = d.insAmount;
                    item.insStatus = that.getByValue('insStatus', d.insStatus);
                    item.dealAmount = d.dealAmount;
                    item.marketNo = that.getByValue('marketNo', d.marketNo);
                    item.directOperatorName = d.directOperatorName;
                    item.tradeOperatorName = d.tradeOperatorName;
                    result.push(item);
                    that.checked.push(i);
                })
                return result;
            },
            // getFundIdStr(array) {
            //     var that = this;
            //     let str = '';
            //     array.forEach(function(item, index) {
            //         if(that.checkValid(item.fundId)) {
            //             str += item.fundId + ',';
            //         }
            //     })
            //     str = str.substring(0,str.length-2);
            //     return str;
            // },
            showPickModal() {
                var that = this;
                // var fundIdStr = that.matchInfo.realdealList && that.matchInfo.realdealList.length > 0 ? that.getFundIdStr(that.matchInfo.realdealList) : '';
                API.realdealQuery({
                    pageSize: that.pageSize,
                    currentPage: that.currentPage,
                    precontId: that.matchInfo.precontId
                }).then(function(data) {
                    that.dealList = data;
                    //选中状态
                    that.dealList.forEach(function(deal, idx) {
                        that.deals.forEach(function(c,i) {
                            if(deal.insId === c.insId) {
                                if(that.checked_deal.indexOf(idx)==-1) {
                                    that.checked_deal.push(idx);
                                }
                                
                                console.log(that.checked_deal)
                            }
                        })
                    })
                })
                
                this.show_pick_modal = true;
                this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                // API.forbidScroll();
            },
            confirmDeal() {
                var that = this;

                //提交编辑的匹配信息
                var realdealList = [];
                that.checked_deal.forEach(function(deal) {
                    let item = {}
                    item.foreignmarketFlag = that.dealList[deal].foreignmarketFlag;
                    item.insId = that.dealList[deal].insId;
                    item.insStockId = that.dealList[deal].insStockId;
                    realdealList.push(item); 
                })

                API.contInsMatch({ 
                    precontId: that.matchInfo.precontId,
                    realdealList: realdealList 
                }).then(function(data) {
                    that.show_pick_modal = false;
                    that.nextFlag = true;
                })
            },
            getByValue(dict, value) {
                return Dict.getByValue(dict, value);
            },
            commit() {

            },
            toNext() {
                var precontId = this.preconts[this.index+1].precontId;
                this.getMatchInfo(precontId);
            },
            getMatchInfo(precontId) {
                var that = this;
                API.contMatchInfoQuery({ contId: precontId }).then(function(data) {
                    that.matchInfo = data;
                    that.info_main = that.setInfoStr(data);

                    var details = data.detailList;
                    details.forEach(function(detail,index) {
                        that.details.push(that.setInfoStr(detail));
                    })
                    if(data.realdealList && data.realdealList.length > 0) {
                        that.deals = data.realdealList;
                        that.tableData_deal = that.setTableData(data.realdealList);
                    }
                })
            },
            // checkValid(str) {
            //     if(str == null || !str || new RegExp("^[ ]+$").test(str)) {
            //         return true
            //     } else {
            //         return false
            //     }
            // },
            checkValid(str) {
                if((!str && typeof str!=='number') || new RegExp("^[]+$").test(str)) {
                    return false
                } else {
                    return true
                }
            },
            setInfoStr(obj) {
                var str = '';
                for(var key in obj) {
                    if(typeof obj[key] !== 'object') {
                        if(this.checkValid(obj[key])) {
                            str += obj[key] + '，';
                        }
                    }
                }
                str = str.substring(0, str.length-2)
                return str;
            }
        },
        mounted () {
            document.body.addEventListener('touchstart', function () { });
            var that = this;
            that.preconts = JSON.parse(this.$route.query.preconts);
            var preconts = that.preconts;
            that.index = this.$route.query.index;
            var index = that.index;
            if(index == preconts.length - 1) {
                this.disabled = true;
            } else {
                this.disabled = false;
            }
            
            if(that.$route.query.precontId) {
                var precontId = that.$route.query.precontId;
                this.getMatchInfo(precontId);
            }
        },
        afterHide () {
            API.permitScroll();
        }
    }
</script>
<style lang="less" scoped>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 1;
        background: #F9F9F9;
        padding-top: 0.3rem;
    }

    .edit-bar {
        padding: 0 0.3rem 0.1rem 0.3rem;
        line-height: 0.42rem;
        color: #F56778;
    }
    .edit-bar span {
        color: #4A4A4A;
    }
</style>
