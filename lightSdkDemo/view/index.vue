<template>
    <div>
        <!--<div class="iconWrap flex-row">
            <image src="images/open.png"  class="showList" @click="show()"></image> <text class="fs32">{{title}}</text>
        </div>-->
        <!--<div @click="hide()" class="bgWrap" v-if="leftShow==true"></div>-->
        <div class="content"> 
            <list  class="itemWrap" :style="{height:height+'px'}" >
                <cell class="listItem" @click="jump('index/chooseImage','图片选择')"><div class="wrapRow"><text class="itemName">拍照与图片选择</text></div></cell>
                <cell class="listItem" @click="jump('index/setClipboardText','剪切板内容')"><div class="wrapRow"><text class="itemName">剪切板内容</text></div></cell>
                <cell class="listItem" @click="jump('index/fetchURL','抓取网页内容')"><div class="wrapRow"><text class="itemName">抓取网页内容</text></div></cell>
                <cell class="listItem" @click="jump('index/writeGlobalData','本地数据处理')"><div class="wrapRow"><text class="itemName">本地数据处理</text></div></cell>
                <cell class="listItem" @click="jump('index/imageAction','保存图片到本地')"><div class="wrapRow"><text class="itemName">保存图片到本地</text></div></cell>
                <cell class="listItem" @click="jump('index/back','webview返回')"><div class="wrapRow"><text class="itemName">webview返回关闭</text></div></cell>
                <cell class="listItem" @click="jump('index/getContactInfo','获取通讯录信息')"><div class="wrapRow"><text class="itemName">获取通讯录信息</text></div></cell>
                <cell class="listItem" @click="jump('index/getVersion','获取客户端版本信息')"><div class="wrapRow"><text class="itemName">获取客户端版本信息</text></div></cell>
                <cell class="listItem" @click="jump('index/getUDID','获取设备唯一标识码')"><div class="wrapRow"><text class="itemName">获取设备唯一标识码</text></div></cell>
                <!--<cell class="listItem" @click="jump('index/switchTab','')"><div class="wrapRow"><text class="itemName">切换tab......todo</text></div></cell>-->
                <cell class="listItem" @click="jump('index/genCode','二维码')"><div class="wrapRow"><text class="itemName">二维码</text></div></cell>
                <cell class="listItem" @click="jump('index/share','分享')"><div class="wrapRow"><text class="itemName">分享</text></div></cell>
                <cell class="listItem" @click="jump('index/socialLogin','第三方登录')"><div class="wrapRow"><text class="itemName">第三方登录</text></div></cell>
                <cell class="listItem" @click="jump('index/isAppInstalled','判断app是否已安装')"><div class="wrapRow"><text class="itemName">判断app是否已安装</text></div></cell>
                <cell class="listItem" @click="jump('index/setButton','导航栏设置')"><div class="wrapRow"><text class="itemName">导航栏设置</text></div></cell>
                <cell class="listItem" @click="jump('index/statusBar','状态栏隐藏显示')"><div class="wrapRow"><text class="itemName">状态栏隐藏显示</text></div></cell>
                <cell class="listItem" @click="jump('index/getNetworkStatus','获取当前网络状态')"><div class="wrapRow"><text class="itemName">获取当前网络状态</text></div></cell>
                
                <cell class="listItem" @click="jump('index/setScreenOrientation','设置屏幕方向')"><div class="wrapRow"><text class="itemName">设置屏幕方向</text></div></cell>
                <cell class="listItem" @click="jump('index/showKeyboard','显示隐藏交易键盘')"><div class="wrapRow"><text class="itemName">显示隐藏交易键盘</text></div></cell>
                <cell class="listItem" @click="jump('index/verifyOpeation','调用手势或指纹验证')"><div class="wrapRow"><text class="itemName">调用手势或指纹验证</text></div></cell>
                <cell class="listItem" @click="jump('index/call','打电话')"><div class="wrapRow"><text class="itemName">打电话</text></div></cell>
                <cell class="listItem" @click="jump('index/showDialog','dialog对话框')"><div class="wrapRow"><text class="itemName">dialog对话框</text></div></cell>
                <!--<cell class="listItem" @click="jump('index/orcCheck','')"><div class="wrapRow"><text class="itemName">身份识别......todo</text></div></cell>-->
                <cell v-if="ifAll" class="listItem" @click="jump('index/getLocationStatu','是否可获取当前定位状态')"><div class="wrapRow"><text class="itemName">是否可获取当前定位状态</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/wizard','按键精灵数据查询')"><div class="wrapRow"><text class="itemName">按键精灵数据查询</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/real','行情报价数据查询')"><div class="wrapRow"><text class="itemName">行情报价数据查询</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/sort','行情股票排序')"><div class="wrapRow"><text class="itemName">行情股票排序</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/clearWidget','清除沙盒缓存')"><div class="wrapRow"><text class="itemName">清除沙盒缓存</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/getPerformanceInfo','获取页面性能信息')"><div class="wrapRow"><text class="itemName">获取页面性能信息</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/setMaxCacheSize','设置沙盒缓存最大值')"><div class="wrapRow"><text class="itemName">设置沙盒缓存最大值</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/sendContentBroadcast','发送广播')"><div class="wrapRow"><text class="itemName">发送广播</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/getSafeArea','获取安全区域接口')"><div class="wrapRow"><text class="itemName">获取安全区域接口</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/setMutipleLanguages','多国语言设置')"><div class="wrapRow"><text class="itemName">多国语言设置</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/setAlia','设置推送alias接口')"><div class="wrapRow"><text class="itemName">设置推送alias接口</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/addTags','当前用户添加标签')"><div class="wrapRow"><text class="itemName">当前用户添加标签</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/getTags','获取当前用户的所有标签')"><div class="wrapRow"><text class="itemName">获取当前用户的所有标签</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/deleteTags','当前用户删除标签')"><div class="wrapRow"><text class="itemName">当前用户删除标签</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/getRegistrationIDPage','获取推送registrationID')"><div class="wrapRow"><text class="itemName">获取推送registrationID</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/mystockAdd','添加自选股')"><div class="wrapRow"><text class="itemName">添加自选股</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/mystockDelete','删除自选股')"><div class="wrapRow"><text class="itemName">删除自选股</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/mystockList','获取自选股列表')"><div class="wrapRow"><text class="itemName">获取自选股列表</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/userLogin','用户登录')"><div class="wrapRow"><text class="itemName">用户登录</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/setUserInfo','设置用户信息')"><div class="wrapRow"><text class="itemName">设置用户信息</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/getUserInfo','获取用户信息')"><div class="wrapRow"><text class="itemName">获取用户信息</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/userLogout','注销登录用户')"><div class="wrapRow"><text class="itemName">注销登录用户</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/connectRong','连接聊天服务')"><div class="wrapRow"><text class="itemName">连接聊天服务</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/getConverationRecords','获取聊天记录')"><div class="wrapRow"><text class="itemName">获取聊天记录</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/startConversition','打开聊天界面')"><div class="wrapRow"><text class="itemName">打开聊天界面</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/disconnectRong','断开聊天服务')"><div class="wrapRow"><text class="itemName">断开聊天服务</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/getLocation','获取经纬度')"><div class="wrapRow"><text class="itemName">获取经纬度</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/stopLocation','关闭定位服务')"><div class="wrapRow"><text class="itemName">关闭定位服务</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/getParams','获取配置参数')"><div class="wrapRow"><text class="itemName">获取配置参数</text></div></cell>
                <cell v-if="ifAll" class="listItem" @click="jump('index/getOpenApiToken','获取openApiToken')"><div class="wrapRow"><text class="itemName">获取openApiToken</text></div></cell>
            </list>
            <!--<image src="images/close.png" class="hideList" @click="hide()"></image>-->
        </div>
    </div>

</template>
<script>
    import WxcPopup from 'weex-ui/packages/wxc-popup';
    import Utils from 'weex-ui/packages/utils';
    import LightSDK from "light-sdk";
    import App from "light"
    const modal = weex.requireModule('modal')
    export default {
        data(){
            return {
                leftShow:false,
                title:"端JS-SDK",
                ifAll:false,
                height:Utils.env.getPageHeight()
            };
        },
        components:{
            WxcPopup
        },
        methods:{
            getClass(){
                if(this.leftShow==true){
                    return "show"
                }else{
                    return "hide"
                }
            },
            jump(view,title){
                this.title=title;
                App.navigate(view, {}, {title: title})
                this.hide();
            },
            show () {
                this.leftShow=true;
            },
            hide(){
                this.leftShow=false;
            }
        },
        mounted(){
            this.ifAll = this.$route.query.ifAll==1?true:false;
            var that = this;
            // LightSDK.native.setTitle({
            //     title:that.title
            // },function(data){
            // })
        }
    }
</script>
<style scoped src="../css/ui.css"></style> 
<style scoped>
.wrapRow{ 
    flex-direction: row;justify-content:space-between;
 }

.show{
    display:block
}
.hide{
    display:none;
}
.iconWrap{
    height:100px;
    margin-top:18px;
    padding-left:20px;
    padding-top:30px;
}
.title{
    color:#fff;
    font-size: 30px;
}

.content{
    width:750px;
    background-color:#fff;
    
}
.itemWrap{
    width:750px;
    border-bottom-width: 1px;
    border-bottom-color: #d7d7d7;
    border-bottom-style: solid;
}
.showList{
    width:50px;
    height:50px;
    margin-right:20px;
}
.hideList{
    width:50px;
    height:40px;
    position: absolute;
    top: 18px;
    right: -48px;
}
.listItem{
    justify-content:space-between;
    background-color: #fff;
    padding:15px;
    border-bottom-width:1px;
    border-bottom-color: #d7d7d7;
    border-bottom-style: solid;
    font-size: 26px;
}
.arrow{
    width:32px;
    height:32px;
}
.itemName{
    margin-left:10px;
    font-size:35px;
}
</style>
