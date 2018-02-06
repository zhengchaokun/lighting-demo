
<template>
     <div style="background-color:#fff; height: 1334px;">
        <scroller style="height: 1334px;">
            <div class="body align-center">
                <image src="../../images/group-empty.png" style="width: 750px; height: 458px;"></image>
                <div class="flex-row align-center">
                    <text class="fs32">已有 </text>
                    <text class="f-orange fs32">116566位牛人入驻，</text>
                </div>
                <div class="flex-row mt20 align-center">
                    <text class="fs32">组合最高收益 </text>
                    <text class="f-orange fs32">431.54%</text>
                </div>
                <lc-button text="查看牛人组合" :btn-style="btnStyle" :text-style="textStyle"></lc-button>
            </div>
            <div class="footer align-center">
                <text class="f-lightgray fs26">创建组合奖励1000乐米，快来参与吧！ ></text>
            </div>
        </scroller>
     </div>
</template>
<script>
    import Light from 'light';
    import LcButton from "lighting-ui/packages/lc-button";
    export default {
        components: { LcButton },
        data(){
            return {
                btnStyle: {
                    width: '340px',
                    backgroundColor: '#ff9933',
                    paddingTop: '36px',
                    paddingBottom: '40px',
                    marginTop: '60px',
                    borderWidth: '0'
                },
                textStyle: {
                    fontSize: '28px'
                }
            }
        }
    }
</script>

<style scoped src="../../css/ui.css"></style>
<style lang="less">
    .footer {
        margin-top: 378px;
    }
</style>
