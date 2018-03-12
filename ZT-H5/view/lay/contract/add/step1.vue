
<template>
    <div class="bg-gray-2">
        <ul class="mb30 bg-white">
            <div class="line"></div>            
            <li class="cell pdr20">
                <span>
                    <span class="text-label inline-b">机构</span>
                    <span class="text-label ml20 inline-b">杭城善事</span>
                </span>
                
                <div class="fright" @click="showPickModal">
                    <span class="text-sub inline-b">选择</span>
                    <img src="../../../../images/more.svg" class="icon-more fright ml11" />
                </div>
            </li>
            <div class="line line-left"></div>
            <li class="cell pdr20">
                <span class="text-label inline-b">策略</span>
                <div class="fright">
                    <span class="text-sub inline-b">选择</span>
                    <img src="../../../../images/more.svg" class="icon-more fright ml11" />
                </div>
            </li>
            <div class="line line-left"></div>
            <li class="cell pdr20">
                <span class="text-label inline-b">品种</span>
                <div class="fright">
                    <span class="text-sub inline-b">选择</span>
                    <img src="../../../../images/more.svg" class="icon-more fright ml11" />
                </div>
            </li>
            <div class="line"></div>                
        </ul>
        <ul class="mb30 bg-white">
            <div class="line"></div>
            <li class="cell">
                <span class="text-label">采购</span>
                <img class="fright" v-show="selected===0" src="../../../../images/radio-selected.svg">
            </li>
            <div class="line line-left"></div>
            <li class="cell">
                <span class="text-label">销售</span>
                <img class="fright" v-show="selected===1" src="../../../../images/radio-selected.svg">
            </li>
            <div class="line"></div>
        </ul>
        <div class="line"></div>
        <li class="cell bg-white">
            <span class="text-label">长约</span>
            <img class="fright" v-show="selected===2" src="../../../../images/radio-selected.svg">
        </li>
        <div class="line mb30"></div>
        <div class="mb20 tright pdr30 text-link" @click="showModal=true">
            快捷输入
        </div>
        <div class="line"></div>
        <div class="cell flex">
            <span class="text-label mr30">客户抬头</span>
            <input class="flex1">
        </div>
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell flex">
            <span class="text-label mr30">成交方式</span>
            <input class="flex1">
        </div>
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell flex">
            <span class="text-label mr30">提货方式</span>
            <input class="flex1">
        </div>
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell flex">
            <span class="text-label mr30">仓库/码头</span>
            <input class="flex1">
        </div>
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell flex">
            <span class="text-label mr30">交付时间</span>
            <input class="flex1">
        </div>
        <div class="line mb30"></div>
        <div class="line"></div>
        <div class="cell pdr30 flex" style="height: 1.48rem;">
            <textarea class="flex1" style="height: 1rem;" placeholder="备注" wrap="physical"></textarea>
        </div>
        <div class="line"></div>
        <div class="pd30 pdb40">
            <button class="btn-normal bg-blue" @click="toNext">下一步</button>
        </div>
        <div class="modal" v-show="showModal">
            <div class="detail-list clear">
                <template v-for="(item, index) in items">
                    <span class="text-small" :class="{'fc-gray':input_items.indexOf(index)==-1}" >{{ item }}</span>
                    <img class="ml10 mr20" v-show="input_items.indexOf(index)>-1" src="../../../../images/radio-selected.svg">
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
        <div class="modal" v-show="show_pick_modal">
            <div class="search-bar flex">
                <input v-model="keyValue" class="search-input mr30 flex1">
                <button class="btn-normal bg-green" @click="show_pick_modal=false;">确定</button>
            </div>
            <div class="search-list">
                <ul>
                    <li v-for="(item, index) in result" :key="index">{{item.name}}</li>
                </ul>
            </div>
        </div>


    </div>

    

    
</template>
<script>
import App from "light"
export default {
    data() {
        return {
            input_text: '',
            input_arr: [],
            selected: 0,
            showModal: false,
            show_pick_modal: false,
            pickList: [],
            keyValue: '',
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
        toNext() {
            App.navigate("lay/contract/add/step2");
        },
        showPickModal() {
            this.pickList = [];
            this.show_pick_modal = true;
        },
        handleInput(e) {
            var arr = e.target.value.split(' ');
            var len = arr.length;
            if(len > 0) {
                if(arr[len-1]=='') {

                    if(this.res.length < 6) {
                        let idx = this.res.indexOf(arr[len-2]);
                        if(idx == -1) {
                            this.res.push(arr[len-2]);
                        } else {
                            this.res.splice(idx+1, 1);
                        }
                        
                    }
                }
                if(len==1 && arr[0]=='' && this.res.length > 0) {
                    this.res=[];
                }
            }
            // console.log('res————',this.res.toString())
        },
        handleChange(val) {
            // var arr = this.input_text.split(/\s+/);
        }
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
