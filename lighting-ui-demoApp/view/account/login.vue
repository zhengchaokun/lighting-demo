
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
                <text class="f-lightgray fs28">账号安全设置</text>
            </div>
            <div class="align-center">
                <lc-button text="登录" type="normal" :btn-style="btnStyle" :disabled="!valid"></lc-button>                
            </div>
            <text class="fs26 mt50 text-center text-error">登录遇到问题</text>
            <div class="footer">
                <text class="fs20 f-lightgray-1 text-center">不是华泰用户？</text>
                <text class="fs32 f-blue mt10 text-center">在线开户</text>
            </div>
        </scroller>
    </div>
</template>
<script>
    import LcCell from "lighting-ui/packages/lc-cell";
    import LcButton from "lighting-ui/packages/lc-button";
    
    
    export default {
        components: { LcCell, LcButton },
        data(){
            return {
                icons: [
                    '../../images/account-login-1.png',
                    '../../images/account-login-2.png',
                    '../../images/account-login-3.png',
                    '../../images/account-login-4.png'
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
            }
        }
    }
</script>

<style scoped src="../../css/ui.css"></style>
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
        position: absolute;
        left: 0;
        right: 0;
        bottom: 90px;
        width: 750px;
    }
    .text-error {
        color: #dd613a;
    }
</style>
