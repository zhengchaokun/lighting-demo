
<template>
    <div style="background-color:#fff; height: 1334px;">
        <scroller style="position: relative; height: 1334px;" class="justify-end">
            <div v-if="!views || views.length==0" class="no-content align-center">
                <image src="../../images/viewpoint-empty.png" style="width: 750px; height: 490px;"></image>
                <text class="f-lightgray-1 fs30">你还没有发表观点哦~</text>
            </div>
            <div class="footer bgc-white">
                <lc-cell :cell-style="cellStyle" label="最热帖" :label-style="labelStyle" title="去最热涨乐吧" :title-style="titleStyle" :has-arrow="true"></lc-cell>
                <div class="line"></div>
                <lc-cell class="flex-row align-center" :cell-style="cellStyle1">
                    <div slot="label" class="label">
                        <text class="title fs32">{{ hot.title }}</text>
                        <div class="flex-row mt20">
                            <text class="mr80 fs20 f-dark">浏览:{{ hot.view }}</text>
                            <text class="fs20 f-dark">讨论:{{ hot.comment }}</text>
                        </div>
                    </div>
                    <image slot="value" src="../../images/edit.png" style="width: 64px; height: 100px;"></image>
                </lc-cell>
            </div>
        </scroller>
       
    </div>
</template>

<script>
    import Light from 'light';
    import LcCell from "lighting-ui/packages/lc-cell";
    
    export default {
        components:{ LcCell },
        data(){
            return {
                views:[],
                hot:{
                    title: '2018年我的目标是：且战且逃，最终股票数归0！',
                    view: '1,442',
                    comment: '14'
                },
                cellStyle: {
                    paddingLeft: '40px',
                    paddingRight: '40px',
                    borderTopWidth: '0',
                    borderBottomWidth: '0' 
                },
                labelStyle: {
                    fontSize: '28px',
                    color: '#ccc'
                },
                titleStyle: {
                    fontSize: '28px',
                    color: '#ccc'
                },
                cellStyle1: {
                    height: '164px',
                    paddingBottom: '14px',
                    paddingRight: '40px',
                    paddingLeft: '40px',
                    borderTopWidth: '0',
                    borderBottomWidth: '0'                    
                },
                color: '#4A4A4A'
            }
        }
    }
</script>


<style scoped src="../../css/ui.css"></style>

<style lang="less">
    .weex-scroller-inner {
        height: 1334px;
        justify-content: flex-end;
    }
    .no-content {
        height: 952px;
    }
    .label {
        width: 590px;
    }
    .title {
        color: #0d0d0d;
        width: 590px;
        lines: 1;
        text-overflow: ellipsis;
    }

    .footer {
        height: 256px;
    }
    .line {
        width: 670px;
        margin-left: 40px;
        margin-right: 40px;
        height: 1px;
        background-color: #d9dade;
    }
</style>
