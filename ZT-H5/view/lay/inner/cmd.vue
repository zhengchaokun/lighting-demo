
<template>
    <div>
        <cmd :com="comData" @checkedTop="checkedItem"></cmd>
    </div>
</template>
<script>
    import cmd from "../../../ui/cmd.vue"
    import Light from "light";
    const API = require("api");
    const Dialog = require("dialog");
    export default {
        data(){
            return {
                comData:{
                    topData:null,
                    listData:null,
                    tabsData:null,
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
            checkedItem(item){
                item.checked = !item.checked;
            },
            initData(){
                this.comData = {
                    topData:null,

                    listData:null,
                    tabsData:null,
                    clickBtn:{
                        title:null,
                        cls:null,
                        handler:null
                    }
                };
                const that = this;
                switch (''+this.$route.query.type){
                    case "1":
                        API.insQuery({
                            insStatusStr:require("dict").insStatus['待审批']
                        }).then(function (list) {
                            let listData = [];
                            list.forEach(function (l) {
                                listData.push({
                                    pName:l.fundName,
                                    name:l.combiName,
                                    code:l.fundId,
                                    list:[
                                        [{
                                            '':l.insId,
                                            ' ':'买入',
                                            '  ':'开仓',
                                            '价格':l.insPrice,
                                        },{
                                            '指令数量':l.insAmount,
                                            '已委托':l.insAmount,
                                            '已成交':l.insAmount,
                                        }]
                                    ]
                                })
                            });
                            that.comData.listData =listData
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
                    case "2":
                        //查询产品
                        API.fundQuery({}).then(function (data) {
                            let deptData = [];
                            data.forEach(function (d,index) {
                                deptData.push({
                                    id:d.fundId,
                                    code:d.fundCode,
                                    name:d.fundName,
                                    checked:index===0
                                })
                            });
                            that.comData.topData = {
                                title:"产品",
                                list:deptData
                            }
                        }).then(function () {
                            API.insQuery({
                                insStatusStr:require("dict").insStatus['待审批']
                            }).then(function (list) {
                                let listData = [];
                                list.forEach(function (l) {
                                    listData.push({
                                        pName:l.fundName,
                                        name:l.combiName,
                                        code:l.fundId,
                                        list:[
                                            [{
                                                '':l.insId,
                                                ' ':'买入',
                                                '  ':'开仓',
                                                '价格':l.insPrice,
                                            },{
                                                '指令数量':l.insAmount,
                                                '已委托':l.insAmount,
                                                '已成交':l.insAmount,
                                            }]
                                        ]
                                    })
                                });
                                that.comData.listData = listData
                                that.comData.tabsData = [{
                                    title:'未执行',
                                    value:''
                                },{
                                    title:'执行中',
                                    value:''
                                },{
                                    title:'已完成',
                                    value:''
                                },{
                                    title:'已撤销',
                                    value:''
                                }]
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
                    case "3":
                        //查询产品
                        API.fundQuery({}).then(function (data) {
                            let deptData = [];
                            data.forEach(function (d,index) {
                                deptData.push({
                                    id:d.fundId,
                                    code:d.fundCode,
                                    name:d.fundName,
                                    checked:index===0
                                })
                            });
                            that.comData.topData = {
                                current:0,
                                title:"产品",
                                list:deptData
                            }
                        }).then(function () {
                            API.insQuery({
                                insStatusStr:require("dict").insStatus['待审批']
                            }).then(function (list) {
                                let listData = [];
                                list.forEach(function (l) {
                                    listData.push({
                                        pName:l.fundName,
                                        name:l.combiName,
                                        code:l.fundId,
                                        list:[
                                            [{
                                                '':l.insId,
                                                ' ':'买入',
                                                '  ':'开仓',
                                                '持仓均价':l.insPrice,
                                            },{
                                                '持仓':l.insAmount,
                                                '可平':l.insAmount,
                                            }]
                                        ]
                                    })
                                });
                                that.comData.listData = listData
                            });
                        });
                        that.comData.clickBtn = {
                            title:"平仓",
                            cls:"bgBlue",
                            handler:function (item) {
                                Dialog.confirm({
                                    msg:"确认平仓此条目吗？",
                                    confirmText:"确认",
                                    cancelText:"取消",
                                    confirm(){
                                        that.jump('lay/inner/bs',{
                                            type:1,
                                            ...item
                                        });
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