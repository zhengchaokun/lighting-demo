
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <el-button type="success" @click="open2">成功</el-button>
            <el-button type="warning" @click="open3">警告</el-button>
            <el-button type="primary" @click="open">消息</el-button>
            <el-button type="danger" @click="open4">错误</el-button>
        </div>
        <el-dialog title="证书设置" :visible.sync="create_dialog" class="dialog-createcert dialog-intergrate">
                <el-form label-width="80px">
                    <el-form-item label="平台">
                        <el-select v-model="edit_cert.cert_platform" placeholder="请选择" v-bind:disabled="edit_cert.id && edit_cert.id >0">
                            <el-option v-for="item in platforms" :key="item.value" :label="item.key" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="edit_cert.cert_type" placeholder="请选择">
                            <el-option v-for="item in types" :key="item.key" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证书名称">
                        <el-input v-model="edit_cert.cert_desc" placeholder="请输入" :maxlength='30'></el-input>
                    </el-form-item>
                    <el-form-item label="证书别名" v-show="edit_cert.cert_platform=='android'">
                        <el-input v-model="edit_cert.cert_alias" placeholder="请输入" :maxlength='64'></el-input>
                    </el-form-item>
                    <el-form-item label="证书密码">
                        <el-input v-model="edit_cert.cert_pwd" placeholder="请输入" type="password" :maxlength='64' :minlength='6'></el-input>
                    </el-form-item>
                    <el-form-item label="证书库密码" placeholder="请输入" v-show="edit_cert.cert_platform=='android'">
                        <el-input v-model="edit_cert.cert_lib_pwd" placeholder="请输入" type="password" :maxlength='64' :minlength='6'></el-input>
                    </el-form-item>
                    <el-form-item label="一键创建" v-show="edit_cert.cert_platform=='android'">
                        <el-switch v-model="is_quickcreate" on-text="是" off-text="否"></el-switch>
                    </el-form-item>
                    <template v-if="edit_cert.cert_platform=='android'&&edit_cert.auto_create==1">
                        <el-form-item label="证书有效期(年)" class="cert_form_item">
                            <el-input v-model="edit_cert.validtime" placeholder="请输入" :maxlength="3"></el-input>
                        </el-form-item>
                        <el-form-item label="所有者名字">
                            <el-input v-model="edit_cert.owner" placeholder="请输入" :maxlength="30"></el-input>
                        </el-form-item>
                        <el-form-item label="组织名字">
                            <el-input v-model="edit_cert.group_name" placeholder="请输入" :maxlength="30"></el-input>
                        </el-form-item>
                        <el-form-item label="所在城市">
                            <el-input v-model="edit_cert.city" placeholder="请输入" :maxlength='64'></el-input>
                        </el-form-item>
                        <el-form-item label="所在省份">
                            <el-input v-model="edit_cert.province" placeholder="请输入" :maxlength='64'></el-input>
                        </el-form-item>
                        <el-form-item label="所在国家">
                            <el-input v-model="edit_cert.country" placeholder="请输入" :maxlength='64'></el-input>
                        </el-form-item>
                    </template>
                    <!-- <el-form-item v-show="edit_cert.cert_platform=='ios'||(edit_cert.cert_platform=='android'&&edit_cert.auto_create!=1)" label="证书上传" style="position: relative;">
                        <template>
                            <p>
                                <el-tag type="blue" style="display: inline-block;" class="text-short">
                                    <span class="text-hide" v-if="edit_cert.cert_file_id && edit_cert.cert_file_id.length>0" :title="edit_cert.cert_file_name">{{edit_cert.cert_file_name}}</span>
                                    <span class="text-hide" v-else :title="edit_cert.cert_platform=='android'?'distribution.keystore':'distribution.mobileprovision'">{{edit_cert.cert_platform=='android'?'distribution.keystore':'distribution.mobileprovision'}}</span>
                                    <img src="images/delete.svg" @click="deleteCertFile()" v-show="edit_cert.cert_file_id && edit_cert.cert_file_id.length>0">
                                </el-tag>
                            </p>
                            <p v-show="edit_cert.cert_platform=='ios'">
                                <el-tag type="blue" style="display: inline-block;" class="text-short">
                                    <span class="text-hide" v-if="!edit_cert.cert_p12file_id || edit_cert.cert_p12file_name.length == 0" title="distribution.p12">distribution.p12</span>
                                    <span class="text-hide" v-else :title="edit_cert.cert_p12file_name">{{edit_cert.cert_p12file_name}}</span>
                                    <img src="images/delete.svg" @click="deleteCertp12File()" v-show="edit_cert.cert_p12file_id && edit_cert.cert_p12file_id.length>0">
                                </el-tag>
                            </p>
                        </template> -->
                        <!-- <el-upload class="upload-cert" action="" :on-preview="handlePreview" :on-remove="handleRemove" :show-file-list="false" :http-request="uploadfile">
                            <el-button type="primary" class="upload-button">上 传</el-button>
                        </el-upload> -->
                        <!--<el-button @click="uploadCert" type="card" >上传</el-button>-->
                    <!-- </el-form-item> -->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="create_dialog=false" type="plain">取 消</el-button>
                    <el-button @click="submitCert()" type="primary">确 定</el-button>
                </div>
            </el-dialog>
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
			title: "消息提示",
			desc: "常用于主动操作后的反馈提示，有四种状态。",
            create_dialog: true,
            edit_cert: {
                cert_platform: 'ios',
                cert_type: 'release',
                cert_pwd: '',
                cert_lib_pwd: '',
                cert_desc: '',
                cert_alias: '',
                cert_p12file_id: '',
                cert_p12file_name: '',
                cert_file_id: '',
                cert_file_name: '',
                auto_create: null,
                validtime: null,
                owner: '',
                group_name: '',
                city: '',
                province: '',
                country: '',
            },
		};
	},
	methods: {
        
        open2() {
            this.$message({
                message: '这是一条成功消息！',
                type: 'success'
            });
        },
        open4() {
            this.$message.error('这是一条错误消息！');
        },
        submitCert() {

        }
	}
};
</script>

<style lang="less" scoped>
.demo {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
}
</style>
