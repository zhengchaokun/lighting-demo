
<template>
    <div style="background-color:#f0eff4;">
        <scroller>
            <div class="header flex-row align-center">
                <div class="user-info flex-row align-center">
                    <image src="images/figure.png" style="margin-right: 20px; width: 112px; height: 112px;"></image>
                    <div>
                        <text class="c-lightgray fs28 opacity-7">{{user.name}}</text>
                        <text class="c-eee fs24 mt20 opacity-5">乐米：  {{user.coin}}</text>
                    </div>
                </div>
                <div class="sign-button">
                    <image src="images/coin_1.png" style="flex: 1; width: 46px; height: 46px;"></image>
                    <div class="sign-text">
                        <text v-if="isSigned" class="c-white fs26">+500</text>
                        <text v-else class="c-white fs26">签到</text>
                    </div>
                </div>
            </div>
            <div class="body">
                <lc-cell :icon="icon_home" label="我的交易账户" desc="股票、基金、理财" link="#/login" :has-top-border="false" title="立即登录或开户" :title-style="titleStyle" :has-arrow="true" :arrow-icon="arrowIcon" :cell-style="cellStyle" :label-style="labelStyle"></lc-cell>
                <lc-cell :icon="icon_me_1" label="我的卡券" title="丰富好礼等你来领" :has-top-border="false" :cell-style="cellStyle1" :title-style="titleStyle1"></lc-cell>
                <lc-cell :icon="icon_me_2" label="我的乐米" title="小乐米 大惊喜" :has-top-border="false" :cell-style="cellStyle1" :title-style="titleStyle1"></lc-cell>
                <lc-cell :icon="icon_me_3" label="我的业务" title="足不出户办理业务" :has-top-border="false" :cell-style="cellStyle1" :title-style="titleStyle1"></lc-cell>
                <lc-cell :icon="icon_me_4" label="我的Level2" title="独家沪深十档行情" :has-top-border="false" :cell-style="cellStyle1" :title-style="titleStyle1"></lc-cell>
                <lc-cell :icon="icon_me_5" label="我的关注" title="资讯理财都可收藏" :has-top-border="false" :cell-style="cellStyle1" :title-style="titleStyle1"></lc-cell>
                <lc-cell :icon="icon_me_6" label="我的客服" :has-top-border="false" :cell-style="cellStyle1" :title-style="titleStyle1" class="mb20 noborder"></lc-cell>
                
                <div class="grid bgc-white flex-row align-center mb30">
                    <div v-for="(grid, index) in grids" :key="index" :class="['grid-item','align-center', 'flex-1', index!==0 && 'border-left']" @click="jump(grid.path)">
                        <text class="grid-item-text fs24">{{ grid.num }}</text>
                        <text class="grid-item-text fs24 mt12">{{grid.label}}</text>
                    </div>
                </div>
            </div>
        </scroller>

        <lc-minibar class="navhead" title="" :background-color="bgc">
            <image class="navbar-img" src="images/msg.png" slot="left" @click="jump('#/msg')"></image>
            <div slot="right" class="navbar-right">
                <image class="navbar-icon" src="images/scan-top.png"></image>
                <image class="navbar-icon ml40" src="images/set.png" @click="jump('#/account/set')"></image>
            </div>
        </lc-minibar>
       
    </div>
</template>
<script>
    import Light from "light";
    import LcCell from "lighting-ui/packages/lc-cell";
    import LcMinibar from "lighting-ui/packages/lc-minibar";
    export default {
        components: {LcCell,LcMinibar},
        data(){
            return {
                bgc:'rgba(255,255,255,0)',
                isSigned: true,
                user: {
                    name: '乐友19990921',
                    coin: 520
                },
                arrowIcon: 'images/arrow.png',
                icon_home: 'images/icon_home.png',
                icon_me_1: 'images/me_1.png',
                icon_me_2: 'images/me_2.png',
                icon_me_3: 'images/me_3.png',
                icon_me_4: 'images/me_4.png',
                icon_me_5: 'images/me_5.png',
                icon_me_6: 'images/me_6.png',
                labelStyle: {
                    color: '#9a9a9a'                        
                },
                cellStyle: {
                    height: '170px',
                    marginBottom: '20px',
                    border: 'none',
                    paddingRight: '40px'
                },
                titleStyle: {
                    color: '#faa960',
                    marginRight: '0px'
                },
                cellStyle1: {
                    height: '100px',
                    paddingRight: '10px'                    
                },
                titleStyle1: {
                    color: '#9a9a9a'
                },
                grids: [{
                    label:"观点",
                    num: 0,
                    path: "#/account/viewpoint"
                },
                {
                    label:"评论",
                    num: 2,
                    path: "#/account/comment"
                },
                {
                    label:"赞我",
                    num: 0,
                    path: "#/account/thumb"
                },
                {
                    label:"组合",
                    num: 0,
                    path: "#/account/group"
                }]
            }
        },
        methods: {
            jump(view) {
                Light.navigate(view);
            }
        }
    }
</script>

<style scoped src="../css/ui.css"></style>
<style scoped>
    .navhead{ position:fixed;top:40px;left:0;width: 750px; height:90px;font-size:30px; }
    .navbar-right{ flex-direction: row;}
    .navbar-img{ width: 55px; height: 55px;}
    .navbar-icon{ width: 45px; height: 45px;}

    .header {
        position: relative;
        height: 350px;
        background-color: #d03132; 
        padding-top: 130px;
        padding-left: 40px;
    }
    .user-info {
        flex-direction: row;
    }
    .sign-button {
        flex-direction: row;
        position: absolute;
        right: 0;
        bottom: 64px;
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
   
    .grid {
        padding-top: 30px;
        padding-bottom: 30px;
    }
    .grid-item {
        height: 80px;
    }
    
    .border-left {
        border-left-style: solid;
        border-left-width: 1px;
        border-left-color: #f7f1f1;
    }
    .mt12 {
        margin-top: 12px;
    }

</style>
