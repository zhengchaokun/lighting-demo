
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
                    <img class="tooltip-img" src="../../../images/add.svg" v-popover:popover>
                    <el-popover
                        ref="popover"
                        placement="bottom-start"
                        title="标题"
                        width="200"
                        trigger="hover"
                        content="从元素起始位置开始的提示框">
                    </el-popover>
                </div>
                
                <el-form :inline="true" :model="formInline" class="demo-search-form-inline">
                    <template v-if="!isMerged">
                        <el-form-item label="App名称" label-width="70px">
                            <el-input v-model="formInline.name" class="w150"></el-input>
                        </el-form-item>
                        <el-form-item label="版本号" label-width="70px">
                            <el-input v-model="formInline.version" class="w150"></el-input>  
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
                </el-form>
            </div>
            

            <el-table
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
                :page-sizes="[2, 4, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
       </div>
    </div>
</template>
<script>
    import top from "../../../ui/top.vue";
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
                totalData: [{
                    date: '2017-05-02 09:23:23',
                    version: 'v1.0.0',
                    name: 'lighting-ui',
                    weight: '10%'
                }, {
                    date: '2017-05-24 16:55:11',
                    version: 'v1.1.0',
                    name: 'lighting-ui',
                    weight: '20%'
                }, {
                    date: '2017-06-02 14:23:11',
                    version: 'v1.2.0',
                    name: 'lighting-ui',
                    weight: '30%'
                }, {
                    date: '2017-07-26 18:03:10',
                    version: 'v1.2.1',
                    name: 'lighting-ui',
                    weight: '40%'
                }, {
                    date: '2017-11-20 14:23:11',
                    version: 'v1.5.0',
                    name: 'ligui',
                    weight: '50%'
                }, {
                    date: '2018-01-28 18:03:10',
                    version: 'v1.5.4',
                    name: 'ligui',
                    weight: '50%'
                }, {
                    date: '2017-06-02 14:23:11',
                    version: 'v1.2.0',
                    name: 'lighting-plugin-jsnative',
                    weight: '30%'
                }, {
                    date: '2017-07-26 18:03:10',
                    version: 'v1.2.1',
                    name: 'lighting-tool',
                    weight: '100%'
                }, {
                    date: '2017-06-02 14:23:11',
                    version: 'v1.2.0',
                    name: 'lighting-plugin-native',
                    weight: '50%'
                }, {
                    date: '2018-05-26 18:03:10',
                    version: 'v1.0.76',
                    name: 'lighting-plugin-type-vue',
                    weight: '100%'
                }
                ]
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
                var index = null;
                this.tableData = [];
                for (var key in obj) {
                    if(key=='keyword') {
                        that.totalData.forEach(function(item, idx) {
                            if(item.name.indexOf(obj[key]) > -1 || item.version.indexOf(obj[key]) > -1) {
                                index = idx;
                                that.tableData.push(item);
                            }
                        })
                    } else {
                        that.totalData.forEach(function(item, idx) {
                            if(item[key].indexOf(obj[key]) > -1) {
                                index = idx;
                                that.tableData.push(item);
                            }
                        })
                    }
                }
                if(index!=null) {
                    that.totalData = that.tableData;
                }
                
                console.log(that.tableData.length);

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
            }
        },
        created () {
            this.tableData = this.totalData.slice(0, this.pageSize);
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

</style>
