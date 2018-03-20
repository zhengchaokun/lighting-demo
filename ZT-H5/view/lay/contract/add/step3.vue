
<template>
    <div>
        <div class="edit-bar flex ">
            <span class="flex1">合同主体</span>
            <span @click="edit('step1')">编辑</span>
        </div>
        <div class="line"></div>
        <textarea readonly v-model="info_body" class="detail-textarea" style="height: 1.6rem;"></textarea>
        <div class="line mb30"></div>

        
        <template v-for="(detail,index) in info_details">
            <div class="edit-bar flex" :key="index">
                <span class="flex1">物资明细{{ index+1}}</span>
                <span @click="edit('step2', details[index])">编辑</span>
            </div>
            <div class="line" :key="index+'1'"></div>
            <textarea :key="index+'2'" readonly :value="detail" class="detail-textarea" style="height: 1.6rem;"></textarea>
            <div class="line" :key="index+'3'" :class="{'mb30':index<info_details.length}"></div> 
        </template>
        

        <div class="pd30 pdb40 flex btn-wrap-two">
            <button class="btn-normal flex1 mr30 bg-green" @click="continueAdd">继续添加</button>
            <button class="btn-normal flex1 bg-blue" @click="finishAdd">完成</button>
        </div>
    </div>
</template>
<script>
    import App from "light";
    const Dialog = require('dialog');
    const API = require('api');
    
    export default {
        data(){
            return {
                precont: {},
                precont_copy: {},
                details: [],
                info_body: '',
                info_details: [],
                showConfirm: false
            }
        },
        methods: {
            edit(type, detail) {
                // console.log(type, detail)
                if(type=='step1') {
                    App.navigate("lay/contract/add/step1", { precont: JSON.stringify(this.precont) });
                } else {
                    App.navigate("lay/contract/add/step2", { 
                        precont: JSON.stringify(this.precont),
                        detail:  JSON.stringify(detail),
                        formalInfo: this.info_body
                    });
                    
                }
            },
            toNext(view) {
                App.navigate("lay/contract/add/"+view);
            },
            continueAdd() {
                console.log(this.precont)
                App.navigate("lay/contract/add/step2", {
                    precont: JSON.stringify(this.precont),
                    formalInfo: this.info_body,
                    add: true
                });                
            },
            finishAdd() {
                //添加预合同
                Dialog.confirm({
                    msg:'预合同创建成功，是否立即匹配期货指令？',
                    confirmText:"匹配期货指令",
                    cancelText:"取消",
                    cancel(){
                        //跳转
                        App.navigate("lay/contract/query/detail",{})                        
                    },
                    confirm() {
                        App.navigate("lay/contract/cmd/detail",{ precontId: that.precont.precontId })
                        return true
                    }
                })
            },
            checkValid(str) {
                if(str == null || !str || new RegExp("^[ ]+$").test(str)) {
                    return true
                } else {
                    return false
                }
            }
        },
        mounted () {
            var that = this;
            var precont = JSON.parse(this.$route.query.precont);
            // this.precont_copy = precont;
            // console.log(this.precont_copy)
            if(this.$route.query.formalInfo) {
                this.info_body = this.$route.query.formalInfo;
            } else {

            }
            

            //查询单个预合同的信息
            API.contMatchInfoQuery({ contId: precont.precontId }).then(function(data) {
                console.log(data);
                that.precont = data;
                that.details = data.detailList;
                that.details.forEach(function(detail,index) {
                    let str = '';
                    for(var key in detail) {
                        if(!that.checkValid(detail[key])) {
                            str += detail[key] + '，';
                        }
                    }
                    str = str.substr(0, str.length-1);
                    that.info_details.push(str);
                })
            })
        }
    }
</script>
<style lang="less" scoped>
    .edit-bar {
        padding: 0.1rem 0.3rem;
        justify-content: space-between;
    }
    .edit-bar span {
        font-size: 0.3rem;
        color: #4A4A4A;
        letter-spacing: 0;
        line-height: 0.42rem;
    }
    .edit-bar span:last-child {
        color: #9B9B9B;
    }
    .btn-wrap-two {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 0.3rem 0.4rem 0.3rem;
    }
    .alert-box p{
        background: pink;
        text-align: left !important;
    }
</style>
