
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <el-table
                @selection-change="handleSelect"
                :data="tableData"
                stripe
                style="width: 80%">
                <el-table-column
                    type="selection"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="App名称"
                    min-width="80">
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
                    min-width="60">
                </el-table-column>
                <el-table-column
                    label="操作"
                    min-width="100">
                    <template scope="scope">
                        <el-button type="text" @click="operate('stop')">停用</el-button>
                        <el-button type="text" @click="operate('reset')">重置</el-button>  
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                type="warning"
                :visible.sync="dialogVisible">
                <p>{{ dialog_title }}</p>
                <br>
                <p class="muted">{{ dialog_content }}</p>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel" type="plain">取 消</el-button>
                    <el-button @click="confirm">确 定</el-button>
                </div>
            </el-dialog>
            <div style="width:80%;margin-top:20px;">
                <el-button type="text" @click="deleteSome">批量删除</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import top from "../../../ui/top.vue";
import messageVue from './message.vue';
export default {
  	components: {
		top
	},
  	data() {
		return {
			title: "消息弹框",
            desc: "常用于主动操作前的提示。",
            dialog_title: '',
            dialog_content: '',
            dialogVisible: false,
            operate_word: '',
            selection: 0,
            tableData: [
                {
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
                }
            ]
		};
	},
	methods: {
        open() {
            this.$alert('您的应用还未添加反馈组件，请先前往【应用配置】中添加反馈组件，并获取授权。', {
                confirmButtonText: '我知道了',
                callback: action => {
                    console.log(`action: ${ action }`);
                }
            });
            
        },
        operate(operation) {
            if(operation=='stop') {
                this.dialog_title = '您确定要停用该容器节点吗？';
                this.dialog_content = '停用后，该容器节点将不再接收新实例服务';
                this.operate_word = '停用';
            } else {
                this.dialog_title = '您确定要重置该容器节点吗？';
                this.dialog_content = '重置后，该容器内的所有实例将被强制更新';
                this.operate_word = '重置';                
            }
            this.dialogVisible = true;
        },
        cancel() {
            this.dialogVisible = false;        
        },
        confirm() {
            this.$message({
                message: `已${this.operate_word}该容器！`,
                type: 'success'
            });   
            this.dialogVisible = false;                            
        },
        deleteSome() {
            if(this.selection==0) {
                this.$alert('请至少选择一个条目，删除后不可恢复。', {
                    confirmButtonText: '我知道了',
                    callback: action => {
                        console.log(`action: ${ action }`);
                    }
                });
            }
            
        },
        handleSelect(selection) {
            console.log(selection);
            this.selection = selection.length;
        }
	}
};
</script>

<style lang="less" scoped>

</style>
