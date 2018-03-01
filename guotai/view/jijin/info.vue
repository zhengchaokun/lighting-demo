
<template>
    <div>
        <scroller class="pd20">
            <div class="info-table">
                <div class="flex-row">
                    <div class="info-table-head"><text class="info-table-head-text">基金名称</text></div>
                    <div class="info-table-data"><text class="info-table-data-text">国泰利是宝货币</text></div>
                </div>
                <div class="flex-row">
                    <div class="flex-row flex-1">
                        <div class="info-table-head"><text class="info-table-head-text">基金代码</text></div>
                        <div class="info-table-data"><text class="info-table-data-text">003515</text></div>
                    </div>
                    <div class="flex-row flex-1">
                        <div class="info-table-head"><text class="info-table-head-text">托管方</text></div>
                        <div class="info-table-data"><text class="info-table-data-text">兴业银行</text></div>
                    </div>
                </div>
                <div class="flex-row">
                    <div class="flex-row flex-1">
                        <div class="info-table-head"><text class="info-table-head-text">基金经理</text></div>
                        <div class="info-table-data"><text class="info-table-data-text">韩哲昊</text></div>
                    </div>
                    <div class="flex-row flex-1">
                        <div class="info-table-head"><text class="info-table-head-text">成立时间</text></div>
                        <div class="info-table-data"><text class="info-table-data-text">2016年12月22日</text></div>
                    </div>
                </div>
                <div class="flex-row">
                    <div class="flex-row flex-1">
                        <div class="info-table-head"><text class="info-table-head-text">运作方式</text></div>
                        <div class="info-table-data"><text class="info-table-data-text">契约型开放式</text></div>
                    </div>
                    <div class="flex-row flex-1">
                        <div class="info-table-head"><text class="info-table-head-text">基金类型</text></div>
                        <div class="info-table-data"><text class="info-table-data-text">货币型</text></div>
                    </div>
                </div>
            </div>

            <div class="info-title">
                <div class="info-title-indicator"></div>
                <text class="info-title-text">投资目标</text>
            </div>
            <text class="info-content">在保持基金资产的低风险和高流动性的前提下，力争实现超越业绩比较基准的投资回报。</text>
            
            <div class="info-title">
                <div class="info-title-indicator"></div>
                <text class="info-title-text">投资策略</text>
            </div>
            <text class="info-content">（1）滚动配置策略
    本基金将根据具体投资品种的市场特性采用持续投资的方法，既能提高基金资产变现能力的稳定性，又能保证基金资产收益率与市场利率的基本一致。
    （2）久期控制策略 
    本基金将根据对货币市场利率趋势的判断来配置基金资产的久期。在预期利率上升时，缩短基金资产的久期，以规避资本损失或获得较高的再投资收益；在预期利率下降时，延长基金资产的久期，以获取资本利得或锁定较高的收益率。 
    （3）套利策略
    套利策略包括跨市场套利和跨品种套利。跨市场套利是利用同一金融工具在各个子市场的不同表现进行套利。跨品种套利是利用不同金融工具的收益率差别，在满足基金自身流动性、安全性需要的基础上寻求更高的收益率。 
    （4）时机选择策略 
    股票、债券发行以及年末效应等因素可能会使市场资金供求情况发生暂时失衡，从而推高市场利率。充分利用这种失衡就能提高基金资产的收益率。 
    （5）逆回购策略 
    基金管理人将密切关注由于新股申购等原因导致的短期资金需求激增的机会，通过逆回购的方式融出资金以分享短期资金拆借利率陡升的投资机会。 
    （6）资产支持证券投资策略 
    当前国内资产支持证券主要为以银行贷款资产、住房抵押贷款等作为基础资产的信贷资产证券化产品，本基金侧重于对基础资产质量及未来现金流的分析，采用基本面分析和数量化模型相结合，对个券进行风险分析和价值评估后进行投资。本基金将严格控制资产支持证券的投资比例、信用等级并密切跟踪评级变化，采用分散投资方式以降低流动性风险。</text>
            
            <div class="info-title">
                <div class="info-title-indicator"></div>
                <text class="info-title-text">投资范围</text>
            </div>
            <text class="info-content">本基金投资于法律法规及监管机构允许投资的金融工具，包括现金，期限在一年以内（含一年）的银行存款、债券回购、中央银行票据、同业存单，剩余期限在397天以内（含397天）的债券、非金融企业债务融资工具、资产支持证券，以及中国证监会、中国人民银行认可的其他具有良好流动性的货币市场工具。
    如果法律法规或监管机构以后允许货币市场基金投资其他品种，基金管理人在履行适当程序后可以将其纳入投资范围。</text>
            
            <div class="info-title">
                <div class="info-title-indicator"></div>
                <text class="info-title-text">业绩比较基准</text>
            </div>
            <text class="info-content">同期七天通知存款利率（税后）</text>
            
            <div class="info-title">
                <div class="info-title-indicator"></div>
                <text class="info-title-text">风险收益特征</text>
            </div>
            <text class="info-content">本基金为货币市场证券投资基金，是证券投资基金中的低风险品种。本基金的预期风险和预期收益低于股票型基金、混合型基金、债券型基金。</text>
        </scroller>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style lang="less">
    .info-table {
        border-color: #9a9a9a;
        border-left-width: 1px;
        border-top-width: 1px;
    }
    .info-table-head {
        border-color: #9a9a9a;
        border-right-width: 1px;
        border-bottom-width: 1px;
        padding: 12px;
        justify-content: center;
        width: 144px;
    }
    .info-table-data {
        border-color: #9a9a9a;
        border-right-width: 1px;
        border-bottom-width: 1px;
        padding: 12px;
        justify-content: center;
        flex: 1;
    }
    .info-table-head-text {
        font-size: 28px;
        color: #3a3a3a;
    }
    .info-table-data-text {
        font-size: 28px;
        color: #6a6a6a;
        line-height: 36px;
    }
    .info-title {
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .info-title-indicator {
        width: 12px;
        height: 40px;
        background-color: #d41437;
    }
    .info-title-text {
        line-height: 60px;
        font-size: 32px;
        color: #3a3a3a;
        margin-left: 10px;
    }
    .info-content {
        line-height: 52px;
        font-size: 32px;
        color: #3a3a3a;
        margin-left: 5px;
    }
</style>
