
<template>
    <div>
        <div class="edit-bar flex ">
            <span class="flex1">合同主体</span>
            <span @click="toNext('step1')">编辑</span>
        </div>
        <div class="line"></div>
        <textarea readonly v-model="info_body" class="detail-textarea" style="height: 1.6rem;"></textarea>
        <div class="line mb30"></div>
        <div class="edit-bar flex">
            <span class="flex1">物资明细</span>
            <span @click="toNext('step2')">编辑</span>
        </div>
        <div class="line"></div>
        <textarea readonly v-model="info_detail" class="detail-textarea" style="height: 1.6rem;"></textarea>
        <div class="line"></div> 
        <div class="pd30 pdb40 flex btn-wrap-two">
            <button class="btn-normal flex1 mr30 bg-green" @click="toNext('step1')">继续添加</button>
            <button class="btn-normal flex1 bg-blue" @click="showConfirm=true">确 定</button>
        </div>
    </div>
</template>
<script>
    import App from "light";
    export default {
        data(){
            return {
                info_body: '杭实善成，PE策略1号，PE，采购',
                info_detail: '品牌，牌号，分类，数量，币种，短溢装，备注',
                showConfirm: false
            }
        },
        methods: {
            toNext(view) {
                App.navigate("lay/contract/add/"+view);
            }
        }
    }
</script>
<style lang="less">
    .edit-bar {
        padding: 0.1rem 0.3rem;
        justify-content: space-between;
    }
    .edit-bar span {
        font-size: 0.3rem;
        color: #4A4A4A;
        letter-spacing: 0;
        line-height: 0.42rem;
    }
    .edit-bar span:last-child {
        color: #9B9B9B;
    }
    .btn-wrap-two {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 0.3rem 0.4rem 0.3rem;
    }
</style>
