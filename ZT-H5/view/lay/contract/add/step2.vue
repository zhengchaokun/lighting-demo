
<template>
    <div>
        <div class="line"></div>
        <textarea readonly v-model="formalInfo" class="detail-textarea" style="height: 1.6rem;"></textarea>
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell pdr20">
            <span class="text-label inline-b">币种</span>
            <div class="fright">
                <span class="text-sub inline-b">选择</span>
                <img src="../../../../images/more.svg" class="icon-more fright ml22" />
            </div>
        </div>    
        <div class="line mb30"></div>
        <div class="mb20 tright pdr30 text-link" @click="showModal=true">
            快捷输入
        </div>
        <div class="line"></div>
        <div class="cell flex">
            <span class="text-label mr30">品牌</span>
            <input class="flex1">
        </div> 
        <div class="line mb30"></div> 
        <div class="line"></div>        
        <div class="cell flex">
            <span class="text-label mr30">牌号</span>
            <input class="flex1">
        </div> 
        <div class="line mb30"></div>
        <div class="line"></div>
        
        <div class="cell flex">
            <span class="text-label mr30">分类</span>
            <input class="flex1">
        </div> 
        <div class="line mb30"></div>
        <div class="line"></div>
        
        <div class="cell flex">
            <span class="text-label mr30">数量</span>
            <input class="flex1">
        </div> 
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell flex">
            <span class="text-label mr30">价格</span>
            <input class="flex1">
        </div> 
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell flex">
            <span class="text-label mr30">短溢表</span>
            <input class="flex1">
        </div> 
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell pdr30 flex" style="height: 1.48rem;">
            <textarea class="flex1" style="height: 1rem;" placeholder="备注" wrap="physical"></textarea>
        </div>
        <div class="line"></div>
        <div class="pd30 pdb40">
            <button class="btn-normal bg-blue" @click="toNext">下一步</button>
        </div>
        <div class="modal" v-show="showModal">
            <div class="detail-list clear">
                <span class="text-small">品牌</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../../images/radio-selected.svg">
                <span class="text-small">，牌号</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../../images/radio-selected.svg">
                <span class="text-small">，分类</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../../images/radio-selected.svg">
                <span class="text-small">，数量</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../../images/radio-selected.svg">
                <span class="text-small">，价格</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../../images/radio-selected.svg">
                <span class="text-small">，短溢表</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../../images/radio-selected.svg">
            </div>
            <div class="line"></div>
            <textarea class="detail-textarea"></textarea>
            <div class="line"></div>            
            <div class="detail-tip">说明：以空格符分隔，当前项为空时请预留位置。</div>
            <div class="btn-wrap">
                <button class="btn-normal bg-blue" @click="showModal=false;">确 定</button>
            </div>
        </div>
    </div>
</template>
<script>
    import App from "light"
    export default {
        data(){
            return {
                formalInfo: '杭实善成，PE策略1号，PE，采购',
                showModal: false,
                selected: 0
            }
        },
        methods: {
            toNext() {
                App.navigate("lay/contract/add/step3");
            }
        }
    }
</script>
<style lang="less">

</style>
