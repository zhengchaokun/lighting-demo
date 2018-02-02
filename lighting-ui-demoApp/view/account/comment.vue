
<template>
    <div style="background-color:#fff; height: 1334px;">
        <scroller style="height: 1334px;">
            <lc-tab-page 
                ref="lc-tab-page"
                :tab-titles="tabTitles"
                :tab-styles="tabStyles"
                :needSlider="true"
                :is-tab-view="true"
                :wrap-bg-color="wrapBgColor"
                :tab-page-height="tabPageHeight">
                <div v-for="(v,index) in tabList"
                    :key="index"
                    style="height: 1334px;">
                    <template v-if="comments[index]&&comments[index].length>0">
                        <div v-for="(item,key) in comments[index]"
                            class="cell"
                            :key="key">
                            <div class="header flex-row align-center">
                                <image class="figure" src="../images/figure-1.png" style="width: 84px; height: 84px; margin-right: 14px;"></image>
                                <div class="flex-4">
                                    <text class="f-lightgray fs26">我</text>
                                    <text class="f-lightgray fs26 mt10">{{ item.datetime }}</text>
                                </div>
                            </div>
                            <text class="f-black fs30 mt20">{{ item.comment }}</text>
                            <div class="content">
                                <div class="content-header flex-row justify-between">
                                    <text class="f-lightgray fs26">{{ item.username }}</text>
                                    <text class="f-lightgray fs24">{{ item.floor }}楼</text>
                                </div>
                                <div class="content-body mt20">
                                    <text class="f-black f-bold fs32 text-justify">{{ item.title }}</text>
                                    <text class="mt20 f-black fs30 text-justify">{{ item.content }}</text>
                                </div>
                            </div>
                            <div class="footer flex-row align-center">
                                <text class="f-lightgray fs26">来自：</text>
                                <text class="f-orange opacity-5 fs26">{{ item.from }}</text>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="align-center" style="width: 750px;">
                            <image src="../images/no-comment.png" style="width: 130px; height: 130px; margin-top: 230px; margin-bottom: 80px;"></image>
                            <text v-if="index==0" class="f-lightgray-1 fs32">您还没有发出评论哦，</text>
                            <text v-else class="f-lightgray-1 fs32">您还没有收到评论哦，</text>                        
                            <text class="f-lightgray-1 mt20 fs32">快与乐友互动吧！</text>
                        </div>
                    </template>
                </div>
            </lc-tab-page>
        </scroller>
    </div>
</template>
<script>
    import LcCell from "lighting-ui/packages/lc-cell";
    import LcTabPage from "lighting-ui/packages/lc-tab-page";
    
    export default {
        components:{ LcCell, LcTabPage },
        data(){
            return {
                wrapBgColor: '#fff',
                tabPageHeight: 1334,
                tabTitles: [
                    { title: '我的评论' },
                    { title: '评论我的' }
                ],
                tabStyles: {
                    bgColor: '#FFF',
                    titleColor: '#9a9a9a',
                    activeTitleColor: '#4A4A4A',
                    width: 375,
                    height: 76,
                    hasActiveBottom: true,
                    bottomColor: '#ededed',
                    activeBottomColor: '#c62100',
                    activeBottomHeight: 4,
                    activeBottomWidth: 375
                },
                tabList: [],
                demoList: [1],
                comments: [
                    [{
                        datetime: '01-28 09:21',
                        comment: '好的',
                        username: '三万英尺氧气站',
                        floor: 1,
                        title: '牛市滚滚来',
                        content: '准备好你们口袋里的钱了么......不是奉献了就是盆满钵满......赌场人生',
                        from: '[涨乐吧] 上证指数'
                    }, {
                        datetime: '01-20 11:27',
                        comment: '加油！',
                        username: '海豹突击队副队长',
                        floor: 4,
                        title: '牛市滚滚2018年我的目标是；且战且逃，最终股票数归0!',
                        content: '加油！',
                        from: '[涨乐吧] 上证指数'
                    }]
                ]
            }
        },
        created() {
            this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
            console.log(this.tabList);
            // Light.Vue.set(this.tabList, 0, this.demoList);
        }
    }
</script>

<style scoped src="../../css/ui.css"></style>

<style lang="less">
    .cell {
        width: 750px;
        height: 514px;
        padding-top: 20px;
        padding-right: 20px;
        padding-bottom: 30px;
        padding-left: 30px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #dad9e2;
    }
    .content {
        border-width: 1px;
        border-style: solid;
        border-color: #dad9e2;
        background-color: #fffdfa;
        padding-top: 20px;
        padding-right: 60px;
        padding-bottom: 30px;
        padding-left: 20px;
        margin-top: 20px;
        margin-bottom: 16px;
    }
</style>
