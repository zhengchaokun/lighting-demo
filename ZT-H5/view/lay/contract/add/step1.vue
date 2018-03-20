
<template>
    <div class="bg-gray-2">
        <ul class="mb30 bg-white">
            <div class="line"></div>            
            <li class="cell pdr20" @click="showPickModal('dept')">
                <span>
                    <span class="text-label inline-b"><span class="text-red">*</span>机构</span>
                    <span class="text-label ml40 inline-b">{{ dept.deptName }}</span>
                </span>
                
                <div class="fright">
                    <span class="text-sub inline-b">选择</span>
                    <img src="../../../../images/more.svg" class="icon-more fright ml22" />
                </div>
            </li>

            <div class="line line-left"></div>
            <li class="cell pdr20" @click="showPickModal('strategy')">
                <span>
                    <span class="text-label inline-b"><span class="text-red">*</span>策略</span>
                    <span class="text-label ml40 inline-b">{{ strategy.strategyName }}</span>
                </span>
                
                <div class="fright">
                    <span class="text-sub inline-b">选择</span>
                    <img src="../../../../images/more.svg" class="icon-more fright ml22" />
                </div>
            </li>
            <div class="line line-left"></div>
            <li class="cell pdr20" @click="showPickModal('futureKind')">
                <span>
                    <span class="text-label inline-b"><span class="text-red">*</span>品种</span>
                    <span class="text-label ml40 inline-b">{{ futureKind.futureKindName }}</span>                    
                </span>
                
                <div class="fright">
                    <span class="text-sub inline-b">选择</span>
                    <img src="../../../../images/more.svg" class="icon-more fright ml22" />
                </div>
            </li>
            <div class="line"></div>                
        </ul>

        <ul class="mb30 bg-white">
            <div class="line"></div>
            <template v-for="(item,index) in select_items">
                <li class="cell" :key="index" @click="handleSelect(item)">
                    <span class="text-label">{{ item.label }}</span>
                    <img class="fright" v-show="precont.spotOpenDirection===item.value" src="../../../../images/radio-selected.svg">
                </li>
                <div class="line" :class="{'line-left':index===0}" :key="'-'+index"></div>
            </template>
        </ul>
        <div class="line"></div>
        <li class="cell bg-white" @click="handleCheck">
            <span class="text-label">长约</span>
            <img class="fright" v-show="precont.durationFlag==1" src="../../../../images/radio-selected.svg">
        </li>
        <div class="line mb30"></div>
        <div class="mb20 tright pdr30 text-link" @click="showModal=true">
            快捷输入
        </div>
        
        <div class="line"></div>

        <div class="cell flex">
            <span class="text-label mr30"><span class="text-red">*</span>客户抬头</span>
            <input class="flex1" v-model="precont.customerShortname">
        </div>
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell flex">
            <span class="text-label mr30">成交方式</span>
            <input class="flex1" v-model="precont.transactionMode">
        </div>
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell flex">
            <span class="text-label mr30">提货方式</span>
            <input class="flex1" v-model="precont.deliverMode">
        </div>
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell flex">
            <span class="text-label mr30">仓库/码头</span>
            <input class="flex1" v-model="precont.warehouseName">
        </div>
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell flex">
            <span class="text-label mr30">交付时间</span>
            <input class="flex1" v-model="precont.deliverTime">
        </div>
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell pdr30 flex" style="height: 1.48rem;">
            <textarea  v-model="precont.remark" class="flex1" style="height: 1rem;" placeholder="备注" wrap="physical"></textarea>
        </div>
        <div class="line"></div>
        <div class="pd30 pdb40">
            <button v-if="!precont.detailList||precont.detailList.length==0" class="btn-normal bg-blue" @click="checkValid('add')">下一步</button>
            <button v-else class="btn-normal bg-blue" @click="checkValid('edit')">确 定</button>
        </div>
        <div class="modal" v-show="true">
            <div class="detail-list clear">
                <template v-for="(item, index) in items">
                    <span :key="index" class="text-small" :class="{'fc-gray':input_items.indexOf(index)==-1}" >{{ item }}</span>
                    <img :key="'img'+index" class="ml10 mr20" v-show="input_items.indexOf(index)>-1" src="../../../../images/radio-selected.svg">
                </template>
                
            </div>
            <div class="line"></div>
            <textarea class="detail-textarea" v-model="input_text" @input="handleInput" @change="handleChange"></textarea>
            <div class="line"></div>            
            <div class="detail-tip">说明：以空格符分隔，当前项为空时请预留位置。</div>
            <div class="btn-wrap">
                <button class="btn-normal bg-blue" @click="showModal=false;">确 定</button>
            </div>
        </div>
       
        <radio-list v-model="dept" :list="depts" type="deptName" :visible.sync="show_pick_dept" @visible-change="handleVisibleChange1"></radio-list>
        <radio-list v-model="strategy" :list="strategies" type="strategyName" :visible.sync="show_pick_strategy" @visible-change="handleVisibleChange2"></radio-list>
        <radio-list v-model="futureKind" :list="futureKinds" type="futureKindName" :visible.sync="show_pick_futureKind" @visible-change="handleVisibleChange3"></radio-list>
    </div>

    

    
</template>
<script>
import App from "light"
import RadioList from "../../../../ui/radio-list"
const API = require('api')
const Dialog = require('dialog')

export default {
    components: { RadioList },
    data() {
        return {
            dept: {},//机构
            strategy: {},//策略
            futureKind: {},//品种
            precont: {
                deptId: '',
                strategyId: '',
                futureKindId: '',
                spotOpenDirection: 1,
                durationFlag: 0,
                customerShortname:'',//客户抬头
                transactionMode: '',//成交方式
                deliverMode: '',//提货方式
                warehouseName: '',//仓库
                deliverTime: '',//交付时间
                remark: '',//备注
                precontId: 0,
            },
            type: '',
            depts: [],
            futureKinds: [],
            strategies: [],

            input_text: '',
            input_arr: [],
            input_item: {},
            select_items: [{
                label:'采购',
                value: 1
            }, { 
                label:'销售',
                value: 2
            }],
            
            showModal: false,
            show_pick_dept: false,
            show_pick_strategy: false,
            show_pick_futureKind: false,
            items: ['客户抬头','，成交方式','，提货方式','，仓库/码头','，交付时间','，合同备注'],
            input_items: [],
            res: [],
            result: [{name:'301 杭实善成建信期货账户'},{name:'302 杭实善成建信期货账户'},{name:'303 杭实善成建信期货账户'},{name:'303 杭实善成建信期货账户'}]
        };
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
        checkValid(type) {
            this.precont.deptId = this.dept.deptId; 
            this.precont.strategyId = this.precont.strategyId; 
            this.precont.futureKindId = this.precont.futureKindId; 

            if(this.precont.deptId == undefined) {
                return Dialog.alert("请选择机构！");
            }
            if(this.precont.strategyId == undefined) {
                return Dialog.alert("请选择策略！");
            }
            if(this.precont.futureKindId == undefined) {
                return Dialog.alert("请选择品种！");
            }
            if(!this.precont.customerShortname || new RegExp("^[ ]+$").test(this.precont.customerShortname)) {
                return Dialog.alert("请填写客户抬头！");
            }
            if(type=='edit') {
                this.editStep1();
            } else {
                this.addStep1();
            }
            
        },
        editStep1() {
            var that = this;
            var precont = this.precont;
            var deptName = this.dept.deptName;                        
            var strategyName = this.strategy.strategyName;                        
            var futureKindName = this.futureKind.futureKindName;  
               
            var formalInfo = deptName + "，" + strategyName + "，" + futureKindName + "，" + (precont.spotOpenDirection==1?'采购':'销售') + "，" + (precont.durationFlag==0?'非长约':'长约') + "，" + precont.customerShortname
                + (!this.checkSpace(precont.transactionMode) ? ('，'+precont.transactionMode) : '')
                + (!this.checkSpace(precont.deliverMode) ? ('，'+precont.deliverMode) : '')
                + (!this.checkSpace(precont.warehouseName) ? ('，'+precont.warehouseName) : '')
                + (!this.checkSpace(precont.deliverTime) ? ('，'+precont.deliverTime) : '')
                + (!this.checkSpace(precont.remark) ? ('，'+precont.remark) : '');
            //TODO:编辑接口！
            API.contMainModify({data: that.precont}).then(function(data) {
                Dialog.alert('编辑主体成功！');
                if(that.$route.query.page=='detail') {
                    App.navigate("lay/contract/query/detail", { 
                        precontId: that.precont.precontId
                    });
                } else {
                    App.navigate("lay/contract/add/step3", { 
                        precont: JSON.stringify(that.precont),
                        formalInfo: formalInfo
                    });
                }
            })
            
        },
        addStep1() {

            var that = this;
            API.contIdGet({}).then(function(data) {
                that.precont.precontId = data.precontId;
                API.contMainAdd({data: that.precont}).then(function(data) {
                    console.log(that.precont)
                    App.navigate("lay/contract/add/step2",{ 
                        precont: JSON.stringify(that.precont),
                        deptName: that.dept.deptName,
                        strategyName: that.strategy.strategyName,
                        futureKindName: that.futureKind.futureKindName
                    });
                })
            })
            
        },
        //打开选择/查询列表
        showPickModal(type) {
            var that = this;
            that.type = type;
            if(type=="dept") {
                that.show_pick_dept = true;
            } else if (type=='strategy') {
                that.show_pick_strategy = true;
               
            } else {
                that.show_pick_futureKind = true;
               
            }
            
        },
        handleInput(e) {
            var that = this;
            that.res = that.input_text.split(" ");
            
            // var arr = e.target.value.split(' ');
            // var len = arr.length;
            // console.log(len,arr);            
            // if(len > 0) {
            //     if(arr[len-1]=='') {

            //         if(this.res.length < 6) {
            //             let idx = this.res.indexOf(arr[len-2]);
            //             if(idx == -1) {
            //                 this.res.push(arr[len-2]);
            //             } else {
            //                 this.res.splice(idx+1, 1);
            //             }
                        
            //         }
            //     }
            //     if(len==1 && arr[0]=='' && this.res.length > 0) {
            //         this.res=[];
            //     }
            // }
            console.log('res————',this.res.toString())
        },
        handleChange(val) {
            // var arr = this.input_text.split(/\s+/);
        },
        handleSelect(item) {
            this.precont.spotOpenDirection = item.value;
        },
        handleCheck() {
            this.precont.durationFlag = this.precont.durationFlag == 0 ? 1 : 0;
        },
        handleVisibleChange1(val) {
            this.show_pick_dept = val;
        },
        handleVisibleChange2(val) {
            this.show_pick_strategy = val;
        },
        handleVisibleChange3(val) {
            this.show_pick_futureKind = val;
        }
    },
    mounted () { 
        var that = this; 

        //查询机构列表 
        API.deptQuery({}).then(function(data) {
            if(that.$route.query.precont) {
                that.precont = JSON.parse(that.$route.query.precont);
            }
            that.depts = data;
            that.depts.forEach(function(dept) {
                if(dept.deptId = that.precont.deptId) {
                    that.dept = dept;
                }
            })
            //查询策略列表 
            API.strategyQuery({deptId: that.dept.deptId}).then(function(data) {
                that.strategies = data;
                that.strategies.forEach(function(strategy) {
                    if(strategy.strategyId = that.precont.strategyId) {
                        that.strategy = strategy;
                    }
                })

                //查询品种列表 
                API.futureKindQuery({futureKindIdStr: that.strategy.futureKindIdList}).then(function(data) {
                    that.futureKinds = data;
                    that.futureKinds.forEach(function(futureKind) {
                        if(futureKind.futureKindId = that.precont.futureKindId) {
                            that.futureKind = futureKind;
                        }
                    })
                })
            })

        })
        

        // API.deptQuery({}).then(function(data) {
        //     if(that.$route.query.precont) {
        //         that.precont = JSON.parse(that.$route.query.precont);
        //     }
        //     that.depts = data;
        //     that.depts.forEach(function(dept) {
        //         if(dept.deptId = that.precont.deptId) {
        //             that.dept = dept;
        //         }
        //     })
        // })
        //查询结构列表 
        // API.deptQuery({}).then(function(data) {
        //     if(that.$route.query.precont) {
        //         that.precont = JSON.parse(that.$route.query.precont);
        //     }
        //     that.depts = data;
        //     that.depts.forEach(function(dept) {
        //         if(dept.deptId = that.precont.deptId) {
        //             that.dept = dept;
        //         }
        //     })
        // })
        
    }
};
</script>
<style lang="less" scoped>
    .detail-list {
        line-height: 0.36rem;
    }
    .fc-gray {
        color: #9B9B9B;
    }
    .search-bar {
        padding: 0.2rem 0.3rem 0.3rem 0.3rem;
    }
    .search-bar input {
        height: 0.84rem;
        background: #FFFFFF;
        border: 0.02rem solid #D7D7D7;
        border-radius: 0.04rem;
        padding: 0.06rem 0.2rem;
        font-size: 0.34rem;
        color: #4A4A4A;
        letter-spacing: 0.0.5rem;
        line-height: 0.72rem;
        font-weight: bold;
    }
    .search-bar button {
        width: 1.2rem;
        height: 0.84rem;
    }
    .search-list {
        font-size: 0.34rem;
        color: #787878;
        letter-spacing: 0.0.5rem;
        line-height: 0.72rem;
        padding: 0 0.3rem 0.3rem 0.5rem;
    }
</style>
