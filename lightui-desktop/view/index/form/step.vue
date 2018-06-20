
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>
        <div class="demo">
            <el-steps :active="activeIndex" finish-status="success">
                <el-step title="基本信息"></el-step>
                <el-step title="学历信息"></el-step>
                <el-step title="工作经历"></el-step>
                <el-step title="期望工作"></el-step>
            </el-steps>

            <el-form v-if="activeIndex==0" class="demo-form mgt40" ref="ruleForm1" :model="form" :rules="rules" label-width="110px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请填写姓名" :minlength="2" :maxlength="15"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.gender">
                        <el-row>
                            <el-col :span="6">
                                <el-radio label="男" value="male"></el-radio>
                            </el-col>
                            <el-col :span="6">
                                <el-radio label="女" value="female"></el-radio>
                            </el-col>
                        </el-row>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthday">
                    <el-input v-model="form.birthday" placeholder="请选择出生日期"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="form.phone" :minlength="11" :maxlength="11" placeholder="请填写手机号码"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请填写邮箱"></el-input>
                </el-form-item>
                <el-form-item label="联系地址" prop="region">
                    <el-input v-model="form.region" placeholder="请填写正确地址以接收邮件"></el-input>
                </el-form-item>
                <el-form-item class="mgt40 form-right">
                    <el-button type="primary" @click="check(1)">下一步</el-button>                    
                </el-form-item>
            </el-form>

            <el-form v-if="activeIndex==1" class="mgt40 demo-form" ref="ruleForm2" :model="form" :rules="rules" label-width="110px">
                <el-form-item label="最高学历">
                    <el-radio-group v-model="form.diploma">
                        <el-row>
                            <el-col :span="6">
                                <el-radio label="本科" value="1"></el-radio>
                            </el-col>
                            <el-col :span="7">
                                <el-radio label="硕士" value="2"></el-radio>
                            </el-col>
                            <el-col :span="7">
                                <el-radio label="博士" value="3"></el-radio>
                            </el-col>
                        </el-row>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="专业" prop="major">
                    <el-input v-model="form.major" placeholder="请填写所学专业"></el-input>
                </el-form-item>
                <el-form-item label="毕业院校" prop="college">
                    <el-input v-model="form.college" placeholder="请填写毕业院校"></el-input>
                </el-form-item>
                <el-form-item label="毕业时间" prop="graduate_date">
                    <el-date-picker type="date" placeholder="请选择毕业时间" v-model="form.graduate_date" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item class="mgt40 form-right">
                    <el-button type="plain" @click="back">上一步</el-button>                                        
                    <el-button type="primary" @click="check(2)">下一步</el-button>                    
                </el-form-item>
            </el-form>
            
            <el-form v-if="activeIndex==2" class="mgt40 demo-form" ref="ruleForm3" :model="form" :rules="rules" label-width="110px">
                <el-form-item label="公司名称" prop="formal_company">
                    <el-input v-model="form.formal_company" placeholder="请填写公司名称"></el-input>
                </el-form-item>
                <el-form-item label="岗位" prop="formal_job">
                    <el-input v-model="form.formal_job" placeholder="请填写岗位"></el-input>
                </el-form-item>
                <el-form-item label="工作年限" prop="formal_duration">
                    <el-input v-model="form.formal_duration" type="number" placeholder="请填写工作年限"></el-input>
                </el-form-item>
                <el-form-item label="离职原因" prop="quit_reason">
                    <el-input type="textarea" v-model="form.quit_reason" placeholder="请填写离职原因"></el-input>
                </el-form-item>
                <el-form-item class="mgt40 form-right">
                    <el-button type="plain" @click="back">上一步</el-button>                                        
                    <el-button type="primary" @click="check(3)">下一步</el-button>                    
                </el-form-item>
            </el-form>
            
            <el-form v-if="activeIndex==3||activeIndex==4" class="mgt40 demo-form" ref="ruleForm4" :model="form" :rules="rules" label-width="110px">
                <el-form-item label="岗位" prop="wanted_job">
                    <el-input v-model="form.wanted_job" placeholder="请填写要应聘的岗位"></el-input>
                </el-form-item>
                <el-form-item label="期望薪酬" prop="wanted_salary">
                    <el-input v-model="form.wanted_salary" placeholder="请填写期望的月薪或年薪"></el-input>
                </el-form-item>
                <el-form-item label="工作城市" prop="city">
                    <el-select v-model="form.city" class="w300">
                        <el-option label="杭州（总部）" value="hangzhou"></el-option>                                    
                        <el-option label="上海" value="shanghai"></el-option>
                        <el-option label="北京" value="beijing"></el-option>
                        <el-option label="深圳" value="shenzhen"></el-option>					                                    					
                    </el-select>
                </el-form-item>
                <el-form-item label="接受城市调动">
                    <el-switch on-text="是" off-text="否" v-model="form.accept_city_change"></el-switch>
                </el-form-item>
                <el-form-item label="其他期望">
                    <el-input type="textarea" v-model="form.needs" placeholder="其他要求或问题"></el-input>
                </el-form-item>
                <el-form-item class="mgt40 form-right">
                    <el-button type="plain" @click="back" v-if="activeIndex>0">上一步</el-button>                                        
                    <el-button type="primary" @click="check(4)" :loading="loading">申请职位</el-button>
                </el-form-item>
            </el-form>
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
                title: '分步表单',
                desc: '将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。',
                activeIndex: 0,
                form: {
                    name: '',
                    gender: '男',
                    birthday: '',
                    phone: '',
                    email: '',
                    region: '',
                    diploma: '本科',
                    major: '',
                    graduate_date: '',
                    college: '',
                    formal_company: '',
                    formal_job: '',
                    formal_duration: '',
                    quit_reason: '',
                    wanted_job: '',
                    wanted_salary: '',
                    accept_city_change: false,
                    needs: '',
                    city: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                    ],
                    birthday: [
                        { required: true, message: '请填写出生日期', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请填写手机号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' }                        
                    ],
                    email: [
                        { required: true, message: '请填写邮箱', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请填写现居住地址', trigger: 'blur' }
                    ],
                    major: [
                        { required: true, message: '请填写所学专业', trigger: 'blur' }
                    ],
                    college: [
                        { required: true, message: '请填写毕业院校', trigger: 'blur' }
                    ],
                    graduate_date: [
                        { type: 'date', required: true, message: '请选择毕业时间', trigger: 'change,blur' }
                    ],
                    formal_company: [
                        { required: true, message: '请填写公司名称', trigger: 'blur' }
                    ],
                    formal_job: [
                        { required: true, message: '请填写岗位', trigger: 'blur' }
                    ],
                    formal_duration: [
                        { required: true, message: '请填写工作年限', trigger: 'blur' }
                    ],
                    quit_reason: [
                        { required: true, message: '请填写离职原因', trigger: 'blur' }
                    ],
                    wanted_job: [
                        { required: true, message: '请填写应聘岗位', trigger: 'blur' }
                    ],
                    wanted_salary: [
                        { required: true, message: '请填写期望薪酬', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请填写期望城市', trigger: 'blur' }
                    ]
                },
                loading: false,
                pickerOptions: {
                    disabledDate(time) {
                        return;
                    }
                },
                showItem: true,
                showItem2: false,
                showItem3: false,
                showItem4: false
            }
        },
        methods: {
            back() {
                if (this.activeIndex-- < 0) this.activeIndex = 0;
            },
            next() {
                if (this.activeIndex++ > 3) this.activeIndex = 3;
            },
            check(index) {
                var that = this;
                this.$refs[`ruleForm${index}`].validate((valid) => {
                    if (valid) {
                        if(that.activeIndex==3) {
                            API.success(that, '申请成功，请等待通知！');
                        }
                        that.next();                       
                    } else {
                        if(that.activeIndex==3) {
                            API.error(that, '申请失败，请检查表单项是否完整、正确填写！');
                        } else {
                            API.error(that, '请检查表单项是否完整、正确填写！');                            
                        }
                        return false;
                    }
                });
            },
            onSubmit() {
                // var that = this;
                // this.$refs['ruleForm4'].validate((valid) => {
                //     if (valid) {
                //         that.activeIndex = 3;
                //         API.success(that, '申请成功，请等待通知！');
                //     } else {
                //         API.error(that, '申请失败，请检查表单项是否完整、正确填写');
                //         return false;
                //     }
                // });
                
            }
        }
    }
</script>
<style lang="less" scoped>
.el-steps.is-horizontal {
    width: 590px;
}
.el-form {
    // width: 410px;
}
.el-radio-group {
    width: 100%;
}
.demo-caret {
    line-height: 32px;
    font-size: 12px;
    color: #d3dce6;
    cursor: pointer;
}
.form-item-top {
    display: flex;
    padding: 0px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #D2D9E3;
    margin-bottom: 10px;
    border-radius: 2px;
    background: #f9f9f9;
    cursor: pointer;    

    &:hover {
        border-color: #B5C1D4;
    }

    &.active {
        border-color: rgba(10,169,241,0.20);
        background: rgba(10,169,241,0.10);
    }
}
</style>
