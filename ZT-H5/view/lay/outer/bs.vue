
<template>
    <div>
       <div class="buyCont " :class="{buyStyle:$route.query.type==1,sellStyle:$route.query.type==2}">  <!--卖出用sellStyle-->
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>产品</span><span>301杭实善成</span><em>选择</em>
                </div>
                <div class="subitem">
                    <span>组合</span><span>---</span><em>选择</em>
                </div>
                <div class="subitem">
                    <span>市场</span><span>---</span><em>选择</em>
                </div>
            </div>
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>合约代码</span><span>--</span><em>选择</em>
                </div>
            </div>
            <div class="itemList">
                <div class="subitem itemselect">
                    <span>开仓</span>
                </div>
                <div class="subitem">
                    <span>平仓</span><em></em>
                </div>
            </div>
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>指令价格</span><input type="text"><em class="unit">日元</em>
                </div>
            </div>
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>指令数量</span><input type="text">
                </div>
            </div>
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>限价价格</span><input type="text">
                </div>
            </div>
            <div class="itemList">
                <div class="subitem">
                    <span>交易员</span><span>--</span><em>选择</em>
                </div>
            </div>
            <div class="itemList tips">
                <span>备注</span><textarea name="" id="" cols="40" rows="3"></textarea>
            </div>
            <div class="sureBut"><button>下单</button></div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        }
    }
</script>
<style lang="less">

</style>
