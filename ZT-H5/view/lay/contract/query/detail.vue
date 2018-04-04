
<template>
    <div>
        <div class="edit-bar flex fs30">
            <span class="fs-bold">合同主体</span><span class="flex1 ml20" @click="toEdit('main')"> /点击编辑</span>
            <span class="text-error" @click="deleteInfo('main')">删除</span>
        </div>
        <div class="line"></div>
        <textarea readonly :value="info_main" class="detail-textarea" style="height: 1.2rem;"></textarea>
        <div class="line mb30"></div>

        <div v-for="(detail,index) in info_details" :key="index">
            <div class="edit-bar flex fs30">
                <span>合同明细{{index+1}}</span><span class="flex1 ml20" @click="toEdit('detail', details[index])">/点击编辑</span>
                <span class="text-error" @click="deleteInfo('detail', detail)">删除</span>
            </div>
            <div class="line"></div>
            <textarea readonly :value="detail" class="detail-textarea" style="height: 1.2rem;"></textarea>
            <div class="line mb30"></div> 
        </div>

        <div class="edit-bar flex fs30">
            <span class="fs-bold">匹配指令</span><span class="flex1 ml20" @click="toEdit('cmd')"> /点击编辑</span>
        </div>
        

        <template v-if="matchInfo=={}">
            <div class="line"></div>
            <textarea readonly value="暂无匹配指令" class="detail-textarea" style="height: 1.2rem;"></textarea>
            <div class="line mb30"></div>
        </template>
        <template v-else>
            <table-fixed :readonly="true" :value="cmds" :checked="checked" :columns="columns"></table-fixed> 
            <div class="line mb30"></div>
        </template>
        

        <div class="pd30 pdb40">
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
                info_main: '',
                info_details: [],
                info_cmds: [],
                details: [],
                cmds: [],
                matchInfo: {},
                columns: ['合约', '委托方向', '价格', '数量', '指令状态', '成交数量', '市场','下达人', '交易员'],
                checked: [0,1]
            }
        },
        methods: {
            getByValue(dict, value) {
                return Dict.getByValue(dict, value);
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
                str = str.substring(0, str.length-1)
                return str;

            },
            back() {
                App.navigate("lay/contract/query/list")
            },
            toEdit(type, detail) {
                if(type == 'main') {
                    App.navigate("lay/contract/add/step1", { 
                        precont: JSON.stringify(this.matchInfo),
                        page: 'detail' 
                    })
                } else if(type == 'detail') {
                    App.navigate("lay/contract/add/step2", {
                        precont: JSON.stringify(this.matchInfo),
                        detail:  JSON.stringify(detail),
                        formalInfo: this.info_main,
                        page: 'detail'
                    })
                } else {
                    App.navigate("lay/contract/cmd/detail", { precont: JSON.stringify(this.matchInfo)})
                }
            },
            deleteInfo(type, detail) {
                var that = this;
                Dialog.confirm({
                    msg:'确定删除？',
                    confirmText:"取消",
                    cancelText:"删除",
                    cancel(){
                        if(type=='main') {
                            API.contMainDelete({ precontId: that.matchInfo.precontId}).then(function(data){
                                Dialog.alert("删除成功！");
                                App.navigate("lay/contract/query/list");
                            })
                        } else {
                            API.contDetailDelete({ 
                                precontId: that.matchInfo.precontId,
                                goodsId: detail.goodsId
                            }).then(function(data){
                                Dialog.alert("删除成功！");
                                //更新预合同信息
                                API.contMatchInfoQuery({ contId: that.precontId}).then(function(data) {
                                    that.matchInfo = data;
                                });

                            })
                        }
                        
                    },
                    confirm() {
                        return true
                    }
                })
            }
        },
        watch: {
            matchInfo: {
                deep: true,
                handler(val) {
                    var data = val;
                    var that = this;
                    that.info_main = that.setInfoStr(data);

                    that.details = data.detailList;
                    that.info_details = [];
                    that.details.forEach(function(d) {
                        that.info_details.push(that.setInfoStr(d));
                    })

                    if(data.insList && data.insList.length>0) {
                        that.cmds = [];
                        data.insList.forEach(function(d, i) {
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
                            that.cmds.push(item);
                        })
                    }
                }
            }
        },
        mounted() {
            if(this.$route.query.precontId) {
                var that = this;
                that.precontId = this.$route.query.precontId;
                //查询预合同匹配信息
                API.contMatchInfoQuery({ contId: that.precontId}).then(function(data) {
                    that.matchInfo = data;
                    // that.info_main = that.setInfoStr(data);

                    // that.details = data.detailList;
                    // that.details.forEach(function(d) {
                    //     that.info_details.push(that.setInfoStr(d));
                    // })

                    // if(data.insList) {
                    //     data.insList.forEach(function(d, i) {
                    //         let item = {};

                    //         item.reportCode = d.reportCode;
                    //         item.entrustDirection = that.getByValue('entrustDirection', d.entrustDirection);
                    //         item.insPrice = d.insPrice;
                    //         item.insAmount = d.insAmount;
                    //         item.insStatus = that.getByValue('insStatus', d.insStatus);
                    //         item.dealAmount = d.dealAmount;
                    //         item.marketNo = that.getByValue('marketNo', d.marketNo);
                    //         item.directOperatorName = d.directOperatorName;
                    //         item.tradeOperatorName = d.tradeOperatorName;

                    //         that.cmds.push(item);
                    //     })
                    // }
                        
                    
                    //查询策略
                    // API.strategyQuery({deptId:params.precontId}).then(function(data1) {
                    //     let strategy = '';
                    //     data1.forEach(function(d) {
                    //         strategy += d.strategyName+'，';
                    //     })
                    //     console.log(data)
                    //     let direction = data1.spotOpenDirection=='1' ? '采购' : '销售';
                    //     that.main = '杭城善时' + '，' + strategy + direction;
                    //     var details = data.detailList;
                    //     details.forEach(function(d) {
                    //         that.details.push(d.brandName + '，' + d.grade + '，' + d.spotType + '，' + d.tradeAmount + '，' + d.tradeCurrencyNo + '，' + d.moreorlessProportion + '，' + d.remark)
                    //     })
                    // })
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .edit-bar {
        padding: 0 0.3rem 0.1rem 0.3rem;
        line-height: 0.42rem;
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
        line-height: 0.42rem;
    }
</style>
