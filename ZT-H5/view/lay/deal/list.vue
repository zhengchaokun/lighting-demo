
<template>
    <div>
        <cmd :com="comData"></cmd>
    </div>
</template>
<script>
    import cmd from "../../../ui/cmd.vue"
    const API = require("api");
    const Dialog = require("dialog");
    export default {
        data(){
            return {
                comData:{
                    prodData:null,
                    listData:null,
                    clickBtn:{
                        title:null,
                        cls:null,
                        handler:null
                    }
                }
            }
        },
        components:{
            cmd
        },
        watch:{
            "$route.query.type":function () {
                this.initData();
            }
        },
        methods:{
            initData(){
                this.comData = {
                    prodData:null,
                    listData:null,
                    clickBtn:{
                        title:null,
                        cls:null,
                        handler:null
                    }
                };
                const that = this;
                switch (''+this.$route.query.type){
                    default:
                        //查询产品
                        API.deptQuery({}).then(function (data) {
                            let deptData = [];
                            data.forEach(function (d) {
                                deptData.push({
                                    id:d.deptId,
                                    code:'',
                                    name:d.deptName,
                                })
                            });
                            that.comData.topData = {
                                current:0,
                                title:"机构",
                                list:deptData
                            }
                        }).then(function () {
                            API.contQuery({
                                deptIdStr:that.comData.topData.list[0].id
                            }).then(function (list) {
                                let contData = [];
                                list.forEach(function (l) {
                                    let item = {
                                        name:l.customerShortname,
                                        list:[]
                                    };
                                    l.details.forEach(function (d) {
                                        item.list.push([{
                                            '':d.goodsId,
                                            '品名':d.productName,
                                            '品牌':d.brandName,
                                        },{
                                            '':'采购',
                                            '价格':d.spotPrice,
                                            '数量':d.tradeAmount,
                                        }])
                                    });
                                    contData.push(item);
                                });
                                that.comData.listData = {
                                    'default':contData
                                };
                            });
                        });
                        that.comData.clickBtn = {
                            title:"撤销",
                            cls:"bgRed",
                            handler:function (item) {
                                Dialog.confirm({
                                    msg:"确认撤销此条目吗？",
                                    confirmText:"确认",
                                    cancelText:"取消",
                                    confirm(){
                                        return true;
                                    }
                                })
                            }
                        };
                        break;
                }
            }
        },
        mounted(){
            //查询可以撤销的订单
            this.initData();
        }
    }
</script>
<style lang="less">
</style>