
<template>
    <div>
        <div class="buyCont buyStyle">  <!--卖出用sellStyle-->
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>产品</span><span>301杭实善成</span><em>选择</em>
                </div>
                <div class="subitem">
                    <span>组合</span><span>--</span><em>选择</em>
                </div>
            </div>
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>合约代码</span>
                </div>
            </div>
            <div class="codeWrap flex">
                <div class="codeSelect">
                    <ul>
                        <li class="select">开仓</li>
                        <li>平仓</li>
                    </ul>
                    <ul>
                        <li class="select">套利</li>
                        <li>套保</li>
                    </ul>
                </div>
                <div class="codeMarket flex1">
                    <p><span>沪深1806</span><span class="fright">IF1806</span></p>
                    <p><em class="direc">卖出</em><em class="price">4448.0</em><em class="num">2</em></p>
                    <p><em class="direc">卖出</em><em class="price">4448.0</em><em class="num">2</em></p>
                    <div class="marketDetail flex">
                        <ul class="flex1">
                            <li><span>最新</span><em>4448.4</em></li>
                            <li><span>涨跌</span><em>38.4</em></li>
                            <li><span>幅度</span><em>0.88%</em></li>
                            <li><span>总手</span><em class="colorOrange">425</em></li>
                            <li><span>现手</span><em class="colorOrange">0</em></li>
                            <li><span>涨停</span><em>4850.6</em></li>
                            <li><span>跌停</span><em class="colorGreen">3969.0</em></li>
                        </ul>
                        <ul class="flex1">
                            <li><span>结算</span><em class="colorGreen">-</em></li>
                            <li><span>昨结</span><em>2234</em></li>
                            <li><span>今开</span><em class="colorGreen">4322</em></li>
                            <li><span>最高</span><em>4445</em></li>
                            <li><span>最低</span><em class="colorGreen">4390</em></li>
                            <li><span>持仓</span><em class="colorOrange">4850.6</em></li>
                            <li><span>日增</span><em class="colorOrange">-12</em></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>指令价格</span><i>-</i><input type="text"><i>+</i>
                </div>
            </div>
            <div class="upDown">
                <span>涨停<em class="colorRed">6733</em></span> 
                <span>跌停<em class="colorGreen">6733</em></span>
            </div>
            <div class="itemList lineColor">
                <div class="subitem">
                    <span>指令数量</span><i>-</i><input type="text"><i>+</i>
                </div>
            </div>
            <div class="upDown">
                <span>可买数量<em class="colorRed">12</em></span> 
            </div>
            <div class="itemList">
                <div class="subitem">
                    <span>交易员</span><span>张三</span><em>选择</em>
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
