
<template>
    <div>
        <div class="edit-bar fs30">
            <span>合同明细</span>
        </div>
        <div class="line"></div>

        <div v-for="(item,index) in details" :key="index" >
            <div class="cell">
                <input readonly :value="index+1+'/'+item" class="w100 detail-input">
            </div>
            <div class="line" :class="[{'line-left': index<details.length-1},{'mb30': index===details.length-1}]"></div>
            
        </div>
        

        <div class="line"></div>
        <li class="cell pdr20">
            <span class="text-label inline-b">匹配指令</span>
            <div class="fright">
                <span class="text-sub inline-b">选择</span>
                <img src="../../../../images/more.svg" class="icon-more fright ml22" />
            </div>
        </li>
        <div class="line mb30"></div>  

        <div>
            <table-fixed :value="tableData" :checked="checked" :columns="columns" :height="height"></table-fixed> 
        </div> 

        <!-- <div class="btn-wrap">
            <button class="btn-normal btn-blue">确 定</button>
        </div> -->
        <div class="pd30 pdb40">
            <button class="btn-normal bg-blue" @click="toNext">确 定</button>
        </div>

        
        
       
    </div>
</template>
<script>
    import TableFixed from '../../../../ui/table-fixed.vue'
    export default {
        components: {TableFixed},  
        data(){
            return {
                height: '3rem',
                details: ['品牌，牌号，分类，数量，币种，短溢装，备注','品牌，牌号，分类，数量，币种，短溢装，备注'],
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
                checked: [0,2]

            }
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
    .edit-bar span {
        color: #4A4A4A;
    }
</style>
