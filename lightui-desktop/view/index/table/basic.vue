
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
                title: '基础表格',
                desc: '用于展示多条结构类似的数据，多与分页组件组合使用。',
                currentPage: 1,
                pageSize: 5,
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
</style>
