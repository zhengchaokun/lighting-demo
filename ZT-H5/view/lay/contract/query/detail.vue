
<template>
    <div>
        <div class="edit-bar flex fs30">
            <span class="fs-bold">合同主体</span><span class="flex1 ml20"> /点击编辑</span>
            <span class="text-error">删除</span>
        </div>
        <div class="line"></div>
        <textarea readonly :value="body.info" class="detail-textarea" style="height: 1.2rem;"></textarea>
        <div class="line mb30"></div>

        <div v-for="(detail,index) in body.details" :key="index">
            <div class="edit-bar flex fs30">
                <span>合同明细{{index+1}}</span><span class="flex1 ml20">/点击编辑</span>
                <span class="text-error">删除</span>
            </div>
            <div class="line"></div>
            <textarea readonly :value="detail" class="detail-textarea" style="height: 1.2rem;"></textarea>
            <div class="line mb30"></div> 
        </div>

        <div class="edit-bar flex fs30">
            <span>匹配指令</span><span class="flex1 ml20">/点击编辑</span>
            <span class="text-error">删除</span>
        </div>
        <div class="line"></div>
        <textarea readonly :value="body.info" class="detail-textarea" style="height: 1.2rem;"></textarea>
        <div class="line mb30"></div>

        <div class="pd30 pdb40" style="margin-top: 1.06rem">
            <button class="btn-normal bg-blue" @click="back">返 回</button>
        </div>
        
    </div>
</template>
<script>
    import App from "light"
    export default {
        data(){
            return {
                body: {
                    info:'杭实善成，PE策略1号，PE，采购',
                    details: [
                        '品牌，牌号，分类，数量，币种，短溢装，备注',
                        '品牌，牌号，分类，数量，币种，短溢装，备注'
                    ]
                }
            }
        },
        methods: {
            back() {
                App.navigate("lay/contract/query/list")
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
