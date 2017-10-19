
<template>
    <div class="apiWrap">
       <ul class="apiList">
            <li @click="jump('chooseImage')"><span>图片选择</span><img src="images/go.png" alt=""></li>
            <li @click="jump('setClipboardText')"><span>复制内容到剪切板</span><img src="images/go.png" alt=""></li>
            <li @click="jump('getClipboardText')"><span>获取剪切板内容</span><img src="images/go.png" alt=""></li>
            <li @click="jump('fetchURL')"><span>抓取网页内容</span><img src="images/go.png" alt=""></li>
            <li @click="jump('writeGlobalData')"><span>本地存储数据</span><img src="images/go.png" alt=""></li>
            <li @click="jump('readGlobalData')"><span>本地读取数据</span><img src="images/go.png" alt=""></li>
            <li @click="jump('deleteGlobalData')"><span>本地删除数据</span><img src="images/go.png" alt=""></li>
            <li @click="jump('imageAction')"><span>保存图片到本地</span><img src="images/go.png" alt=""></li>
            <li @click="jump('back')"><span>webview返回</span><img src="images/go.png" alt=""></li>
            <li @click="jump('close')"><span>webview关闭</span><img src="images/go.png" alt=""></li>
            <li @click="jump('getContactInfo')"><span>获取通讯录信息</span><img src="images/go.png" alt=""></li>
            <li @click="jump('getVersion')"><span>获取客户端版本信息</span><img src="images/go.png" alt=""></li>
            <li @click="jump('getUDID')"><span>获取设备唯一标识码</span><img src="images/go.png" alt=""></li>
            <!--<li @click="jump('switchTab')"><span>切换tab......todo</span><img src="images/go.png" alt=""></li>-->
            <li @click="jump('genCode')"><span>生成二维码</span><img src="images/go.png" alt=""></li>
            <li @click="jump('scanCode')"><span>二维码扫描</span><img src="images/go.png" alt=""></li>
            <li @click="jump('share')"><span>分享</span><img src="images/go.png" alt=""></li>
            <!--<li @click="jump('socialLogin')"><span>第三方登录......todo</span><img src="images/go.png" alt=""></li>-->
            <li @click="jump('isAppInstalled')"><span>判断app是否已安装</span><img src="images/go.png" alt=""></li>
            <li @click="jump('userLogin')"><span>用户登录</span><img src="images/go.png" alt=""></li>
            <li @click="jump('setUserInfo')"><span>设置用户信息</span><img src="images/go.png" alt=""></li>
            <li @click="jump('getUserInfo')"><span>获取用户信息</span><img src="images/go.png" alt=""></li>
            <li @click="jump('userLogout')"><span>注销登录用户</span><img src="images/go.png" alt=""></li>
            <!--<li @click="jump('orcCheck')"><span>身份识别......todo</span><img src="images/go.png" alt=""></li>-->
            <li @click="jump('setButton')"><span>添加导航栏按钮</span><img src="images/go.png" alt=""></li>
             <li @click="jump('setSearchView')"><span>设置导航栏搜索视图</span><img src="images/go.png" alt=""></li>
            <li @click="jump('statusBar')"><span>状态栏隐藏显示</span><img src="images/go.png" alt=""></li>
            <li @click="jump('setBackgroundColor')"><span>设置导航栏背景色</span><img src="images/go.png" alt=""></li>
            <li @click="jump('wizard')"><span>按键精灵数据查询</span><img src="images/go.png" alt=""></li>
            <li @click="jump('real')"><span>行情报价数据查询</span><img src="images/go.png" alt=""></li>
            <li @click="jump('sort')"><span>行情股票排序</span><img src="images/go.png" alt=""></li>
            <!--<li @click="jump('startRecord')"><span>音频录入</span><img src="images/go.png" alt=""></li>-->
            <!--<li @click="jump('stopRecord')"><span>结束音频录入</span><img src="images/go.png" alt=""></li>-->
            <!--<li @click="jump('sendEvent')"><span>埋点接口</span><img src="images/go.png" alt=""></li>-->
            <!--<li @click="jump('getRegistrationID')"><span>获取推送RegistrationID</span><img src="images/go.png" alt=""></li>-->
            <!--<li @click="jump('setAlias')"><span>设置推送alias接口</span><img src="images/go.png" alt=""></li>-->
            <!--<li @click="jump('callNative')"><span>native调用通用方法</span><img src="images/go.png" alt=""></li>-->
       </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        },
        methods:{
            jump:function(view){
                location.href = "#/"+view;
            }
        }
    }
</script>
<style lang="less">
.apiWrap{
    overflow:auto;
    margin-top:0.15rem;
    box-shadow: 0px 7px 8px 9px #D7D7D7;
    .apiList{
        padding: 0 0.15rem;
        background: #fff;
        li{
            display: -webkit-flex; /* Safari */
            display: flex;
            justify-content:space-between;
            align-items:center;
            background:#fff;
            padding:0 0.15rem;
            border-bottom:1px solid #d7d7d7; 
            font-size:0.18rem;
            padding:0.08rem 0.1rem;
            img{
                width:0.16rem;
                height:0.16rem;
            }           
        }
    }
}
</style>
