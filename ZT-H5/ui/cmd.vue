<template>
    <div>
        <div class="operateWrap">
            <div v-if="com.prodData" class="buyCont buyStyle">
                <div class="itemList">
                    <div class="subitem" @click="letsChooseProd=true">
                        <span>产品</span><span>{{com.prodData.fundList[com.prodData.current].fundCode}}{{com.prodData.fundList[com.prodData.current].fundName}}</span><em>选择</em>
                    </div>
                </div>
            </div>
            <div v-if="com.listData">
                <div class="codeMenu flex" v-if="currentFilter!=='default'">
                    <span class="flex1" :class="{current:currentFilter==key}" @click="currentFilter=key"
                          v-for="(item,key) in com.listData">{{key}}</span>
                </div>
                <div class="operateList" v-for="(item,index) in com.listData[currentFilter]"
                     @click="currentItemChecked=index">
                    <span class="operateBut" :class="com.clickBtn.cls" @click="com.clickBtn.handler(item)"
                          v-show="currentItemChecked==index"><em>{{com.clickBtn.title}}</em></span>
                    <h2>{{item.fundId}} {{item.combiName}}/{{item.fundName}}</h2>
                    <p>
                        <span class="code">{{item.insId}}</span>
                        <span class="colorRed">{{dictByValue('entrustDirection',item.entrustDirection).substring(0,2)}}</span>
                        <span>{{dictByValue('entrustDirection',item.entrustDirection).substring(2,4)}}</span>
                        <span>持仓均价<em>{{item.insPrice}}</em></span>
                    </p>
                    <p>
                        <span>指令数量<em>{{item.entrustAmount}}</em></span>
                        <span>已委托<em>{{item.insAmount}}</em></span>
                        <span>已成交<em>{{item.dealAmount}}</em></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="prod-choose" v-show="letsChooseProd">
            <ul v-if="com.prodData">
                <li @click="checkOrNot(prod)" v-for="prod in com.prodData.fundList">
                    <div class="left-side">
                        <span class="prod-id">{{prod.fundCode}}</span>
                        <span class="prod-name">{{prod.fundName}}</span>
                    </div>
                    <span class="right-side" v-show="prod.checked"></span>
                </li>
            </ul>
            <div class="confirm-btn" @click="chooseProd()">确定</div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                currentFilter: 'default',
                currentItemChecked: null,
                letsChooseProd:false
            }
        },
        methods: {
            itemClicked(item) {
            },
            checkOrNot(item){
                this.$set(item,'checked',!item.checked);
            },
            chooseProd(){
                this.letsChooseProd = false;
            }
        },
        mounted() {
        },
        props: ['com'],
        watch: {
            'com.listData': function () {
                if (this.com.listData) {
                    this.currentItemChecked = null;
                    this.currentFilter = Object.keys(this.com.listData)[0]
                }
            }
        }
    }
</script>
<style lang="less">
    .prod-choose{
        position: fixed;
        top:0.8rem;
        background: #f9f9f9;
        left: 0;
        right: 0;
        bottom: 0;
        ul{
            padding: 0.6rem 0.2rem 0 0.5rem;
            li{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                font-size: 0.34rem;
                color: #7d7d7d;
                line-height: 0.72rem;

                .right-side{
                    width: 0.34rem;
                    height: 0.34rem;
                    display: inline-block;
                    background-image: url("../images/correct.png");
                    background-size: 100%
                }
            }
        }
    }

    .confirm-btn{
        width: 6.9rem;
        height:0.88rem;
        background: #399DE2;
        border: 1px solid rgba(0,0,0,0.10);
        border-radius: 4px;
        color:#fff;
        font-size: 0.34rem;
        line-height: 0.88rem;
        text-align: center;
        position: absolute;
        bottom: 0.3rem;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
