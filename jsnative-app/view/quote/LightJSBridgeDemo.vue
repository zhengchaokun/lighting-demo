<template>
    <div>
        <scroller >
            <collapseview ref="coll1" title="Native模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('native.showDialog')">1 native.showDialog</text>
                <text class="item" @click="onClick('native.setScreenOrientation')">2 native.setScreenOrientation</text>
                <text class="item" @click="onClick('native.chooseImage')">3 native.chooseImage</text>
                <text class="item" @click="onClick('native.getNetworkStatus')">4 native.getNetworkStatus</text>
                <text class="item" @click="onClick('native.getSMSMessage')">5 native.getSMSMessage</text>
                <text class="item" @click="onClick('native.version')">6 native.version</text>
                <text class="item" @click="onClick('native.getContactInfo')">7 native.getContactInfo</text>
                <text class="item" @click="onClick('native.getSystemInfo')">8 native.getSystemInfo</text>
                <text class="item" @click="onClick('native.getUDID')">9 native.getUDID</text>
                <text class="item" @click="onClick('native.back')">10 native.back</text>
                <text class="item" @click="onClick('native.close')">11 native.close</text>
                <text class="item" @click="onClick('native.writeData')">12 native.writeData</text>
                <text class="item" @click="onClick('native.readData')">13 native.readData</text>
                <text class="item" @click="onClick('native.deleteData')">14 native.deleteData</text>
                <text class="item" @click="onClick('native.getClipBoardContent')">15 native.getClipBoardContent</text>
                <text class="item" @click="onClick('native.setClipBoardContent')">16 native.setClipBoardContent</text>
                <text class="item" @click="onClick('native.fetchURL')">17 native.fetchURL</text>
                <text class="item" @click="onClick('native.imageAction')">18 native.imageAction</text>
                <text class="item" @click="onClick('native.badge')">19 native.badge</text>
            </collapseview>
            <collapseview ref="coll1" title="Qrcode模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('qrcode.scan')">1 qrcode.scan</text>
                <text class="item" @click="onClick('qrcode.gen')">2 qrcode.gen</text>
            </collapseview>
            <collapseview ref="coll1" title="Social模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('social.share')">1 social.share</text>
                <text class="item" @click="onClick('social.login')">2 social.login</text>
                <text class="item" @click="onClick('social.isAppInstalled')">3 social.isAppInstalled</text>
            </collapseview>
            <collapseview ref="coll1" title="Media模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('media.audio.startRecord')">1 media.audio.startRecord</text>
                <text class="item" @click="onClick('media.audio.stopRecord')">2 media.audio.stopRecord</text>
            </collapseview>
            <collapseview ref="coll1" title="Msbanksct模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('msbanksct.selectRunServer')">1 msbanksct.selectRunServer</text>
                <text class="item" @click="onClick('msbanksct.openAccount')">2 msbanksct.openAccount</text>
                <text class="item" @click="onClick('msbanksct.openCompanyAccount')">3 msbanksct.openCompanyAccount</text>
                <text class="item" @click="onClick('msbanksct.bindCard')">4 msbanksct.bindCard</text>
                <text class="item" @click="onClick('msbanksct.bindCardCompany')">5 msbanksct.bindCardCompany</text>
                <text class="item" @click="onClick('msbanksct.notBindCard')">6 msbanksct.notBindCard</text>
                <text class="item" @click="onClick('msbanksct.reCharge')">7 msbanksct.reCharge</text>
                <text class="item" @click="onClick('msbanksct.drawCash')">8 msbanksct.drawCash</text>
                <text class="item" @click="onClick('msbanksct.createPassword')">9 msbanksct.createPassword</text>
                <text class="item" @click="onClick('msbanksct.transApply')">10 msbanksct.transApply</text>
                <text class="item" @click="onClick('msbanksct.paymentOrder')">11 msbanksct.paymentOrder</text>
                <text class="item" @click="onClick('msbanksct.checkInForPub')">12 msbanksct.checkInForPub</text>
                <text class="item" @click="onClick('msbanksct.checkInForPri')">13 msbanksct.checkInForPri</text>
                <text class="item" @click="onClick('msbanksct.clientInfoUpdate')">14 msbanksct.clientInfoUpdate</text>
            </collapseview>
            <collapseview ref="coll1" title="Head模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('head.setSystemStatusBar')">1 head.setSystemStatusBar</text>
                <text class="item" @click="onClick('head.addButton')">2 head.addButton</text>
                <text class="item" @click="onClick('head.addButton-right')">3 head.addButton-right</text>
                <text class="item" @click="onClick('head.removeButton')">4 head.removeButton</text>
                <text class="item" @click="onClick('head.removeButton-right')">5 head.removeButton-right</text>
                <text class="item" @click="onClick('head.setBackgroundColor')">6 head.setBackgroundColor</text>
                <text class="item" @click="onClick('head.setTitle')">7 head.setTitle</text>
                <text class="item" @click="onClick('head.setSearchView')">8 head.setSearchView</text>
            </collapseview>
            <collapseview ref="coll1" title="Validate模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('validate.preVerifyOpeation')">1 validate.preVerifyOpeation</text>
                <text class="item" @click="onClick('validate.verifyOpeation')">2 validate.verifyOpeation</text>
            </collapseview>
            <collapseview ref="coll1" title="System模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('system.openURL')">1 system.openURL</text>
                <text class="item" @click="onClick('system.appPreview')">2 system.appPreview</text>
                <text class="item" @click="onClick('system.setSoftInputMode')">3 system.setSoftInputMode</text>
            </collapseview>
            <collapseview ref="coll1" title="Trade模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('trade.pay')">1 trade.pay</text>
                <text class="item" @click="onClick('trade.paySelect')">2 trade.paySelect</text>
            </collapseview>
            <collapseview ref="coll1" title="Push模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('push.setAlias')">1 push.setAlias</text>
                <text class="item" @click="onClick('push.getRegistrationID')">2 push.getRegistrationID</text>
            </collapseview>
            <collapseview ref="coll1" title="User模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('user.login')">1 user.login</text>
                <text class="item" @click="onClick('user.logout')">2 user.logout</text>
                <text class="item" @click="onClick('user.setInfo')">3 user.setInfo</text>
                <text class="item" @click="onClick('user.getInfo')">4 user.getInfo</text>
            </collapseview>
            <collapseview ref="coll1" title="Face模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('face.ocrCheck')">1 face.ocrCheck</text>
            </collapseview>
            <collapseview ref="coll1" title="Analytics模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('analytics.sendEvent')">1 analytics.sendEvent</text>
            </collapseview>
            <collapseview ref="coll1" title="Mystock模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('mystock.add')">1 mystock.add</text>
                <text class="item" @click="onClick('mystock.delete')">2 mystock.delete</text>
            </collapseview>
            <collapseview ref="coll1" title="Safekeyboard模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('safekeyboard.show')">1 safekeyboard.show</text>
            </collapseview>
            <collapseview ref="coll1" title="Chat模块" rightTitle="" :showContent="false" headerBackgroundColor="#FAFAFA" headerFontSize="40" headerHeight="80">
                <text class="item" @click="onClick('chat.connectRong')">1 chat.connectRong</text>
                <text class="item" @click="onClick('chat.disconnectRong')">2 chat.disconnectRong</text>
                <text class="item" @click="onClick('chat.startConversition')">3 chat.startConversition</text>
                <text class="item" @click="onClick('chat.getConverationRecords')">4 chat.getConverationRecords</text>
                <text class="item" @click="onClick('chat.startConversationList')">5 chat.startConversationList</text>
            </collapseview>
        </scroller> 
        <scroller v-if="isShowResult" class="result">
                <text style="text-align:left;font-size:32;padding:20;color:white;background-color:red;" @click="onClose" >返回</text>
                <image style="width:700;height:700;" v-if="imageSrc!=''" :src="imageSrc"></image>
                <text :value="result"></text>
        </scroller>
    </div>  
</template>

<style>
    .result{
        position: absolute;
        top:0;
        left: 0;
        width:750;
        bottom: 0;
        background-color: gray;
    }
    .item{
        padding: 16;
        padding-left: 36;
        font-size: 30;
        border-bottom-width: 1;
        border-bottom-color: gray;
    }
</style>

<script>
    var LightJSBridge = weex.requireModule('LightJSBridge');
    module.exports = {
        methods:{
            onClick:function(action){
                var that = this;
                var param = {};
                if ("native.showDialog" == action){
                    param.title = "test";
                    param.message = "nihao a 1234";
                    param.buttons = ["确定","取消"];
                }else if ("native.setScreenOrientation" == action){
                    param.screenOrientation = "landscape_right";
                }else if ("native.setScreenOrientation" == action){
                    param.aspectXY = "1:1";
                    param.maxWidth = "200";
                    param.cropPhoto = "1:1";
                }else if ("native.writeData" == action){
                    param.key = "writeDataKey";
                    param.value = "writeData_test";
                    param.scope = "jsnative";
                    param.domain = "memory";
                }else if ("native.readData" == action){
                    param.key = "writeDataKey";
                    param.scope = "jsnative";
                    param.domain = "memory";
                }else if ("native.deleteData" == action){
                    param.key = "writeDataKey";
                    param.scope = "jsnative";
                    param.domain = "memory";
                }else if ("native.setClipBoardContent" == action){
                    param.value = "setClipBoardContent_test";
                }else if ("native.fetchURL" == action){
                    param.url = "http://www.baidu.com";
                }else if ("native.imageAction" == action){
                    param.image = "https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_9d645d9.png";
                }else if ("native.badge" == action){
                    param.type = "show";
                    param.badgeId = "show";
                }else if ("qrcode.gen" == action){
                    param.desc = "http://www.baidu.com";
                    param.size = "500";
                }
                else if("social.share" == action){
                    param.title="分享测试";
                    param.content="哈哈哈哈";
                    param.url="http://www.baidu.com";
                }
                else if("social.login" == action){
                    param.type = "qq";
                }
                else if("social.isAppInstalled"==action){
                    param.type = "qq";
                }else if("head.setSystemStatusBar"==action){
                    param.hidden=true;
                }else if("head.addButton"==action){
                    param.title="left";
                    param.icon="AppIcon";
                    param.action="http://www.baidu.com";
                    param.position="left";
                }else if("head.addButton-right"==action){
                    action = "head.addButton";
                    param.title="right";
                    param.icon="AppIcon";
                    param.position="right";
                }else if("head.removeButton"==action){
                    param.position="left";
                }else if("head.removeButton-right"==action){
                    action = "head.removeButton";
                    param.position="right";
                }else if("head.setBackgroundColor"==action){
                    param.color="#ff0000"
                }else if("head.setTitle"==action){
                    param.title="test title";
                }else if("head.setSearchView"==action){
                    param.icon="search";
                    param.backgroundColor="#e8e8e8";
                    param.placeholderText="search";
                    param.placeholderTextColor="#ff0000";
                    param.action="http:www.sina.com";
                }else if("validate.preVerifyOpeation"==action){
                    param.verifyType="FP"
                }

                LightJSBridge.call(action,param,function(ret){
                    that.isShowResult = true;
                    that.imageSrc= '';
                    that.result = '';
                    if (action == "qrcode.gen" || action == "native.chooseImage"){
                        that.imageSrc= "data:image/png;base64," + ret.data.result;
                    }else{
                        that.result = JSON.stringify(ret); 
                    }
                    
                    
                });
            },
            onClose:function(){
                this.isShowResult = false;
            }
        },
        data:function(){
            return{
                isShowResult:false,
                imageSrc:'',
                result:"",
                baseUrl:'',
                playStatus: 'play'
            }
        },
        components: {
            collapseview: require('./include/collapseview.vue'),
        },
        created:function(){

        }
    }
</script>
