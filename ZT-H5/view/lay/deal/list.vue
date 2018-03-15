
<template>
    <div>
        <cmd :com="comData" @checkedTop="checkedItem"></cmd>
    </div>
</template>
<script>
    import cmd from "../../../ui/cmd.vue"
    const API = require("api");
    const Dialog = require("dialog");

    const typeMap = {
        "1":{
            title:'未确认',
            value:'1,2'
        },
        "2":{
            title:'待处理',
            value:'3'
        },
        "3":{
            title:'已确认',
            value:'4'
        },
        "4":{
            title:'已作废',
            value:'5'
        }
    };
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
                this.queryCont()
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
                if(''+this.$route.query.type==='5'){
                    let tabs = [];
                    for(let key in typeMap){
                        tabs.push(typeMap[key]);
                    }
                    this.comData.tabsData = tabs
                }
                this.queryStart()
            },
            queryCont(){
                const that = this;

                let deptId = [];
                this.comData.topData.list.forEach(function (top) {
                    if(top.checked) deptId.push(top.id);
                });

                //查询合约
                return API.contQuery({
                    deptIdStr:deptId.join(","),
                    precontStatusStr:typeMap[that.$route.query.type+'']?typeMap[that.$route.query.type+''].value:typeMap['1'].value
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
                    that.comData.listData = contData;
                });
            },
            queryDept(){
                const that = this;

                //查询产品
                return API.deptQuery({}).then(function (data) {
                    let deptData = [];
                    data.forEach(function (d,index) {
                        deptData.push({
                            id:d.deptId,
                            code:'',
                            name:d.deptName,
                            checked:index===0
                        })
                    });
                    that.comData.topData = {
                        title:"机构",
                        list:deptData
                    };
                }).then(function () {

                });
            },
            queryStart(){
                const that = this;
                this.queryDept().then(this.queryCont);

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