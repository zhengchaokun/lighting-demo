
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
                    case "1":
                        API.insQuery({
                            insStatusStr:require("dict").insStatus['待审批']
                        }).then(function (list) {
                            that.comData.listData = {
                                "default":list
                            };
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
                            that.comData.prodData = {
                                current:0,
                                fundList:data
                            }
                        }).then(function () {
                            API.insQuery({
                                insStatusStr:require("dict").insStatus['待审批']
                            }).then(function (list) {
                                that.comData.listData = {
                                    '未执行':list,
                                    '执行中':list,
                                    '已完成':list,
                                    '已取消':list
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
                    case "3":
                        //查询产品
                        API.fundQuery({}).then(function (data) {
                            that.comData.prodData = {
                                current:0,
                                fundList:data
                            }
                        }).then(function () {
                            API.insQuery({
                                insStatusStr:require("dict").insStatus['待审批']
                            }).then(function (list) {
                                that.comData.listData = {
                                    "default":list
                                };
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