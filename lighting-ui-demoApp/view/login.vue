
<template>
    <div style="background-color:#fff; height: 1206px;">
        <scroller style="height: 1206px; position: relative;">
            <div class="align-center">
                <lc-cell :cell-style="cellStyle">
                    <image slot="label" :src="icons[0]" :style="iconStyle"></image>
                    <input slot="title" class="input-inner" v-model="login.userId" placeholder="请输入华泰客户号码"></input>
                </lc-cell>
                <lc-cell :cell-style="cellStyle1">
                    <image slot="label" :src="icons[1]" :style="iconStyle"></image>
                    <input type="password" slot="title" class="input-inner" v-model="login.tradePass" placeholder="请输入交易密码"></input>
                </lc-cell>
                <lc-cell :cell-style="cellStyle1" class="no-top-border">
                    <image slot="label" :src="icons[2]" :style="iconStyle"></image>
                    <input type="password" slot="title" class="input-inner" v-model="login.connectPass" placeholder="请输入通讯密码"></input>
                </lc-cell>
                <lc-cell :cell-style="cellStyle1" class="no-top-border" v-if="showCell">
                    <image slot="label" :src="icons[3]" :style="iconStyle"></image>
                    <input type="password" slot="title" class="input-inner" v-model="login.token" placeholder="请输入动态口令"></input>
                </lc-cell>
            </div>
            <div class="form-below flex-row justify-between align-center">
                <div class="flex-row align-center">
                    <text class="f-lightgray fs28 mr20">动态口令</text>
                    <switch checked="false" :style="switchStyle" @change="toggleCell"></switch>
                </div>
                <text class="f-lightgray fs28" @click="openBottomPopup">账号安全设置</text>
            </div>
            <div class="align-center">
                <lc-button text="登录" type="normal" :btn-style="btnStyle" :disabled="!valid"></lc-button>                
            </div>
            <text class="fs26 mt50 text-center text-error">登录遇到问题</text>
            <div class="footer">
                <text class="fs24 f-dark text-center">不是华泰用户？</text>
                <text class="fs32 f-orange mt10 text-center">在线开户</text>
            </div>

            <lc-popup :have-overlay="true"
                popup-color="#fff"
                :show="isBottomShow"
                @LcPopupOverlayClicked="closePopup()"
                pos="bottom"
                height="870">
                <scroller>
                    <!-- <div class="popup-title justify-center">
                        <text class="fs32 f-black text-center">系统提示</text>
                    </div>     -->
                    <div class="block mt20">
                        <text class="f-lightgray fs30 text-center">登录保存设置</text>
                        <lc-radio :list="list1" :config="config" style="margin-top: 26px;"></lc-radio>
                    </div>
                    <div class="block">
                        <text class="f-lightgray fs30 mt20 text-center">保持在线时长</text>
                        <lc-radio :list="list2" :config="config" style="margin-top: 26px;" @LcRadioListChecked="LcRadioListChecked"></lc-radio>
                    </div>
                </scroller>
                
                <div>
                    <div class="flex-row align-center justify-center h-76">
                        <text class="fs24 f-lightgray">锁屏或回至主屏幕时保持登录状态</text>
                        <text class="fs24 f-orange">{{ selected }}</text>                    
                    </div>
                    <lc-button text="确定" type="red" :btn-style="btnStyle1" :text-style="textStyle" @LcButtonClicked="closePopup"></lc-button>
                </div>
                
            </lc-popup>
        </scroller>
    </div>
</template>
<script>
    import LcCell from "lighting-ui/packages/lc-cell";
    import LcButton from "lighting-ui/packages/lc-button";
    import LcRadio from "lighting-ui/packages/lc-radio";
    import LcPopup from "lighting-ui/packages/lc-popup";
    
    
    export default {
        components: { LcCell, LcButton, LcRadio, LcPopup },
        data(){
            return {
                icons: [
                    'images/account-login-1.png',
                    'images/account-login-2.png',
                    'images/account-login-3.png',
                    'images/account-login-4.png'
                ],
                login: {
                    userId: '',
                    tradePass: '',
                    connectPass: '',
                    token: ''
                },
                iconStyle: {
                    width: '40px',
                    height: '40px',
                    marginRight: '30px'
                },
                cellStyle: {
                    width: '750px',
                    height: '110px',
                    borderTopWidth: '0',
                    borderBottomWidth: '0',
                    paddingTop: '44px'
                },
                cellStyle1: {
                    width: '750px',
                    height: '96px'
                },
                showCell: false,
                btnStyle: {
                    height: '104px',
                    borderWidth: '0',
                    backgroundColor: '#df3031'
                },
                switchStyle: {
                    height: '60px'
                },
                isBottomShow: false,
                list1: [
                    { title: '记住账号和通讯密码', value: 1, checked: true },
                    { title: '只记住账号', value: 2 },
                    { title: '都不记住', value: 3 }
                ],
                list2: [
                    { title: '5分钟', value: 1 },
                    { title: '10分钟', value: 2 },
                    { title: '30分钟', value: 3, checked: true },
                    { title: '60分钟', value: 4 },
                ],
                selected: '30分钟',
                config: {
                    unCheckedColor:'#cacaca',
                    checkedColor: '#ffa17f',
                    fontSize:'30px',
                    checkedIcon: 'images/tick.png'
                },
                btnStyle1: {
                    width: '750px', 
                    height: '108px',
                    backgroundColor: '#de3031',
                    borderWidth: '0',
                    borderRadius:'0'
                },
                textStyle: {
                    color: '#fff'
                }
            }
        },
        computed: {
            valid() {
                if(this.login.userId && this.login.tradePass && this.login.connectPass) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            toggleCell(e) {
                this.showCell = e.value;
            },
            openBottomPopup() {
                this.isBottomShow = true;
            },
            LcRadioListChecked(e) {
                console.log(e);
                this.selected = e.title;
            },
            closePopup(e) {
                console.log(111,e);
                this.isBottomShow = false;
            }
        }
    }
</script>

<style scoped src="../css/ui.css"></style>
<style lang="less">
    .weex-scroller-inner {
        height: 1206px;
    }
    ::-webkit-input-placeholder {
        color: #9a9a9a;
    }
    .no-top-border {
        border-top-width: 0px !important;
    }
    .form-below {
        height: 166px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 90px;
        width: 750px;
    }
    .text-error {
        color: #ff9933;
    }
    .popup-title {
        height: 110px;
    }
    .mb26 {
        margin-bottom: 26px !important;
    }
    .h-76 {
        height: 76px;
    }
    .line {
        width: 750px;
        height: 1px;
        background-color: #d7d7d7;
    }
</style>
