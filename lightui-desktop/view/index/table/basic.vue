
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>
        <div class="demo">
            <div class="w80">
                <el-button type="primary" @click="set_weight=true">设置权重</el-button>
            </div>
            <el-table
                class="mgt20"
                :data="tableData"
                stripe
                style="width: 80%">
                <el-table-column
                    prop="name"
                    label="App名称"
                    min-width="130">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="version"
                    label="版本号"
                    min-width="60">
                </el-table-column>
                <el-table-column
                    prop="developer"
                    label="开发者"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="date"
                    label="发布日期"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="weight"
                    label="权重"
                    min-width="50">
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

            <el-dialog title="权重设置" :visible.sync="set_weight" class="dialog-weights">
                <el-ratio-controller :ratios="weights" v-model="value_weights" :step="10"></el-ratio-controller>
                <div class="updateBox" style="padding:10px; margin-top:50px;width: 390px;text-align:left;height:17px;line-height:17px;">
                    <font style="text-align:left;color: #E99E24;font-size:12px;line-height:17px;letter-spacing: 0px;">权重，即该版本发布的有效用户与总用户的比例。</font>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button v-on:click="setWeight" style="width:200px">确 定</el-button>
                </div>
            </el-dialog>
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
                title: '基础表格',
                desc: '用于展示多条结构类似的数据，多与分页组件组合使用。',
                currentPage: 1,
                pageSize: 5,
                tableData: [],
                totalData: API.totalData,
                set_weight: false, 
                weights: [{
                    percent: 10,
                    desc: '默认版本'
                }, {
                    percent: 20
                }, {
                    percent: 30
                }, {
                    percent: 10,
                }, {
                    percent: 30,
                }],
                value_weights: []
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
            setWeight() {
                this.set_weight = false;
                API.success(this, "权重设置成功！");
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
