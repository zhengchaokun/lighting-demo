
<template>
    <div>
        <div class="edit-bar flex fs30">
            <span class="fs-bold">合同主体</span><span class="flex1 ml20" @click="toEdit('main')"> /点击编辑</span>
            <span class="text-error" @click="deleteMain">删除</span>
        </div>
        <div class="line"></div>
        <textarea readonly :value="main" class="detail-textarea" style="height: 1.2rem;"></textarea>
        <div class="line mb30"></div>

        <div v-for="(detail,index) in details" :key="index">
            <div class="edit-bar flex fs30">
                <span>合同明细{{index+1}}</span><span class="flex1 ml20" @click="toEdit('detail')">/点击编辑</span>
                <span class="text-error" @click="deleteDetail(detail)">删除</span>
            </div>
            <div class="line"></div>
            <textarea readonly :value="detail" class="detail-textarea" style="height: 1.2rem;"></textarea>
            <div class="line mb30"></div> 
        </div>

        <div class="edit-bar flex fs30">
            <span>匹配指令</span><span class="flex1 ml20" @click="toEdit('match')">/点击编辑</span>
        </div>

        <template v-if="matchInfo=={}">
            <div class="line"></div>
            <textarea readonly value="没有匹配指令" class="detail-textarea" style="height: 1.2rem;"></textarea>
            <div class="line mb30"></div>
        </template>
        <template v-else>
            <div>
                <table-fixed :readonly="true" :value="matchInfo" :checked="checked" :columns="columns"></table-fixed> 
            </div> 
        </template>
        

        <div class="pd30 pdb40" style="margin-top: 1.06rem">
            <button class="btn-normal bg-blue" @click="back">返 回</button>
        </div>
        
    </div>
</template>
<script>
    import App from "light"
    import API from "../../../../lib/api"
    import TableFixed from '../../../../ui/table-fixed.vue'

    const Dialog = require("dialog")
    const Dict = require('dict')
    export default {
        components: {TableFixed},  
        data(){
            return {
                // body: {
                //     main:'杭实善成，PE策略1号，PE，采购',
                //     details: [
                //         '品牌，牌号，分类，数量，币种，短溢装，备注',
                //         '品牌，牌号，分类，数量，币种，短溢装，备注'
                //     ]
                // },
                main: '',
                details: [],
                matchInfo: [],
                columns: ['合约', '委托方向', '价格', '数量', '指令状态', '成交数量', '市场','下达人', '交易员'],
                checked: [0,1]
            }
        },
        methods: {
            back() {
                App.navigate("lay/contract/query/list")
            },
            toEdit(type) {
                if(type=='main') {
                    App.navigate("lay/contract/add/step1")
                } else if(type=='detail') {
                    App.navigate("lay/contract/add/step2")
                } else {
                    App.navigate("lay/contract/cmd/detail")
                }
            },
            deleteMain() {
                var that = this;
                Dialog.confirm({
                    msg:'确定删除？',
                    confirmText:"取消",
                    cancelText:"删除",
                    cancel(){
                        console.log('success')
                        API.contMainDelete({precontId:that.main.contId}).then(function(data){
                            Dialog.alert("删除成功！");
                            App.navigate("lay/contract/query/list")
                        })
                    },
                    confirm() {
                        return true
                    }
                })
            },
            deleteDetail(d) {

            },
            deleteMatch() {

            }
        },
        beforeRender(params) {
            var that = this;
            //查询预合同匹配信息
            API.contMatchInfoQuery({contId:params.preContId}).then(function(data) {

                if(data && data.insList) {
                    data.insList.forEach(function(d, i) {
                        let item = {};
                        item.reportCode = d.reportCode;
                        Object.keys(Dict.entrustDirection).forEach(function(key){
                            if(d.entrustDirection == Dict.entrustDirection[key]) {
                                item.entrustDirection = key;
                            }
                        });
                        item.insPrice = d.insPrice;
                        item.insAmount = d.insAmount;
                        Object.keys(Dict.insStatus).forEach(function(key){
                            if(d.insStatus == Dict.insStatus[key]) {
                                item.insStatus = key;
                            }
                        });
                        item.dealAmount = d.dealAmount;
                        Object.keys(Dict.marketNo).forEach(function(key){
                            if(d.marketNo == Dict.marketNo[key]) {
                                item.marketNo = key;
                            }
                        });
                        item.directOperatorName = d.directOperatorName;
                        item.tradeOperatorName = d.tradeOperatorName;

                        that.matchInfo.push(item);
                       
                    })
                } else {
                    that.matchInfo = {};
                }
                //查询策略
                API.strategyQuery({deptId:params.precontId}).then(function(data1) {
                    let strategy = '';
                    data1.forEach(function(d) {
                        strategy += d.strategyName+'，';
                    })
                    console.log(data)
                    let direction = data1.spotOpenDirection=='1' ? '采购' : '销售';
                    that.main = '杭城善时' + '，' + strategy + direction;
                    var details = data.detailList;
                    details.forEach(function(d) {
                        that.details.push(d.brandName + '，' + d.grade + '，' + d.spotType + '，' + d.tradeAmount + '，' + d.tradeCurrencyNo + '，' + d.moreorlessProportion + '，' + d.remark)
                    })
                })
            })
            

            
            
        }
    }
</script>
<style lang="less" scoped>
    .edit-bar {
        padding: 0 0.3rem 0.1rem 0.3rem;
        line-height: 0.42rem;
        letter-spacing: 0;
        color: #F56778;
    }
    .edit-bar span:first-child {
        color: #4A4A4A;
    }
    .edit-bar span:nth-child(2) {
        color: #9B9B9B;
    }
   

    .detail-textarea {
        font-size: 0.3rem;
        color: #787878;
        letter-spacing: -0.0072rem;
        line-height: 0.42rem;
    }
</style>
