
<template>
    <div style="background-color:#f0eff4;">
        <scroller>
            <div class="flex-row msg-wrap">
                <div class="pos-r msg-img-wrap">
                    <image class="msg-img" src="images/msg-icon-3.png"></image>
                    <text class="msg-dot">1</text>
                </div>
                <div class="flex-1 ml20">
                    <text class="msg-tit">每日资讯</text>
                    <text class="msg-info">【午间看市】上证综指午盘跌0.34%报3497点。港股大盘跳水。</text>
                </div>
            </div>
            <div class="flex-row msg-wrap">
                <div class="pos-r msg-img-wrap">
                    <image class="msg-img" src="images/msg-icon-1.png"></image>
                    <text class="msg-dot">7</text>
                </div>
                <div class="flex-1 ml20">
                    <text class="msg-tit">涨乐热门</text>
                    <text class="msg-info">【专享理财】新年送福，客户回馈日专享理财在上线了。</text>
                </div>
            </div>
            <div class="flex-row msg-wrap">
                <div class="pos-r msg-img-wrap">
                    <image class="msg-img" src="images/msg-icon-2.png"></image>
                    <text class="msg-dot">11</text>
                </div>
                <div class="flex-1 ml20">
                    <text class="msg-tit">系统消息</text>
                    <text class="msg-info">关于本周末信息系统暂停服务的公告</text>
                </div>
            </div>

            <div class="flex-row kf-wrap">
                <div class="flex-row align-center">
                    <image src="images/msg-p.jpg" class="kf-img"></image>
                    <div class="ml30">
                        <text class="kf-tit-1">7x24小时客服在线</text>
                        <text class="kf-tit-2">请问有什么可以帮您的？</text>
                    </div>
                </div>
                <text class="kf-button">点我咨询</text>
            </div>
        </scroller> 
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style lang="less">
.msg-wrap{ height: 158px; background-color: #fff; padding-left: 30px; padding-right: 30px; align-items: center; justify-content: center;
    border-bottom-style: solid; border-bottom-color: #f0f0f0; border-bottom-width: 1px;}

.msg-img-wrap{ width: 90px; height: 100px; justify-content: center;}
.msg-img{ width: 80px; height: 80px;}
.msg-dot{ position: absolute; right: 0; top: 0; align-items: center; justify-content: center; text-align: center;
    width: 30px; height: 30px; background-color: #fb0100; font-size: 20px; border-radius: 15px; color: #fff;}

.msg-tit{ color: #2d2d2d; font-size: 32px;}
.msg-info{ color: #959595; font-size: 28px; lines:1; text-overflow: ellipsis; margin-top: 10px;}

.kf-wrap{ position: fixed; bottom:0; left: 0; width: 750px; height: 152px; padding-left: 40px; padding-right:40px; 
     background-color: #f5f6f8; align-items: center; justify-content: space-between;}
.kf-img{ width: 120px; height: 124px; }
.kf-button{ width: 152px; height: 54px; line-height: 54px; text-align: center; border-style: solid; border-width: 1px; font-size: 24px; border-color: #ff986e; color: #ff986e; }
.kf-tit-1{ color: #2f2f2f; font-size: 34px; }
.kf-tit-2{ color: #bdbec0; font-size: 26px;}

</style>
