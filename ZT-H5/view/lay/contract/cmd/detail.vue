
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
                <table-fixed v-if="tableData_all && tableData_all.length>0" :value="tableData_all" :checked="checked_cmd" :columns="columns"></table-fixed> 
                <div v-else>暂无数据</div>
            </div> 
            <div class="pd30 pdb40">
                <button class="btn-normal bg-blue" @click="confirmCmd">确 定</button>
            </div>
        </div>

        <div>
            <table-fixed v-if="tableData_cmd && tableData_cmd.length>0" :readonly="true" :value="tableData_cmd" :checked="checked" :columns="columns"></table-fixed> 
            <div v-else>暂无数据</div>
        </div> 

        <div class="pd30 pdb40">
            <button v-if="!nextFlag" class="btn-normal bg-blue" @click="confirmCmd">确 定</button>
            <button v-else-if="!isBack" class="btn-normal btn-plain" @click="toNext">下一条</button>
            <!-- <button v-else class="btn-normal bg-blue" @click="back">返 回</button>                                    -->
        </div>

        
        
       
    </div>
</template>
<script>
    import TableFixed from '../../../../ui/table-fixed.vue'
    const API = require('api')
    const Dict = require('dict')
    import App from "light"
    

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
                cmds: [],
                checked: [],
                checked_cmd: [],                
                show_pick_modal: false,
                pageSize: 10,
                currentPage: 1,
                cmdList: [],
                // insStatus: ['1','3','2'],
                nextFlag: false,
                isBack: false,
                disabled: false,
                preconts: [],
                index: 0,
                tableData_all: [],
                tableData_cmd: [],
                scrollTop: 0

            }
        },
        watch: {
            cmdList: {
                deep: true,
                handler(val) {
                    var that = this;
                    that.tableData_all = that.setTableData(val);
                    that.cmds = [];
                    that.checked_cmd.forEach(function(cmd) {
                        that.cmds.push(that.cmdList[cmd])
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
            getFundIdStr(array) {
                var that = this;
                let str = '';
                array.forEach(function(item, index) {
                    if(that.checkValid(item.fundId)) {
                        str += item.fundId + ',';
                    }
                })
                str = str.substring(0,str.length-2);
                return str;
            },
            showPickModal() {
                var that = this;
                var fundIdStr = that.matchInfo.insList && that.matchInfo.insList.length > 0 ? that.getFundIdStr(that.matchInfo.insList) : '';
                API.insQuery({
                    pageSize: that.pageSize,
                    currentPage: that.currentPage,
                    precontId: that.matchInfo.precontId
                }).then(function(data) {
                    that.cmdList = data;//注意选择状态，顺序变了
                    //选中状态
                    that.cmdList.forEach(function(cmd, idx) {
                        that.cmds.forEach(function(c,i) {
                            if(cmd.insId === c.insId) {
                                if(that.checked_cmd.indexOf(idx)==-1) {
                                    that.checked_cmd.push(idx);
                                }
                                
                            }
                        })
                    })
                })
                
                this.show_pick_modal = true;
                this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                // API.forbidScroll();
            },
            confirmCmd() {
                var that = this;

                //提交编辑的匹配信息
                var insList = [];
                that.checked_cmd.forEach(function(cmd) {
                    let item = {}
                    item.foreignmarketFlag = that.cmdList[cmd].foreignmarketFlag;
                    item.insId = that.cmdList[cmd].insId;
                    item.insStockId = that.cmdList[cmd].insStockId;
                    insList.push(item); 
                })

                API.contInsMatch({ 
                    precontId: that.matchInfo.precontId,
                    insList: insList 
                }).then(function(data) {
                    that.show_pick_modal = false;
                    that.nextFlag = true;
                    if(that.isBack) {
                        App.navigate('lay/contract/query/list')
                    }
                })
            },
            getByValue(dict, value) {
                return Dict.getByValue(dict, value);
            },
            back() {
                App.navigate('lay/contract/query/list');
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
                    if(data.insList && data.insList.length > 0) {
                        that.cmds = data.insList;
                        that.tableData_cmd = that.setTableData(data.insList);
                    }
                })
            },
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
        mounted() {
            document.body.addEventListener('touchstart', function () { });
            var that = this;
            
            if(that.$route.query.precontId) {
                var precontId = that.$route.query.precontId;
                this.getMatchInfo(precontId);
            }

            if(this.$route.query.preconts) {
                that.preconts = JSON.parse(this.$route.query.preconts);
                var preconts = that.preconts;
                that.index = this.$route.query.index;
                var index = that.index;
                if(index == preconts.length - 1) {
                    this.disabled = true;
                } else {
                    this.disabled = false;
                }
                this.isBack = false;
            } else {
                this.isBack = true;
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
