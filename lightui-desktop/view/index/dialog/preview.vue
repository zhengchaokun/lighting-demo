
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="App名称"
                    min-width="140">
                </el-table-column>
                <el-table-column
                    prop="version"
                    label="版本号"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="发布日期"
                    min-width="130">
                </el-table-column>
                <el-table-column
                    prop="weight"
                    label="权重"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="80">
                    <template slot-scope="scope">
                        <el-button type="text" @click="preview(scope.row)">查看详情</el-button>
                    </template>
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
           
            <!--查看详情-->
            <el-dialog title="App详情" :visible.sync="dialog_preview" class="dialog-feeddetail">
                <el-form label-width="90px">
                    <el-form-item label="App名称">
                        {{ preview_form.name }}
                    </el-form-item>
                    <el-form-item label="版本">
                        {{ preview_form.version }}
                    </el-form-item>
                    <el-form-item label="发布日期">
                        {{ preview_form.date }}
                    </el-form-item>
                    <el-form-item label="预览地址">
                        <a class="normal-link" :href="preview_form.address" target="_blank">{{ preview_form.address }}</a>
                    </el-form-item>
                    <el-form-item label="类型">
                        <span :class="[preview_form.type=='0'?'text-error':'text-success']">{{ preview_form.type=='0'?'测试':'正式' }}</span>
                    </el-form-item>
                    <el-form-item label="开发者">
                        {{ preview_form.developer }}
                    </el-form-item>
                    <el-form-item label="访问量(次)">
                        {{ preview_form.amount_preview }}
                    </el-form-item>
                    <el-form-item label="下载量(次)">
                        {{ preview_form.amount_download }}
                    </el-form-item>
                    <el-form-item label="权重">
                        {{ preview_form.weight }}
                    </el-form-item>
                </el-form>
            </el-dialog>
            
        </div>
    </div>
</template>
<script>
import top from "../../../ui/top.vue";
import messageVue from './message.vue';
const API = require('../../../lib/api');
export default {
  	components: {
		top
	},
  	data() {
		return {
			title: "查看弹框",
            desc: "常用于查看表格条目的详情。",
            currentPage: 1,
            pageSize: 5,
            tableData: [],
            totalData: API.totalData,
            dialog_preview: false,
            preview_form: {}
		};
    },
    computed: {
        total() {
            return this.totalData.length;
        }
    },
    created () {
        this.tableData = this.totalData.slice(0, this.pageSize);
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
        preview(row) {
            console.log(row);
            this.preview_form = row;
            this.dialog_preview = true;
        }
	}
};
</script>

<style lang="less" scoped>

</style>
