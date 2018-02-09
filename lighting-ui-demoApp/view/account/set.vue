
<template>
     <div style="background-color:#f0eff4; height: 1334px;">
        <scroller style="height: 1334px;">
           <div class="block flex-row align-center justify-between">
                <text>行情颜色选择</text>
                <div class="flex-row">
                    <div class="flex-row ml20" v-for="(bgColor, index) in bgColors" :key="index">
                        <image :src="bgColor.checked ? checkedIcon : unCheckedIcon" style="width: 42px; height: 42px; margin-right: 10px;" @click="toggleSelect(bgColor)"></image>
                        <text :style="textStyle">{{ bgColor.label }}</text>
                    </div>
                </div>
           </div>
           <lc-cell label="个人设置" :has-arrow="true" :arrow-icon="arrowIcon" :cell-style="cellStyle" :label-style="labelStyle"></lc-cell>

           <lc-cell label="账户与安全" title="管理您的账户信息" :has-arrow="true" :arrow-icon="arrowIcon" :cell-style="cellStyle2" :label-style="labelStyle" :title-style="titleStyle"></lc-cell>
           <lc-cell label="默认首页设置" title="根据自己的使用习惯设置" :has-arrow="true" :arrow-icon="arrowIcon" :cell-style="cellStyle1" :label-style="labelStyle" :title-style="titleStyle"></lc-cell>
           <lc-cell label="行情设置" :has-arrow="true" :arrow-icon="arrowIcon" :cell-style="cellStyle1" :label-style="labelStyle" ></lc-cell>
           <lc-cell label="服务器设置" :has-arrow="true" :arrow-icon="arrowIcon" :cell-style="cellStyle1" :label-style="labelStyle" ></lc-cell>
           <lc-cell label="清理缓存" :has-arrow="true" :arrow-icon="arrowIcon" :cell-style="cellStyle1" :label-style="labelStyle" ></lc-cell>
           <lc-cell label="免责条款" :has-arrow="true" :arrow-icon="arrowIcon" :cell-style="cellStyle1" :label-style="labelStyle" ></lc-cell>
           <lc-cell label="音频自动播放" :has-arrow="true" :arrow-icon="arrowIcon" :cell-style="cellStyle1" :label-style="labelStyle"></lc-cell>
           <lc-cell label="投资者教育" :has-arrow="true" :arrow-icon="arrowIcon" :cell-style="cellStyle1" :label-style="labelStyle" ></lc-cell>
           <lc-cell label="V5.0.7版本" :has-arrow="true" :arrow-icon="arrowIcon" :cell-style="cellStyle1" :label-style="labelStyle" ></lc-cell>
           
           
        </scroller>
     </div>
</template>
<script>
    import Light from 'light';
    import LcCell from "lighting-ui/packages/lc-cell";
    export default {
        components: { LcCell },
        data(){
            return {
                bgColors: [{
                    value: 0,
                    label: '黑色',
                    checked: true
                }, {
                    value: 1,
                    label: '白色',
                    checked: false                    
                }, {
                    value: 2,
                    label: '智能',
                    checked: false
                }
                ],
                checkedIcon: 'images/radio-checked.png',
                unCheckedIcon: 'images/radio-unchecked.png',
                cellStyle: {
                    marginTop: '20px',
                    marginBottom: '20px',
                    borderTopWidth: '0px',
                    borderBottomWidth: '0px'
                },
                cellStyle1: {
                    borderBottomWidth: '0px',
                    height: '98px'
                },
                cellStyle2: {
                    borderBottomWidth: '0px',
                    height: '98px',
                    borderTopWidth: '0px'
                },
                labelStyle: {
                    color: '#4e4e4e',
                    fontSize: '30px'
                },
                titleStyle: {
                    color: '#bdbdbd'
                },
                arrowIcon: 'images/cell-arrow.png',
                textStyle: {
                    fontSize: '30px',
                    color: '#4e4e4e'
                }
            }
        },
        methods: {
            toggleSelect(item) {
                console.log(item);
                if(!item.checked) {
                    this.bgColors.forEach(function(bgc,index) {
                        if(bgc.checked) {
                            bgc.checked = false;
                        }
                    })
                    item.checked = true;
                }
                
            }
        }
    }
</script>

<style scoped src="../../css/ui.css"></style>
<style lang="less">
    .block {
        height: 168px;
        padding-top: 64px;
        padding-right: 40px;
        padding-bottom: 64px;
        padding-left: 40px;
        background-color: #fff;
    }
    .no-top-border {
        border-top-width: 0px !important;
    }
    .no-bottom-border {
        border-bottom-width: 0px !important;
    }
</style>
