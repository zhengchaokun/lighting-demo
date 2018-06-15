
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>
        <div class="demo">
            
            <el-table
                class="mgt20"
                :data="tableData"
                stripe
                @filter-change="handleFilterChange"
                style="width: 80%">
                <el-table-column
                    type="selection"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="App名称"
                    min-width="140">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="version"
                    label="版本号"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="发布日期"
                    min-width="160">
                </el-table-column>
                <el-table-column
                    prop="weight"
                    label="权重"
                    min-width="70">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                    min-width="70"
                    no-highlight="全部"
                    :filter-order="0"
                    :filter-multiple="false"
                    :filters="[{text: '全部', value: '全部'},{ text: '测试', value: '0' }, { text: '正式', value: '1' }]"
                    :filter-reset="true"
                    :filter-method="filterTag">
                    <template scope="scope">
                        <span :class="[{'text-error' : scope.row.type=='0'},{'text-success': scope.row.type=='1'}]">{{ scope.row.type=='0' ? '测试' : '正式' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="60">
                    <template scope="scope">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                <i class="el-icon-more"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <div @click="handlePreview(scope)">预览</div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div @click="handleOperate(scope)">{{scope.row.type=='0'?'上线':'下线'}}</div>
                                </el-dropdown-item>
                                <el-dropdown-item @click="handleDelete(scope)">
                                    <div @click="handleDelete(scope)">删除</div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
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

            <!-- 上线下线操作 -->
            <el-dialog
                type="warning"
                :visible.sync="warn_show">
                <p>您确定要{{warn_text}}该版本吗？</p>
                <br>
                <p class="muted">{{warn_text}}后，操作不可撤回。</p>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="warn_show = false" type="plain">取 消</el-button>
                    <el-button @click="handleConfirm()">{{ new_warn_text }}</el-button>
                </div>
            </el-dialog>

            <!-- 删除 -->
            <el-dialog
                type="warning"
                :visible.sync="dialog_delete">
                <p>您确定要删除该应用版本吗？</p>
                <br>
                <p class="muted">删除后，操作不可撤回。</p>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialog_delete = false" type="plain">取 消</el-button>
                    <el-button @click="handleDeleteConfirm()">删除</el-button>
                </div>
            </el-dialog>

            <!--详情-->
            <el-dialog :visible.sync="dialog_preview" class="text-left" title="查看详情">
                <el-form label-width="90px">
                    <el-form-item label="App名称">
                        {{form_preview.name}}
                    </el-form-item>
                    <el-form-item label="版本">
                        {{form_preview.version}}
                    </el-form-item>
                    <el-form-item label="开发者">
                        {{form_preview.developer}}
                    </el-form-item>
                    <el-form-item label="发布时间">
                        {{form_preview.date}}
                    </el-form-item>
                    <el-form-item label="预览地址">
                        <a class="normal-link" :href="form_preview.address" target="_blank">{{form_preview.address ||'--'}}</a>
                    </el-form-item>
                    <el-form-item label="类型">
                        {{form_preview.type=='0'?'测试版本':'正式版本'}}
                    </el-form-item>
                    <el-form-item label="权重">
                        {{form_preview.weight}}
                    </el-form-item>
                    <el-form-item label="访问量">
                        {{form_preview.amount_preview ||'--'}}
                    </el-form-item>
                    <el-form-item label="下载量">
                        {{form_preview.amount_download ||'--'}}
                    </el-form-item>
                </el-form>
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
                title: '可操作表格',
                desc: '可对数据进行排序、筛选、对比或其他自定义操作。',
                warn_text: '',
                warn_show: false,
                set_weight: false,
                $index: 0,
                currentPage: 1,
                pageSize: 5,
                tableData: [],
                totalData: [],
                myTotalData: API.totalData,
                filter: '',
                form_preview: {},
                dialog_preview: false,
                dialog_delete: false
            }
        },
        computed: {
            new_warn_text() {
                return this.warn_text.substring(0,1)+' '+this.warn_text.substring(1);
            },
            total() {
                return this.totalData.length;
            }  
        },
        methods: {
            handleSizeChange(val) {
                var that = this;
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.tableData = this.totalData.slice(val*(this.currentPage-1), this.currentPage*val);
                this.tableData.forEach(function(row) {
                    that.filterTag(that.filter, row);
                })
            },
            handleCurrentChange(val) {
                var that = this;
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.tableData = this.totalData.slice(this.pageSize*(val-1), this.pageSize*val);
                this.tableData.forEach(function(row) {
                    that.filterTag(that.filter, row);
                })
            },
            filterTag(value, row) {
                if(value=='全部') {
                    return true;
                } else {
                    return row.type === value;
                }
            },
            handleFilterChange(obj) {
                var that = this;
                for(var key in obj) {
                    that.filter = obj[key][0];
                }
                if(that.filter=='全部'){
                    that.totalData = that.myTotalData;
                } else {
                    that.tableData = [];
                    that.totalData = [];
                    var newTotalData = that.myTotalData;
                    newTotalData.forEach(function(row) {  
                        if(row.type == that.filter) {
                            that.totalData.push(row);
                        }                 
                    })
                }
                this.tableData = this.totalData.slice(0, this.pageSize);
                
            },
            handleOperate(scope) {
                this.warn_text = scope.row.type == '0' ? '上线' : '下线';
                this.warn_show = true;
                this.$index = scope.$index;
            },
            handlePreview(scope) {
                this.form_preview = scope.row;
                this.dialog_preview = true;
            },
            handleDelete(scope) {
                this.form_delete = scope.row;
                this.dialog_delete = true;
            },
            handleDeleteConfirm() {
                var that = this;
                this.myTotalData.forEach(function(item, index) {
                    if(item.id == that.form_delete.id) {
                        that.myTotalData.splice(index, 1);
                        return;
                    }
                })
                this.totalData = this.myTotalData;
                that.dialog_delete = false;
            },
            handleConfirm(row) {
                this.warn_show = false;
                let old_type = this.tableData[this.$index].type;
                this.tableData[this.$index].type = old_type == '0' ? '1' : '0';
                this.$message({
                    message: `${this.warn_text}成功！`,
                    type: 'success'
                });
            },
            setWeight() {

            }
        },
        created () {
            this.totalData = API.totalData;
            this.tableData = this.totalData.slice(0, this.pageSize);
        }
    }
</script>
<style lang="less" scoped>
.el-dropdown {
    cursor: pointer;
}
.el-dropdown-menu {
    width: auto;
    height: auto;
}

</style>
