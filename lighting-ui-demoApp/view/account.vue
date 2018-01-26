
<template>
    <div style="background-color:#f0eff4;">
        <scroller>
            <div class="header flex-row align-center">
                <div class="user-info flex-row align-center">
                    <image src="images/figure.png" style="margin-right: 20px; width: 112px; height: 112px;"></image>
                    <div>
                        <text class="c-lightgray fs28">{{user.name}}</text>
                        <text class="c-eee fs24 mt20">乐米：  {{user.coin}}</text>
                    </div>
                </div>
                <div class="sign-button">
                    <image src="images/icon-1.png" style="flex: 1; width: 46px; height: 46px;"></image>
                    <div class="sign-text">
                        <text v-if="isSigned" class="c-white fs26">+500</text>
                        <text v-else class="c-white fs26">签到</text>
                    </div>
                </div>
            </div>
            <div class="body">
                <lc-cell icon="icon_home" label="我的交易账户" desc="股票、基金、理财" title="立即邓丽或开户" :has-arrow="true" :cell-style="cellStyle"></lc-cell>
            </div>
        </scroller>
       
    </div>
</template>
<script>
    import App from "light";
    import LcCell from "lighting-ui/packages/lc-cell";
    export default {
        components: {LcCell},
        data(){
            return {
                isSigned: true,
                user: {
                    name: '乐友19990921',
                    coin: 520
                },
                icon_home: 'images/icon_home.png',
                cellStyle: {
                    height: '132px'
                },
                titleStyle: {
                    color: '#faa960'
                }
            }
        }
    }
</script>

<style scoped src="../css/ui.css"></style>
<style scoped>
    .header {
        height: 220px;
        background-color: #CC3333; 
        padding-left: 40px;
    }
    .user-info {
        flex-direction: row;
    }
    .sign-button {
        flex-direction: row;
        position: absolute;
        right: 0;
        /* bottom: 52px; */
        width: 120px;
        height: 68px;
        background-color: #b62828;
        border-width: 1px;
        border-color: #a3292a;
        border-right-width: 0;
        border-bottom-left-radius: 34px;
        border-top-left-radius: 34px; 
        padding-left: 16px;
        padding-right: 16px;
        align-items: center;
    }
    .sign-text {
        display: inline-block;
    }
</style>
