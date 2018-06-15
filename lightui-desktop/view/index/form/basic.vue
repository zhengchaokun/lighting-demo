
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>
        <div class="demo">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="form.name">输入标题</el-input>
                </el-form-item>
                <el-form-item label="时间选择器">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" :pickerOptions="pickerOptions" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="keb-line" :span="2">—</el-col>
                    <el-col :span="11">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.time1" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="单选框">
                    <el-radio-group v-model="form.resource">
                        <el-row>
                            <el-col :span="12">
                                <el-radio label="单选选项一"></el-radio>
                            </el-col>
                            <el-col :span="12">
                                <el-radio label="单选选项二"></el-radio>
                            </el-col>
                        </el-row>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item label="复选框">
                    <el-checkbox-group v-model="form.type">
                        <el-row>
                            <el-col :span="12">
                                <el-checkbox label="复选选项一" name="type"></el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox label="复选选项二" name="type"></el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox label="复选选项三" name="type"></el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox label="复选选项四" name="type"></el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox label="复选选项五" name="type"></el-checkbox>
                            </el-col>
                        </el-row>
                    
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="开关">
                    <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="文本框">
                    <el-input type="textarea" v-model="form.desc" placeholder="输入文本"></el-input>
                </el-form-item>
                <el-form-item>
                    同意<a></a><el-button type="text" style="margin-right: 20px;">《开发者协议》</el-button><el-checkbox></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" @click="onSubmit">提交</el-button>
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
        data(){
            return {
                title: '基础表单',
                desc: '包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                loading: false,
                pickerOptions: {
                    disabledDate(time) {
                        return;
                    }
                }
            }
        },
        methods: {
            onSubmit() {
                var that = this;
                that.loading = true;
                setTimeout(() => {
                    that.loading = false;
                    this.$message({
                        message: '提交成功！',
                        type: 'success'
                    });
                }, 1000);
                
            }
        }
    }
</script>
<style lang="less" scoped>
.el-radio-group {
    width: 100%;
}
</style>
