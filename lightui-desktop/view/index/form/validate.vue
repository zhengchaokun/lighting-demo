
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <el-form class="demo-form demo-ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
                <el-form-item label="需求名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入3-15个字符"></el-input>
                </el-form-item>
                <el-form-item label="需求来源" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择需求来源" class="demo-form-select">
                        <el-option label="客户" value="1"></el-option>
                        <el-option label="产品经理" value="2"></el-option>
                        <el-option label="开发人员" value="3"></el-option>
                        <el-option label="bug" value="4"></el-option>                                                                        
                    </el-select>
                </el-form-item>
                <el-form-item label="截止时间" required prop="date1">
                    <el-date-picker type="datetime" placeholder="选择今天及以后的时间" v-model="ruleForm.date1" :pickerOptions="pickerOptions" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="是否需要评审" prop="needReview">
                    <el-switch on-text="" off-text="" v-model="ruleForm.needReview"></el-switch>
                </el-form-item>
                <el-form-item label="评审人" prop="syndic" v-show="ruleForm.needReview">
                    <el-select v-model="ruleForm.syndic" placeholder="请选择评审人" class="demo-form-select">
                        <el-option label="张三" value="1"></el-option>
                        <el-option label="李四" value="2"></el-option>
                        <el-option label="王五" value="3"></el-option>
                        <el-option label="赵六" value="4"></el-option>                                                                        
                    </el-select>
                </el-form-item>
                <el-form-item label="影响的项目" prop="type">
                    <el-checkbox-group v-model="ruleForm.type">
                        <el-row :gutter="40">
                            <el-col :span="6">
                                <el-checkbox label="项目1" name="type"></el-checkbox>
                            </el-col>
                            <el-col :span="6">
                                <el-checkbox label="项目2" name="type"></el-checkbox>     
                            </el-col>
                            <el-col :span="6">
                                <el-checkbox label="项目3" name="type"></el-checkbox>                               
                            </el-col>
                            <el-col :span="6">
                                <el-checkbox label="项目4" name="type"></el-checkbox>
                            </el-col>
                        </el-row>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="关联版本" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-radio label="测试"></el-radio>
                            </el-col>
                            <el-col :span="12">
                                <el-radio label="正式"></el-radio>
                            </el-col>
                        </el-row>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="需求描述" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入10-100个字符"></el-input>
                </el-form-item>
                <el-form-item class="form-right">
                    <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
                    <el-button type="plain" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import top from "../../../ui/top.vue";
export default {
  	components: {
		top
	},
  	data() {
		return {
			title: "校验表单",
			desc: "在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。",
			ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                needReview: false,
                syndic: '',
                type: [],
                resource: '',
                desc: ''
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            rules: {
                name: [
                    { required: true, message: '请输入需求名称', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择需求来源', trigger: 'visible-change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择截止时间', trigger: 'change,blur' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个影响的项目', trigger: 'change' }
                ],
                syndic: [
                    { required: true, message: '请选择评审人姓名', trigger: 'visible-change' }
                ],
                resource: [
                    { required: true, message: '请选择关联版本', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写需求描述', trigger: 'blur' },
                    { min: 10, max: 100, message: '长度在 10 到 100 个字符', trigger: 'blur' }                    
                ]
            }
		};
	},
	methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message({
                        message: '需求创建成功！',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: '请检查表单项是否填写完整和正确！',
                        type: 'error'
                    });
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
	}
};
</script>

<style lang="less">
.demo-form-select {
    width: 300px;
    .el-input, .el-input .el-input__inner {
        width: 300px;
    }
}
</style>
