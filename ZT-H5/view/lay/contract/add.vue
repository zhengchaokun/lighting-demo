
<template>
    <!-- <div class="bg-gray-2">
        <ul class="mb30 bg-white">
            <div class="line"></div>            
            <li class="cell pdr20">
                <span>
                    <span class="text-label inline-b">机构</span>
                    <span class="text-label ml20 inline-b">杭城善事</span>
                </span>
                
                <div class="fright">
                    <span class="text-sub inline-b">选择</span>
                    <img src="../../../images/more.svg" class="icon-more fright ml11" />
                </div>
            </li>
            <div class="line line-left"></div>
            <li class="cell pdr20">
                <span class="text-label inline-b">策略</span>
                <div class="fright">
                    <span class="text-sub inline-b">选择</span>
                    <img src="../../../images/more.svg" class="icon-more fright ml11" />
                </div>
            </li>
            <div class="line line-left"></div>
            <li class="cell pdr20">
                <span class="text-label inline-b">品种</span>
                <div class="fright">
                    <span class="text-sub inline-b">选择</span>
                    <img src="../../../images/more.svg" class="icon-more fright ml11" />
                </div>
            </li>
            <div class="line"></div>                
        </ul>
        <ul class="mb30 bg-white">
            <div class="line"></div>
            <li class="cell">
                <span class="text-label">采购</span>
                <img class="fright" v-show="selected===0" src="../../../images/radio-selected.svg">
            </li>
            <div class="line line-left"></div>
            <li class="cell">
                <span class="text-label">销售</span>
                <img class="fright" v-show="selected===1" src="../../../images/radio-selected.svg">
            </li>
            <div class="line"></div>
        </ul>
        <div class="line"></div>
        <li class="cell bg-white">
            <span class="text-label">长约</span>
            <img class="fright" v-show="selected===2" src="../../../images/radio-selected.svg">
        </li>
        <div class="line mb30"></div>
        <div class="mb20 tright pdr30 text-link" @click="showModal=true">
            快捷输入
        </div>
        <div class="cell mb30 flex">
            <span class="text-label mr30">客户抬头</span>
            <input class="flex1">
        </div>
        <div class="cell mb30 flex">
            <span class="text-label mr30">成交方式</span>
            <input class="flex1">
        </div>
        <div class="cell mb30 flex">
            <span class="text-label mr30">提货方式</span>
            <input class="flex1">
        </div>
        <div class="cell mb30 flex">
            <span class="text-label mr30">仓库/码头</span>
            <input class="flex1">
        </div>
        <div class="cell mb30 flex">
            <span class="text-label mr30">交付时间</span>
            <input class="flex1">
        </div>
        <div class="cell pdr30 flex" style="height: 74px;">
            <textarea class="flex1" style="height: 50px;" placeholder="备注" wrap="physical"></textarea>
        </div>
        <div class="pd30 pdb40">
            <button class="btn-normal" @click="toNext">下一步</button>
        </div>
        <div class="modal" v-show="showModal">
            <div class="detail-list clear">
                <span class="text-small">客户抬头</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../images/radio-selected.svg">
                <span class="text-small">，成交方式</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../images/radio-selected.svg">
                <span class="text-small">，提货方式</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../images/radio-selected.svg">
                <span class="text-small">，仓库/码头</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../images/radio-selected.svg">
                <span class="text-small">，交付时间</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../images/radio-selected.svg">
                <span class="text-small">，合同备注</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../images/radio-selected.svg">
            </div>
            <div class="line"></div>
            <textarea class="detail-textarea"></textarea>
            <div class="line"></div>            
            <div class="detail-tip">说明：以空格符分隔，当前项为空时请预留位置。</div>
            <div class="btn-wrap">
                <button class="btn-normal">确 定</button>
            </div>
        </div>
        

    </div> -->

    <sub-view></sub-view>

    
</template>
<script>
export default {
    data() {
        return {
            selected: 0,
            showModal: false
        };
    },
    methods: {
        toNext() {
            App.navigate("add/step1.vue");
        }
    }
};
</script>
<style lang="less">

</style>
