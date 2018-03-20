
<template>
    <div>
        <div class="line"></div>
        <textarea readonly v-model="formalInfo" class="detail-textarea" style="height: 1.6rem;"></textarea>
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell pdr20" @click="showPickModal('currency')">
            <span>
                <span class="text-label inline-b"><span class="text-red">*</span>币种</span>
                <span class="text-label ml40 inline-b">{{ currencyInfo.currencyName }}</span>
            </span>
                
            <div class="fright">
                <span class="text-sub inline-b">选择</span>
                <img src="../../../../images/more.svg" class="icon-more fright ml22" />
            </div>
        </div>   
        <div class="line mb30"></div>

        <radio-list v-model="currencyInfo" :top="top" :list="coinTypes" type="currencyName" :visible.sync="show_pick_currency" @visible-change="handleVisibleChange1"></radio-list>
        <radio-list v-model="spotUnitInfo" :top="top" :list="spotUnits" type="spotUnit" :visible.sync="show_pick_unit" @visible-change="handleVisibleChange2"></radio-list>

        <div class="mb20 tright pdr30 text-link" @click="showModal=true">
            快捷输入
        </div>

        <template v-if="[2,3,4].indexOf(vid)>-1">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30"><span class="text-red">*</span>品名</span>
                <input class="flex1" v-model="detail.productName">
            </div> 
            <div class="line mb30"></div> 
        </template>
        
        <template v-if="[1,2,4,5].indexOf(vid)>-1">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30"><span v-if="vid==5" class="text-red">*</span>品牌</span>
                <input class="flex1" v-model="detail.brandName">
            </div> 
            <div class="line mb30"></div> 
        </template>

        <!-- to be -->
        <template v-if="vid==1">
            <div class="line"></div>        
            <div class="cell flex">
                <span class="text-label mr30">牌号</span>
                <input class="flex1" v-model="detail.grade">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template v-if="[1,5].indexOf(vid)>-1">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30"><span v-if="vid==5" class="text-red">*</span>分类</span>
                <input class="flex1" v-model="detail.spotType">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template>
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30"><span class="text-red">*</span>数量</span>
                <input type="number" min="1" step="1" class="flex1" v-model="detail.tradeAmount">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template>
            <div class="cell pdr20" @click="showPickModal('spotUnit')">
                <span>
                    <span class="text-label inline-b"><span class="text-red">*</span>单位</span>
                    <span class="text-label ml40 inline-b">{{ spotUnitInfo.spotUnit }}</span>
                </span>
                    
                <div class="fright">
                    <span class="text-sub inline-b">选择</span>
                    <img src="../../../../images/more.svg" class="icon-more fright ml22" />
                </div>
            </div>   
            <div class="line mb30"></div>
        </template>

        <template>
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30"><span class="text-red">*</span>价格</span>
                <input type="number" class="flex1" v-model="detail.spotPrice">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template>
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30"><span class="text-red">*</span>金额</span>
                <input readonly class="flex1" v-model="sumPrice">
            </div> 
            <div class="line mb30"></div>
        </template>


        <template v-if="[1,2,3,5].indexOf(vid)>-1">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30">短溢装</span>
                <input class="flex1" v-model="detail.moreorlessProportion">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template v-if="vid==4">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30">规格</span>
                <input class="flex1" v-model="detail.standard">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template v-if="vid==4">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30">材质</span>
                <input class="flex1" v-model="detail.material">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template v-if="vid==5">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30">型号</span>
                <input class="flex1" v-model="detail.modelNumber">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template v-if="vid==3">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30">公检批号</span>
                <input class="flex1" v-model="detail.batchNumber">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template v-if="vid==2">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30"><span v-if="vid==2" class="text-red">*</span>价格类别</span>
                <input class="flex1" v-model="detail.priceCategory">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template v-if="vid==4">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30"><span class="text-red">*</span>生产地区</span>
                <input class="flex1" v-model="detail.productionArea">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template v-if="vid==3">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30">交货地</span>
                <input class="flex1" v-model="detail.deliveryPlace">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template v-if="vid==2">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30">全水分</span>
                <input class="flex1" v-model="detail.totalMoisture">
            </div> 
            <div class="line mb30"></div>
        </template>

        

        <template v-if="vid==2">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30">挥发分</span>
                <input class="flex1" v-model="detail.volatileMatter">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template v-if="vid==2">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30">灰分</span>
                <input class="flex1" v-model="detail.ashContent">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template v-if="vid==2">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30">发热量</span>
                <input class="flex1" v-model="detail.charcoalHeat">
            </div> 
            <div class="line mb30"></div>
        </template>

        <template v-if="vid==2">
            <div class="line"></div>
            <div class="cell flex">
                <span class="text-label mr30">硫分</span>
                <input class="flex1" v-model="detail.sulfurContent">
            </div> 
            <div class="line mb30"></div>
        </template>

        <div class="line"></div>
        <div class="cell pdr30 flex" style="height: 1.48rem;">
            <textarea v-model="detail.remark" class="flex1" style="height: 1rem;" placeholder="备注" wrap="physical"></textarea>
        </div>
        <div class="line"></div>
        <div class="pd30 pdb40">
            <button class="btn-normal bg-blue" @click="addStep2">{{detail.goodsId == undefined ? '下一步' : '确 定' }}</button>
            <!-- <button v-if="detail.goodsId == undefined" class="btn-normal bg-blue" @click="checkValid('add')">下一步</button>
            <button v-else class="btn-normal bg-blue" @click="checkValid('edit')">确 定</button> -->
        </div>
        <div class="modal" v-show="showModal">
            <div class="detail-list clear">
                <span class="text-small">品牌</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../../images/radio-selected.svg">
                <span class="text-small">，牌号</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../../images/radio-selected.svg">
                <span class="text-small">，分类</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../../images/radio-selected.svg">
                <span class="text-small">，数量</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../../images/radio-selected.svg">
                <span class="text-small">，价格</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../../images/radio-selected.svg">
                <span class="text-small">，短溢装</span>
                <img class="ml10 mr20" v-show="selected===0" src="../../../../images/radio-selected.svg">
            </div>
            <div class="line"></div>
            <textarea class="detail-textarea"></textarea>
            <div class="line"></div>            
            <div class="detail-tip">说明：以空格符分隔，当前项为空时请预留位置。</div>
            <div class="btn-wrap">
                <button class="btn-normal bg-blue" @click="showModal=false;">确 定</button>
            </div>
        </div>
    </div>
</template>
<script>
    import App from "light"
    const Dialog = require('dialog')
    const API = require('api')
    
    import RadioList from "../../../../ui/radio-list"

    export default {
        components: {RadioList},
        data(){
            return {
                top: 0.8,
                vid: 5,
                precont: {

                },
                currencyInfo: {},
                spotUnitInfo: {},
                coinTypes: [],//币种                
                spotUnits: [],//计量单位
                detail: {},
                items:[{}],
                formalInfo: '',
                showModal: false,
                selected: 0,
                show_pick_currency: false,
                show_pick_unit: false
            }
        },
        computed: {
            sumPrice() {
                if(this.checkSpace(this.currencyInfo.currencyUnit) || this.checkSpace(this.detail.spotPrice) || this.checkSpace(this.detail.tradeAmount)) return;
                let sum = parseInt(this.detail.tradeAmount) * (this.detail.spotPrice*1);
                return sum.toFixed(2) + this.currencyInfo.currencyUnit;
            }
        },
        methods: {
            checkSpace(str) {
                if((!str && typeof str!=='number') || new RegExp("^[]+$").test(str)) {
                    return true
                } else {
                    return false
                }
            },
            checkInteger(str,name) {
                console.log(str);
                if(!/^\d+$/.test(str)) { 
                    Dialog.alert(name,"不是整数！");  
                }  
            },
            addStep2() {
                //必填项
                var that = this;
                console.log(this.precont)
                if(this.precont.precontId == undefined) {
                    return Dialog.alert("请添加预合同主体！");                    
                } else {
                    this.detail.precontId = this.precont.precontId;
                }

                this.detail.tradeCurrencyNo = this.currencyInfo.currencyNo; 
                console.log(this.detail.tradeCurrencyNo)
                if(this.checkSpace(this.detail.tradeCurrencyNo)) {
                    return Dialog.alert("请选择币种！");
                }

                if([2,3,4].indexOf(this.vid)>-1 && this.checkSpace(this.detail.productName)) {
                    return Dialog.alert("请填写品名！");
                }
                if(this.vid==5 && this.checkSpace(this.detail.brandName)) {
                    return Dialog.alert("请填写品牌！");
                }
                // if(this.vid==1 && this.checkSpace(this.detail.grade)) {
                //     return Dialog.alert("请填写牌号！");
                // }
                if(this.vid==5 && this.checkSpace(this.detail.spotType)) {
                    return Dialog.alert("请填写分类！");
                }
          
                if(this.checkSpace(this.detail.tradeAmount)) {
                    return Dialog.alert("请填写数量！");
                }
                this.detail.spotUnit = this.spotUnitInfo.spotUnit; 
                
                if(this.checkSpace(this.detail.spotUnit)) {
                    return Dialog.alert("请填写单位！");
                }
               
                if(this.checkSpace(this.detail.spotPrice)) {
                    return Dialog.alert("请填写价格！");
                }

                
                // if([1,2,3,5].indexOf(this.vid)>-1 && this.checkSpace(this.detail.moreorlessProportion)) {
                //     return Dialog.alert("请填写短溢装！");
                // }


                // if(this.vid==4 && this.checkSpace(this.detail.standard)) {
                //     return Dialog.alert("请填写规格！");
                // }
                // if(this.vid==4 && this.checkSpace(this.detail.material)) {
                //     return Dialog.alert("请填写材质！");
                // }
                // if(this.vid==5 && this.checkSpace(this.detail.modelNumber)) {
                //     return Dialog.alert("请填写型号！");
                // }
               
                // if(this.vid==3 && this.checkSpace(this.detail.batchNumber)) {
                //     return Dialog.alert("请填写公检批号！");
                // }
                
                if(this.vid==2 && this.checkSpace(this.detail.priceCategory)) {
                    return Dialog.alert("请填写价格类别！");
                }
                if(this.vid==4 && this.checkSpace(this.detail.productionArea)) {
                    return Dialog.alert("请填写生产地区！");
                }
                // if(this.vid==3 && this.checkSpace(this.detail.deliveryPlace)) {
                //     return Dialog.alert("请填写交货地！");
                // }
                // if(this.vid==2 && this.checkSpace(this.detail.totalMoisture)) {
                //     return Dialog.alert("请填写全水分！");
                // }
                // if(this.vid==2 && this.checkSpace(this.detail.volatileMatter)) {
                //     return Dialog.alert("请填写挥发分！");
                // }
                //  if(this.vid==2 && this.checkSpace(this.detail.ashContent)) {
                //     return Dialog.alert("请填写灰分！");
                // }
                // if(this.vid==2 && this.checkSpace(this.detail.charcoalHeat)) {
                //     return Dialog.alert("请填写发热量！");
                // }
                //  if(this.vid==2 && this.checkSpace(this.detail.sulfurContent)) {
                //     return Dialog.alert("请填写硫分！");
                // }

                //判断是新建还是编辑
                console.log(that.detail.goodsId)
                if(that.detail.goodsId !== undefined) {
                    API.contDetailModify({detail: that.detail}).then(function(data) {
                        Dialog.alert('编辑明细成功！');
                        console.log(that.$route.query.page)
                        if(that.$route.query.page=='detail') {
                            App.navigate("lay/contract/query/detail", { 
                                precontId: that.precont.precontId
                            });
                        } else {
                            App.navigate("lay/contract/add/step3", {
                                precont: JSON.stringify(that.precont),
                                detail: JSON.stringify(that.detail),
                                formalInfo: that.formalInfo
                            });   
                        }
                    }).catch(function(data) {
                        Dialog.alert('编辑明细失败！');
                    })
                } else {
                    API.contDetailAdd({data: that.detail}).then(function(data) {
                        Dialog.alert('添加明细成功！');
                        that.detail.goodsId = data[0].goodsId;
                        App.navigate("lay/contract/add/step3", {
                            precont: JSON.stringify(that.precont),
                            detail: JSON.stringify(that.detail),
                            formalInfo: that.formalInfo
                        });   
                    }).catch(function(data) {
                        Dialog.alert('添加明细失败！');
                    })
                }
               
            },
            showPickModal(type) {
                var that = this;
                if(type=='currency') {
                    that.show_pick_currency = true;
                } else {
                    that.show_pick_unit = true;
                }
            },
            handleVisibleChange1(val) {
                this.show_pick_currency = val;
            },
            handleVisibleChange2(val) {
                this.show_pick_unit = val;
            }
        },
        mounted(){
            var that = this;
            var precont = {};
            if(this.$route.query.precont){
                precont = JSON.parse(this.$route.query.precont);  
                that.precont = precont;
                // if(!this.$route.query.add) {
                //     if(precont.detailList && precont.detailList.length>0) {
                //         that.detail = precont.detailList[0];
                //     }
                // }
                
            }
            if(this.$route.query.detail) {
                that.detail = JSON.parse(this.$route.query.detail);
            }
            console.log(that.detail)
            //获todo取类别id
            API.futurtTypeVarietyQuery({futureKindId: that.precont.futureKindId}).then(function(data) {
                that.vid = data[0].varietyId;
                console.log(that.vid)
            })
            
            //获取币种和单位列表
            API.currencyInfoQuery({}).then(function(data) {
                if(that.$route.query.detail) {
                    that.detail = JSON.parse(that.$route.query.detail);
                }
                that.coinTypes = data;
                that.coinTypes.forEach(function(cointype) {
                    if(cointype.currencyNo==that.detail.tradeCurrencyNo) {
                        that.currencyInfo = cointype;
                    }
                })
            })

            //获取单位列表
            API.futureSpotUnitInfoQuery({}).then(function(data) {
                if(that.$route.query.detail) {
                    that.detail = JSON.parse(that.$route.query.detail);
                }
                that.spotUnits = data;
                that.spotUnits.forEach(function(spotunit) {
                    if(spotunit.spotUnit==that.detail.spotUnit) {
                        that.spotUnitInfo = spotunit;
                    }
                })
            })

            if(this.$route.query.formalInfo) {
                this.formalInfo = this.$route.query.formalInfo;
            } else {
                var deptName = this.$route.query.deptName;                        
                var strategyName = this.$route.query.strategyName;                        
                var futureKindName = this.$route.query.futureKindName;  
               
                this.formalInfo = deptName + "，" + strategyName + "，" + futureKindName + "，" + (precont.spotOpenDirection==1?'采购':'销售') + "，" + (precont.durationFlag==0?'非长约':'长约') + "，" + precont.customerShortname
                    + (!this.checkSpace(precont.transactionMode) ? ('，'+precont.transactionMode) : '')
                    + (!this.checkSpace(precont.deliverMode) ? ('，'+precont.deliverMode) : '')
                    + (!this.checkSpace(precont.warehouseName) ? ('，'+precont.warehouseName) : '')
                    + (!this.checkSpace(precont.deliverTime) ? ('，'+precont.deliverTime) : '')
                    + (!this.checkSpace(precont.remark) ? ('，'+precont.remark) : '');
            }
            
        }
    }
    
</script>
<style lang="less">

</style>
