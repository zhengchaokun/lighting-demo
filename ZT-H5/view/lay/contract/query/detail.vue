
<template>
    <div>
        <div class="edit-bar flex fs30">
            <span class="fs-bold">合同主体</span><span class="flex1 ml20"> /点击编辑</span>
            <span class="text-error" @click="deleteMain">删除</span>
        </div>
        <div class="line"></div>
        <textarea readonly :value="main" class="detail-textarea" style="height: 1.2rem;"></textarea>
        <div class="line mb30"></div>

        <div v-for="(detail,index) in details" :key="index">
            <div class="edit-bar flex fs30">
                <span>合同明细{{index+1}}</span><span class="flex1 ml20">/点击编辑</span>
                <span class="text-error" @click="deleteDetail(detail)">删除</span>
            </div>
            <div class="line"></div>
            <textarea readonly :value="detail" class="detail-textarea" style="height: 1.2rem;"></textarea>
            <div class="line mb30"></div> 
        </div>

        <div class="edit-bar flex fs30">
            <span>匹配指令</span><span class="flex1 ml20">/点击编辑</span>
            <!-- <span class="text-error" @click="deleteMatch">删除</span> -->
        </div>
        <div class="line"></div>
        <textarea readonly :value="matchInfo.remark" class="detail-textarea" style="height: 1.2rem;"></textarea>
        <div class="line mb30"></div>

        <div class="pd30 pdb40" style="margin-top: 1.06rem">
            <button class="btn-normal bg-blue" @click="back">返 回</button>
        </div>
        
    </div>
</template>
<script>
    import App from "light"
    import API from "../../../../lib/api"
    const Dialog = require("dialog")
    export default {
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
                matchInfo: {}
            }
        },
        methods: {
            back() {
                App.navigate("lay/contract/query/list")
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
            console.log(params.item);
            //查询策略
            var strategy = {};
            API.strategyQuery({deptId:params.item.deptId}).then(function(data) {
                strategy = data[0];
                let direction = params.item.spotOpenDirection=='1' ? '采购' : '销售';
                that.main = '杭城善时' + '，' + strategy.strategyName + '，' + strategy.strategyId + '，' + direction;
                var details = params.item.details;
                details.forEach(function(d) {
                    that.details.push(d.brandName + '，' + d.grade + '，' + d.spotType + '，' + d.tradeAmount + '，' + d.tradeCurrencyNo + '，' + d.moreorlessProportion + '，' + d.remark)
                })
            })
            API.contMatchInfoQuery({contId:params.item.preContId}).then(function(data) {
               that.matchInfo = data;
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
