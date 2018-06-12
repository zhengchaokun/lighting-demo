
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>
        <div class="demo">
            <div class="form-wrap">
                <div>
                    <span>是否合并查询条件</span>
                    <el-switch
                        v-model="isMerged"
                        on-text=""
                        off-text=""
                        on-color=""
                        off-color="">
                    </el-switch>
                    <el-popover
                        ref="popover1"
                        placement="bottom-start"
                        title="合并"
                        width="270"
                        trigger="hover"
                        content="将查询条件合并成一项，使用户操作更简便">
                    </el-popover>
                    <img class="tooltip-img" src="../../../images/tooltip.svg" v-popover:popover1>
                    
                </div>
                
                <el-form :inline="true" :model="formInline" class="demo-search-form-inline">
                    <template v-if="!isMerged">
                        <el-form-item label="App名称" label-width="70px">
                            <el-input v-model="formInline.name" class="w150" placeholder="输入App名称查询"></el-input>
                        </el-form-item>
                        <el-form-item label="版本号" label-width="70px">
                            <el-input v-model="formInline.version" class="w150" placeholder="输入版本号查询"></el-input>  
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="search">查询</el-button>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item>
                            <el-input v-model="keyword" icon="search" :on-icon-click="search" placeholder="输入App名称/版本号查询">
                                <span slot="prepend">查询</span>
                            </el-input>
                        </el-form-item>
                    </template>
                    <el-form-item>
                        <el-button type="plain" @click="reset">重置</el-button>                        
                    </el-form-item>
                </el-form>
            </div>
            

            <el-table
                empty-text="查询结果为空"
                :data="tableData"
                stripe
                style="width: 80%">
                <el-table-column
                    prop="name"
                    label="App名称"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="version"
                    label="版本号"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="发布日期"
                    min-width="140">
                </el-table-column>
                <el-table-column
                    prop="weight"
                    label="权重"
                    min-width="80">
                </el-table-column>
            </el-table>
            <el-pagination
                class="mgt50"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
       </div>
    </div>
</template>
<script>
    import top from "../../../ui/top.vue";
    const API = require("../../../lib/api");

    export default {
        components: {
            top
        },
        data(){
            return {
                title: '查询表格',
                desc: '数据较多时可查询表格，多与行内表单组合使用。',
                currentPage: 1,
                pageSize: 5,
                isMerged: true,
                keyword: '',
                formInline: {
                    name: "",
                    version: ""
                },
                tableData: [],
                totalData: [],
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.tableData = this.totalData.slice(val*(this.currentPage-1), this.currentPage*val);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.tableData = this.totalData.slice(this.pageSize*(val-1), this.pageSize*val);
            },
            onSubmit() {
                this.$message({
                    message: '查无此人！',
                    type: 'error'
                });
            },
            searchInData(obj) {
                var that = this;
                this.totalData = [];
                this.tableData = [];
                for (var key in obj) {
                    if(key=='keyword') {
                        API.totalData.forEach(function(item, idx) {
                            if(item.name.indexOf(obj[key]) > -1 || item.version.indexOf(obj[key]) > -1) {
                                that.totalData.push(item);
                            }
                        })
                    } else {
                        API.totalData.forEach(function(item, idx) {
                            if(item['name'].indexOf(obj['name']) > -1 && item['version'].indexOf(obj['version']) > -1) {
                                if(that.totalData.indexOf(item)==-1) {
                                    that.totalData.push(item);
                                }
                                
                            }
                        })
                    }
                    
                }
               
                this.tableData = this.totalData.slice(0, this.pageSize);

            },
            search() {
                if(this.isMerged) {
                    this.searchInData({
                        keyword: this.keyword
                    });
                } else {
                    this.searchInData({
                        name: this.formInline.name,
                        version: this.formInline.version
                    })
                }
            },
            reset() {
                this.totalData = API.totalData;
                this.tableData = this.totalData.slice(0, this.pageSize);
                this.formInline = {
                    name: '',
                    version: ''
                };
                this.keyword = '';
            }
        },
        created () {
            this.reset();
            // this.totalData = API.totalData;
            // this.tableData = this.totalData.slice(0, this.pageSize);
        },
        computed: {
            total() {
                return this.totalData.length;
            }
        }
    }
</script>
<style lang="less">
.mgt50 {
    margin-top: 50px;
}
.form-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    line-height: 32px;
    margin-bottom: 30px;
}
.w150 {
    width: 150px;
    .el-input, .el-input__inner {
        width: 150px;
    }
}

.demo-search-form-inline {
    margin-bottom: 0;
    .el-form-item {
        .el-form-item__content {
            width: auto;
        }
        &:last-child {
            .el-form-item__content {
                width: auto;
            }
        }

    }
    
}
.tooltip-img {
    margin-left: 10px;
    vertical-align: middle;
}
.demo-popover {
    width: 270px;
}
</style>
