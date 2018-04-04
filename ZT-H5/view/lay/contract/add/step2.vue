
<template>
    <div>
        <div class="line"></div>
        <textarea readonly v-model="formalInfo" class="detail-textarea" style="height: 1.6rem;"></textarea>
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell pick pdr20" @click="showPickModal('currency')">
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

        <div class="mb20 tright pdr30 text-link" @click="openQuickInput">
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
            <div class="line"></div>            
            <div class="cell pdr20 pick" @click="showPickModal('spotUnit')">
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
        </div>
       
        <div class="modal" v-show="show_pick_quick">
            <div class="detail-list clear">
                <span v-for="(item, index) in items" :key="index" class="text-small" :class="{'fc-gray':input_items.indexOf(index)==-1}">
                    <span class="text-red" v-if="required.indexOf(item)>-1">*</span>
                    <span>{{ item }}</span>
                    <img :key="'img'+index" v-show="input_items.indexOf(index)>-1" src="../../../../images/radio-selected.svg">
                    <span v-if="index<items.length-1"  :key="'text'+index">，</span>
                </span>
            </div>
            <div class="line"></div>
            <textarea class="detail-textarea" v-model="input_text" @input="handleInput"></textarea>
            <div class="line"></div>            
            <div class="detail-tip">说明：以空格符分隔，当前项为空时请预留位置。</div>
            <div class="btn-wrap">
                <button class="btn-normal bg-blue" @click="closeQuickInput">确 定</button>
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
                vid: 1,
                precont: {},
                currencyInfo: {},
                spotUnitInfo: {},
                coinTypes: [],//币种                
                spotUnits: [],//计量单位
                detail: {},
                formalInfo: '',
                show_pick_quick: false,
                selected: 0,
                show_pick_currency: false,
                show_pick_unit: false,
                input_text: '',
                input_items: [],
                res: [],
                keys: [],
                scrollTop: 0
            }
        },
        computed: {
            sumPrice() {
                if(this.checkSpace(this.currencyInfo.currencyUnit) || this.checkSpace(this.detail.spotPrice) || this.checkSpace(this.detail.tradeAmount)) return;
                let sum = parseInt(this.detail.tradeAmount) * (this.detail.spotPrice*1);
                return sum.toFixed(2) + this.currencyInfo.currencyUnit;
            },
            //快捷输入不用管必填或选填，只要把值取到，赋给相应的input即可；
            //快捷输入完成后，把值赋给input，每种情况的值不一样
            items() {
                var items = [];
                switch (this.vid) {
                    case 1:
                        items = ['品牌','牌号','分类','数量','价格','短溢装'];
                        break;
                    case 2:
                        items = ['品名','品牌','数量','价格','短溢装','价格类别','全水分','挥发分','灰分','发热量','硫分'];
                        break;
                    case 3:
                        items = ['品名','数量','价格','短溢装','公检批号','交货地'];
                        break;
                    case 4:
                        items = ['品名','品牌','数量','价格','规格','材质','生产地区'];
                        break;
                    case 5:
                        items = ['品牌','分类','数量','价格','短溢装','型号'];
                        break;
                    default:
                        break;
                }
                items.push('明细备注');
                return items;
            },
            required() {
                var required = [];
                required = ['数量','价格','金额'];
                switch (this.vid) {
                    case 2:
                        required.push('品名','价格类别');
                        break;
                    case 3:
                        required.push('品名');
                        break;
                    case 4:
                        required.push('品名','生产地区');
                        break;
                    case 5:
                        required.push('品牌','分类');
                        break;
                    default:
                        break;
                }
                return required;
            }
        },
        watch: {
            res(val){
                this.input_items = [];
                var that = this;
                val.forEach(function(i,idx) {
                    if(i!='') {
                        that.input_items.push(idx);
                    }
                })
            },
            show_pick_currency(val) {
                if(!val) {
                    this.permitScroll();
                }
            },
            show_pick_unit(val) {
                if(!val) {
                    this.permitScroll();
                }
            }
        },
        methods: {
            permitScroll() {
                API.permitScroll()
                window.scrollTo(0,this.scrollTop);
            },
            checkSpace(str) {
                var flag = (!str && typeof str!=='number') || new RegExp("^[]+$").test(str);
                if(flag) {
                    return true
                } else {
                    return false
                }
            },
            // checkInteger(str,name) {
            //     if(!/^\d+$/.test(str)) { 
            //         Dialog.alert(name,"不是整数！");  
            //     }  
            // },
            addStep2() {
                //必填项
                var that = this;
                if(this.precont.precontId == undefined) {
                    return Dialog.alert("请添加预合同主体！");                    
                } else {
                    this.detail.precontId = this.precont.precontId;
                }

                this.detail.tradeCurrencyNo = this.currencyInfo.currencyNo; 
                if(this.checkSpace(this.detail.tradeCurrencyNo)) {
                    return Dialog.alert("请选择币种！");
                }

                if([2,3,4].indexOf(this.vid)>-1 && this.checkSpace(this.detail.productName)) {
                    return Dialog.alert("请填写品名！");
                }
                if(this.vid==5 && this.checkSpace(this.detail.brandName)) {
                    return Dialog.alert("请填写品牌！");
                }
                
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

                if(this.vid==2 && this.checkSpace(this.detail.priceCategory)) {
                    return Dialog.alert("请填写价格类别！");
                }
                if(this.vid==4 && this.checkSpace(this.detail.productionArea)) {
                    return Dialog.alert("请填写生产地区！");
                }
               
                //判断是新建还是编辑
                if(that.detail.goodsId !== undefined) {
                    API.contDetailModify({detail: that.detail}).then(function(data) {
                        Dialog.alert('编辑明细成功！');
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
                that.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                API.forbidScroll();
            },
            handleVisibleChange1(val) {
                this.show_pick_currency = val;
            },
            handleVisibleChange2(val) {
                this.show_pick_unit = val;
            },
            handleInput() {
                var that = this;
                that.res = that.input_text.split(" ");
            },
            getValueStr(val) {
                if(!val || val == undefined) {
                    return ' ';
                } else {
                    return val.replace(/\s/g, "") + ' ';
                }
            },
            convertArrayToStr(keys) {
                var that = this;
                var str = '';
                keys.forEach(function(key) {
                    str += that.getValueStr(that.detail[key]);
                })
                return str.replace(/\s*$/g,'');
            },
            openQuickInput() {
                var precont = this.precont;
                this.keys = [];
                switch (this.vid) {
                    case 1:
                        this.keys = ['brandName','grade','spotType','tradeAmount','spotPrice','moreorlessProportion'];
                        break;
                    case 2:                    
                        this.keys = ['productName','brandName','tradeAmount','spotPrice','moreorlessProportion','priceCategory','totalMoisture','ashContent','charcoalHeat','sulfurContent'];
                        break;
                    case 3:
                        this.keys = ['productName','tradeAmount','spotPrice','moreorlessProportion','batchNumber','deliveryPlace'];
                        break;
                    case 4:
                        this.keys = ['productName','brandName','tradeAmount','spotPrice','standard','material','productionArea'];
                        break;
                    case 5:
                        this.keys = ['brandName','spotType','tradeAmount','spotPrice','moreorlessProportion','modelNumber'];
                        break;
                
                    default:
                        break;
                }
                this.keys.push('remark');
                this.input_text = this.convertArrayToStr(this.keys);
                this.res = this.input_text.split(" ");
                this.show_pick_quick = true;
                this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                API.forbidScroll(); 
            },
            closeQuickInput() {
                var that = this;
                this.keys.forEach(function(r,i) {
                    that.detail[r] = that.res[i];
                })
                this.show_pick_quick = false;
                this.permitScroll();

            }
        },
        mounted() {
            document.body.addEventListener('touchstart', function () { });
            var that = this;
            var precont = {};
            if(this.$route.query.precont){
                precont = JSON.parse(this.$route.query.precont);  
                that.precont = precont;
            }
            if(this.$route.query.detail) {
                that.detail = JSON.parse(this.$route.query.detail);
            }
            //获todo取类别id
            API.futurtTypeVarietyQuery({futureKindId: that.precont.futureKindId}).then(function(data) {
                that.vid = data[0].varietyId;
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
            
        },
        afterHide () {
            API.permitScroll();
        }
    }
    
</script>
<style lang="less" scoped>
    .fc-gray {
        color: #9B9B9B;
    }
    .modal {
        top: 0.8rem;
    }
    .text-small {
        line-height: 0.36rem;
        margin-bottom: 0.08rem;
    }
</style>
