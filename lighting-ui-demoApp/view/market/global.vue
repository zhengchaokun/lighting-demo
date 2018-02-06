
<template>
    <div>
        <!-- 全球重要指数 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell0Style"
            @LcCellClicked="index0Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex0Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex0Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">全球重要指数</text>
            </div>
        </lc-cell> 
        <!-- 国际期货 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell0Style"
            @LcCellClicked="index0Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex0Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex0Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">国际期货</text>
            </div>
        </lc-cell> 
        <!-- 国际汇率 -->
        <lc-cell 
            :has-arrow="true"
            :auto-accessible="false"
            :has-top-border="false"
            :cell-style="cell0Style"
            @LcCellClicked="index0Clicked">
            <div class="flex-row align-center" slot="label">
                <image src="images/cell-expand.png" v-if="isIndex0Fold" class="icon"></image>
                <image src="images/cell-fold.png" v-if="!isIndex0Fold" class="icon"></image>
                <text class="ml20 fs28 f-dark">国际汇率</text>
            </div>
        </lc-cell> 
    </div>
</template>
<script>
    import LcCell from "lighting-ui/packages/lc-cell";
    import Light from 'light';
    export default {
        components:{ LcCell },
        data(){
            return {
                isIndex0Fold: false
            }
        },
        computed:{
            cell0Style(){
                return this.isIndex0Fold==true?{'background-color':'#ffffff'}:{'background-color':'#f8f8f8'};
            }
        },
        methods:{
            index0Clicked(){
                this.isIndex0Fold = !this.isIndex0Fold;
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style lang="less">

</style>
