<template>
    <div>
        <div class="operateWrap">
            <div v-if="com.topData" class="buyCont buyStyle">
                <div class="itemList">
                    <div class="subitem" @click="letsChooseProd=true">
                        <span>{{com.topData.title}}</span><span>{{getTitleString()}}</span><em>选择</em>
                    </div>
                </div>
            </div>
            <div>
                <div class="codeMenu flex" v-if="com.tabsData">
                    <span class="flex1" :class="{current:currentTab==key}" @click="currentTab=key"
                          v-for="(item,key) in com.tabsData">{{item.title}}</span>
                </div>
                <div class="operateList" v-for="(item,index) in com.listData"
                     @click="currentItemChecked=index">
                    <span class="operateBut" :class="com.clickBtn.cls" @click="com.clickBtn.handler(item)"
                          v-show="currentItemChecked==index"><em>{{com.clickBtn.title}}</em></span>
                    <h2><em v-if="item.code">{{item.code}} </em>{{item.name}}<em v-if="item.pName">/{{item.pName}}</em></h2>
                    <div v-for="list in item.list">
                        <p v-for="it in list">
                            <span v-for="(itv,itk) in it">{{itk}}<em>{{itv}}</em></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="prod-choose" v-show="letsChooseProd">
            <ul v-if="com.topData">
                <li @click="checkOrNot(prod)" v-for="prod in com.topData.list">
                    <div class="left-side">
                        <span class="prod-id">{{prod.code}}</span>
                        <span class="prod-name">{{prod.name}}</span>
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
                currentTab: 0,
                currentItemChecked: 0,
                letsChooseProd:false
            }
        },
        methods: {
            itemClicked(item) {
            },
            checkOrNot(item,index){
                this.$emit('checkedTop',item)
            },
            chooseProd(){
                this.letsChooseProd = false;
            },
            getTitleString(){
                let str = '';
                if(this.com && this.com.topData){
                    this.com.topData.list.forEach(function (top) {
                        if(top.checked){
                            if(top.code){
                                str+=`,${top.code}`
                            }else{
                                str+=`,${top.name}`
                            }
                        }
                    })
                }
                return str.substring(1);
            }
        },
        mounted() {
        },
        props: ['com'],
        watch: {
            'com.listData': function () {
                if (this.com.listData) {
                    this.currentItemChecked = null;
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
                    margin-top: 0.36rem-0.17rem;
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
