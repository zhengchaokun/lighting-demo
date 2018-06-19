
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>
        <div class="demo">
            <el-table
                :data="tableData"
                stripe
                style="width: 80%">
                <el-table-column
                    prop="name"
                    label="App名称"
                    min-width="130">
                </el-table-column>
                <el-table-column
                    prop="version"
                    label="版本号"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="developer"
                    label="开发者"
                    min-width="80">
                </el-table-column>
               
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="发布日期">
                                <span>{{ props.row.date }}</span>
                            </el-form-item>
                            <el-form-item label="预览地址">
                                <a :href="props.row.address" :title="props.row.address" target="_blank" class="normal-link">{{ props.row.address }}</a>
                            </el-form-item>
                            <el-form-item label="类型">
                                <span :class="[props.row.type=='0'?'text-error':'text-success']">{{ props.row.type=='0'?'测试':'正式' }}</span>
                            </el-form-item>
                            <el-form-item label="访问量">
                                <span>{{ props.row.amount_preview }}</span>
                            </el-form-item>
                            <el-form-item label="权重">
                                <span>{{ props.row.weight }}</span>
                            </el-form-item>
                            <el-form-item label="下载量">
                                <span>{{ props.row.amount_download }}</span>
                            </el-form-item>
                            
                        </el-form>
                    </template>
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
    const API = require("../../../lib/api");
    export default {
        components: {
            top
        },
        data(){
            return {
                title: '折叠表格',
                desc: '当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。',
                currentPage: 1,
                pageSize: 5,
                tableData: [],
                totalData: API.totalData
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
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 48%;

    .el-form-item__content {
        width: auto;
        max-width: 249px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
}
</style>
