
<template>
    <div>
       <div class="lg-input-container">
           <input type="text" placeholder="请输入股票代码" class="lg-input flex-1"/>
       </div>
       <!-- 买入价格 -->
       <div class="lg-input-container">
           <div class="flex-1 align-center justify-center">
               <image src="images/simulate_trading_decrease.png" class="icon-trade"/>
               <text class="fs20 f-dark mt10">0.01</text>
           </div>
           <input type="text" placeholder="买入价格" class="lg-input flex-5"/>
           <div class="flex-1 align-center justify-center">
               <image src="images/simulate_trading_increase.png" class="icon-trade"/>
               <text class="fs20 f-dark mt10">0.01</text>
           </div>
       </div>
       <!-- 买入数量 -->
       <div class="lg-input-container">
           <div class="flex-1 align-center justify-center">
               <image src="images/simulate_trading_decrease.png" class="icon-trade"/>
               <text class="fs20 f-dark mt10">100</text>
           </div>
           <input type="text" placeholder="买入数量" class="lg-input flex-5"/>
           <div class="flex-1 align-center justify-center">
               <image src="images/simulate_trading_increase.png" class="icon-trade"/>
               <text class="fs20 f-dark mt10">100</text>
           </div>
       </div>
        <!-- 最新 -->
       <div class="lg-input-container">
           <div class="flex-1 pl40 flex-row align-center">
               <text>最新：</text>
               <text class="f-red fs26">25.13</text>
               <text class="f-red fs20 ml30">+1.54%</text>
           </div>
           <div class="flex-1 pl40 flex-row align-center">
               <text>可买：</text>
                <text class="f-black fs26">0</text>
           </div>
       </div>
        <!-- 购买 -->
       <div class="flex-row">
           <div class="flex-1 align-center justify-center buy-btn">
               <text class="fs56 f-white">买  入</text>
           </div>
           <div class="flex-1 flex-row">
               <div class="align-center justify-center flex-1">
                   <text>刷新</text>
               </div>
               <div class="align-center justify-center flex-1">
                   <text>买/卖</text>
               </div>
               <div class="align-center justify-center flex-1">
                   <text>清空</text>
               </div>
           </div>
       </div>

       <!-- 数据 -->
       <div class="data-container">

       </div>   
    </div>
</template>
<script>
    import Light from 'light'
    export default {
        data(){
            return {}
        },
        mounted(){
            Light.trigger('tabChange', 0)
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .lg-input-container{
        height: 100px;
        border-bottom-width: 1px;
        border-bottom-color: #eeeeee;
        flex-direction: row;
    }
    .lg-input{
        height: 100%;
        text-align: center;
    }
    .icon-trade{
        width: 20px;
        height: 20px;
    }
    .buy-btn{
        height: 120px;
        background-color: #f35151;
    }
    .data-container{
        height: 600px;
        background-color: #efefef;
    }
</style>
