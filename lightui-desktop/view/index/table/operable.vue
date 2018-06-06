
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
                    min-width="120">
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
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                    width="100"
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
                        <el-button type="text" @click="handleOperate(scope)">{{scope.row.type=='0'?'上线':'下线'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
                title: '可操作表格',
                desc: '可对数据进行排序、筛选、对比或其他自定义操作。',
                warn_text: '',
                warn_show: false,
                $index: 0,
                tableData: [{
                    date: '2017-05-02 09:23:23',
                    version: 'v1.0.0',
                    name: 'lighting-ui',
                    weight: '10%',
                    type: '0'
                }, {
                    date: '2017-05-24 16:55:11',
                    version: 'v1.1.0',
                    name: 'lighting-ui',
                    weight: '20%',
                    type: '0'
                }, {
                    date: '2017-06-02 14:23:11',
                    version: 'v1.2.0',
                    name: 'lighting-ui',
                    weight: '30%',
                    type: '1'
                }, {
                    date: '2017-07-26 18:03:10',
                    version: 'v1.2.1',
                    name: 'lighting-ui',
                    weight: '40%',
                    type: '1'
                }]
            }
        },
        computed: {
            new_warn_text() {
                return this.warn_text.substring(0,1)+' '+this.warn_text.substring(1);
            }  
        },
        methods: {
            filterTag(value, row) {
                if(value=='全部') {
                    return true;
                } else {
                    return row.type === value;
                }
            },
            handleOperate(scope) {
                this.warn_text = scope.row.type == '0' ? '上线' : '下线';
                this.warn_show = true;
                this.$index = scope.$index;
            },
            handleConfirm(row) {
                this.warn_show = false;
                let old_type = this.tableData[this.$index].type;
                this.tableData[this.$index].type = old_type == '0' ? '1' : '0';
                this.$message({
                    message: `${this.warn_text}成功！`,
                    type: 'success'
                });
            }
        }
    }
</script>
<style lang="less" scoped>

</style>
