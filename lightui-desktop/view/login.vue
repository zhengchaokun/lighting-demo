
<template>
    <div>
       <div class="head">
           <a href="http://ui.lightyy.com/#/index" target="_blank"><img src="../images/logo-big.svg"></a>
           <div class="head-right">
               <span class="head-link" @click="jump('index')">官网首页</span>
               <span>|</span>
               <span class="head-link">帮助中心</span>
               <span>|</span>
               <span class="head-link">社区</span>
               <span>|</span>
               <el-button type="plain">注册</el-button>
           </div>
       </div>
       <div class="main-wrap">
           <div class="login-box">
               <h2 class="login-box-title">登录</h2>
               <el-form v-model="login" ref="form" :rules="rules" label-width="0px">
                   <el-form-item prop="username">
                       <el-input v-model="login.username" placeholder="注册邮箱、手机号"></el-input>
                   </el-form-item>
                   <el-form-item prop="password">
                       <el-input v-model="login.password" :minlength="6" :maxlength="15" placeholder="登录密码">
                           <template slot="append" class="demo-append">
                               <div class="pswd">忘记密码？</div>
                            </template>
                       </el-input>
                   </el-form-item>
                   <el-form-item prop="verification">
                       <el-input v-model="login.valid_code" placeholder="验证码">
                           <template slot="append">
                               <div class="validate-code">验证码</div>
                            </template>
                       </el-input>
                   </el-form-item>
                   <el-form-item>
                       <el-button @click="submit">立即登录</el-button>
                   </el-form-item>
               </el-form>
           </div>
           <div class="footer">
               <p>Copyright © 2016 Hundsun Technologies Inc.</p>
                <p>All Rights Reserved</p>
                <p>浙ICP备09092082号-15</p>
           </div>
       </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                login: {
                    username: '',
                    password: '',
                    valid_code: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    verification: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            jump(page) {
                if(page=='index') {
                    this.$light.navigate('#/dashboard/index');
                }
            },
            submit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        API.success('登录成功！');
                    } else {
                        API.error('登录失败，请检查用户名或密码是否正确！');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style lang="less">
* {
    box-sizing: border-box;
}
.head {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-width: 650px;
    height: 65px;
    padding: 7px 60px 7px 50px;
    border-bottom: 1px solid #E3E8F0;
    font-size: 16px;
    color: #606060;
    line-height: 65px;
    a {
        height: 100%;
        img {
            height: 50px;
        }
    }
    .head-right {
        & > span {
            float: left;
            margin-right: 20px;
        }
    }
    .head-link {
        cursor: pointer;
        &:hover {
            color: #0AA9F1;
        }
    }
}
.main-wrap {
    background: #FDFDFD;
}
.login-box {
    width: 500px;
    height: 480px;
    margin: 120px auto 212px;
    background: #FFFFFF;
    border: 1px solid #D2D9E3;
    box-shadow: 0 2px 4px 0 #B5C1D4;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 100px 100px;
    h2 {
        font-size: 16px;
        color: #303030;
        letter-spacing: 0.24px;
        // font-weight: 400;
        margin-bottom: 60px;
    }
    .el-form {
        .el-form-item {
            margin-bottom: 20px;
            .el-form-item__content {
                margin-left: 0px !important;
            }
        }
        .el-input, .el-input__inner {
            height: 40px;
        }
        .el-button {
            width: 300px;
            height: 40px;
            margin-top: 40px;
        }
        .el-input-group__append {
            padding: 0;
            line-height: 38px;
            
            
            .pswd {
                border: 1px solid #D2D9E3;
                border-left: 0px;
                padding: 0 14px;
                font-size: 12px;
                color: #606060;
                letter-spacing: 0;
                cursor: pointer;

                &:hover {
                    color: #0AA9F1;
                }
                &:active {
                    color: #0997D8;
                    text-decoration: underline;
                }
            }
        }
        .validate-code {
            width: 85px;
            margin-left: 25px;
        }
    }
}
.footer {
    margin-bottom: 40px;
    font-size: 14px;
    color: #B4C1D4;
    letter-spacing: 0.21px;
    text-align: center;
}
</style>
