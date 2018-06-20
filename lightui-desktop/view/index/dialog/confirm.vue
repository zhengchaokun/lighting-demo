
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <el-button style="width: 90px;" type="primary" @click="create_dialog=true">创建证书</el-button>
            
            <el-table
                class="mgt20"
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="证书名称"
                    min-width="130">
                </el-table-column>
                <el-table-column
                    prop="platform"
                    label="平台"
                    min-width="80">
                    <template slot-scope="scope">
                        {{ parsePlatform(scope.row.platform) }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                    min-width="80">
                    <template slot-scope="scope">
                        <span :class="parseTypeColor(scope.row.type)">{{ parseTypeText(scope.row.type) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="创建日期"
                    min-width="130">
                    <template slot-scope="scope">{{new Date(scope.row.date).Format('yyyy-MM-dd hh:mm:ss')}}</template>
                </el-table-column>
                <!-- <el-table-column
                    label="操作"
                    min-width="80">
                    <template slot-scope="scope">
                        <el-button type="text" @click="preview(scope.row)">查看详情</el-button>
                    </template>
                </el-table-column> -->
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
        </div>

        <el-dialog title="创建证书" :visible.sync="create_dialog" class="dialog-createcert">
            <el-form label-width="80px">
                <el-form-item label="平台">
                    <el-select class="w300" v-model="edit_cert.cert_platform" placeholder="请选择" v-bind:disabled="edit_cert.id && edit_cert.id >0">
                        <el-option v-for="item in platforms" :key="item.value" :label="item.key" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select class="w300" v-model="edit_cert.cert_type" placeholder="请选择">
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
                    <el-input v-model="edit_cert.cert_pwd" placeholder="请输入6-64位证书密码" type="password" :maxlength='64' :minlength='6'></el-input>
                </el-form-item>
                <el-form-item label="证书库密码" v-show="edit_cert.cert_platform=='android'">
                    <el-input v-model="edit_cert.cert_lib_pwd" placeholder="请输入6-64位证书库密码" type="password" :maxlength='64' :minlength='6'></el-input>
                </el-form-item>
                <el-form-item class="text-left" label="一键创建" v-show="edit_cert.cert_platform=='android'">
                    <el-switch v-model="edit_cert.auto_create" on-text="是" off-text="否"></el-switch>
                </el-form-item>
                <template v-if="edit_cert.cert_platform=='android'&&edit_cert.auto_create">
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
                <el-form-item v-show="edit_cert.cert_platform=='ios'||(edit_cert.cert_platform=='android'&&!edit_cert.auto_create)" label="证书上传" style="position: relative;">
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
                    </template>
                    <el-upload class="upload-cert" action="" :on-preview="handlePreview" :on-remove="handleRemove" :show-file-list="false" :http-request="uploadfile">
                        <el-button type="primary" class="upload-button">上 传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel" type="plain">取 消</el-button>
                <el-button @click="submitCert" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import top from "../../../ui/top.vue";
const API = require("../../../lib/api");
export default {
  	components: {
		top
	},
  	data() {
		return {
			title: "编辑弹框",
            desc: "在保留当前页面状态的情况下，告知用户并承载相关操作。",
            currentPage: 1,
            pageSize: 5,
            tableData: [],
            totalData: API.certList,
            create_dialog: false,
            is_quickcreate: false,
            nickName: '李华',
            types: [{
                key: 'test',
                label: '测试',
                value: 'test'
            }, {
                key: 'release',
                label: '正式',
                value: 'release'
            }],
            platforms: [{
                key: 'iOS',
                value: 'ios'
            }, {
                key: 'Android',
                value: 'android'
            }],
            create_cert: {},
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
                auto_create: false,
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
        deepCopy(obj) {
            return API.deepCopy(obj);
        },
        parseTypeColor(type) {
            return API.parseTypeColor(type);
        },
        parseTypeText(type) {
            return API.parseTypeText(type);
        },
        parsePlatform(platform) {
            return API.parsePlatform(platform);
        },
        cancel() {
            this.edit_cert = {};
            this.create_dialog = false;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        uploadfile: function(data) {
            var that = this;
            var platform = that.edit_cert.cert_platform;
            var file = data.file;
            var filename = file.name;
            //判断文件后缀
            var suffix = filename.substring(filename.lastIndexOf(".") + 1);
            if (platform == 'android') {
                if (that.edit_cert.cert_file_id.length > 0) {
                    API.error(this, "请先删除原文件再上传");
                    return;
                } else if (suffix != 'keystore') {
                    API.error(this, "此证书应为keystore文件");
                    return;
                } else {
                    that.edit_cert.cert_file_name = filename;
                    that.edit_cert.cert_file_id = filename;
                    API.success(this, "Android证书文件上传成功！");
                }
            }

            if (platform == 'ios') {
                if (that.edit_cert.cert_file_id.length > 0 && suffix == 'mobileprovision') {
                    API.error(this, "请先删除mobileprovision文件再上传");
                    return;
                }
                if (that.edit_cert.cert_p12file_id.length > 0 && suffix == 'p12') {
                    API.error(this, "请先删除p12文件再上传");
                    return;
                }
                if (suffix != 'p12' && suffix != 'mobileprovision') {
                    API.error(this, "证书类型错误");
                    return;
                }
                if (suffix == 'p12') {
                    that.edit_cert.cert_p12file_id = filename;
                    that.edit_cert.cert_p12file_name = filename;
                }
                if (suffix == 'mobileprovision') {
                    that.edit_cert.cert_file_id = filename;
                    that.edit_cert.cert_file_name = filename;                  
                }
                if(that.edit_cert.cert_p12file_id.length > 0 && that.edit_cert.cert_file_id.length > 0) {
                    API.success(this, "iOS证书文件上传成功！");
                }

                

            }
        },
        submitCert: function() {
            
            var that = this;
            if (!that.edit_cert.cert_desc || that.edit_cert.cert_desc.length < 1) {
                API.error(this, "请填写证书名称");
                return;
            }
            if (that.edit_cert.cert_desc && !/^(?!_)[a-zA-Z0-9_\u4e00-\u9fa5.@#$!]+$/.test(that.edit_cert.cert_desc)) {
                API.error(this, "证书名称只能包含中文、字母、数字和特殊符号(!、@、#、$、_和.)，且首位不能为下划线！");
                return;
            }
            if (!that.edit_cert.cert_pwd || that.edit_cert.cert_pwd.length < 1) {
                API.error(this, '请填写证书密码');
                return;
            }
            if (that.edit_cert.cert_pwd && !/^(?!_)[a-zA-Z0-9_.@#$!]+$/.test(that.edit_cert.cert_pwd)) {
                API.error(this, "证书密码只能包含字母、数字和特殊符号(!、@、#、$、_和.)，且首位不能为下划线！");
                return;
            }
            if (that.edit_cert.cert_pwd.trim().length < 6 || that.edit_cert.cert_pwd.trim().length >
                64) {
                API.error(this, "证书密码长度应为6~64位");
                return;
            }
            if (that.edit_cert.cert_platform == 'android') {
                if (!that.edit_cert.cert_alias || that.edit_cert.cert_alias.length < 1) {
                    API.error(this, "请填写证书别名");
                    return;
                }
                if (that.edit_cert.auto_create == 0) {
                    if (that.edit_cert.cert_alias && !/^(?!_)[a-zA-Z0-9_.@#$!]+$/.test(that.edit_cert.cert_alias)) {
                        API.error(this, "证书别名只能包含字母、数字和下划线和特殊符号(!、@、#、$、_和.)，且首位不能为下划线！");
                        return;
                    }
                }
                if (!that.edit_cert.cert_lib_pwd || that.edit_cert.cert_lib_pwd.length < 1) {
                    API.error(this, '请填写证书库密码');
                    return;
                }
                if (that.edit_cert.cert_lib_pwd && !/^(?!_)[a-zA-Z0-9_.@#$!]+$/.test(that.edit_cert.cert_lib_pwd)) {
                    API.error(this, "证书库密码只能包含字母、数字和特殊符号(!、@、#、$、_和.)，且首位不能为下划线！");
                    return;
                }
                if (that.edit_cert.cert_lib_pwd.trim().length < 6 || that.edit_cert.cert_lib_pwd.trim()
                    .length > 64) {
                    API.error(this, "证书库密码长度应为6~64位！");
                    return;
                }
                if (that.edit_cert.auto_create == 1) {
                    if (that.edit_cert.cert_alias && !/^(?!_)[a-zA-Z0-9_.@#$!]+$/.test(that.edit_cert.cert_alias)) {
                        API.error(this, "证书别名只能包含字母、数字和特殊符号(!、@、#、$、_和.)，且首位不能为下划线！");
                        return;
                    }
                    if (!that.edit_cert.validtime || that.edit_cert.validtime.length < 0) {
                        that.edit_cert.validtime = 100;
                    }
                    if (that.edit_cert.validtime <= 0) {
                        API.error(this, '证书有效期应大于0！');
                        return;
                    }
                    if (that.edit_cert.validtime && (!/^[0-9]*$/.test(that.edit_cert.validtime))) {
                        API.error(this, '请填写正确的证书有效期！');
                        return;
                    }
                    if (that.edit_cert.owner && !/^(?!_)[a-zA-Z0-9_.@#$!]+$/.test(that.edit_cert.owner)) {
                        API.error(this, '所有者名称只能包含字母、数字和特殊符号(!、@、#、$、_和.)，且首位不能为下划线！');
                        return;
                    }
                    if (that.edit_cert.group_name && !/^(?!_)[a-zA-Z0-9_.@#$!]+$/.test(that.edit_cert.group_name)) {
                        API.error(this, '组织名称只能包含字母、数字和特殊符号(!、@、#、$、_和.)，且首位不能为下划线！');
                        return;
                    }
                    if (that.edit_cert.city && !/^(?!_)[a-zA-Z0-9_.@#$!]+$/.test(that.edit_cert.city)) {
                        API.error(this, '城市名称只能包含字母、数字和特殊符号(!、@、#、$、_和.)，且首位不能为下划线！');
                        return;
                    }
                    if (that.edit_cert.province && !/^(?!_)[a-zA-Z0-9_.@#$!]+$/.test(that.edit_cert.province)) {
                        API.error(this, '省份名称只能包含字母、数字和特殊符号(!、@、#、$、_和.)，且首位不能为下划线！');
                        return;
                    }
                    if (that.edit_cert.country && !/^(?!_)[a-zA-Z0-9_.@#$!]+$/.test(that.edit_cert.country)) {
                        API.error(this, '国家名称只能包含字母、数字和特殊符号(!、@、#、$、_和.)，且首位不能为下划线！');
                        return;
                    }
                    if (that.edit_cert.owner.length > 30) {
                        API.error(this, '所有者名称长度不能超过30位！');
                        return;
                    }
                    if (that.edit_cert.group_name.length > 30) {
                        API.error(this, '组织名称长度不能超过30位！');
                        return;
                    }
                    if (!that.edit_cert.owner || that.edit_cert.owner.length < 0) {
                        that.edit_cert.owner = that.nickName;
                    }
                    if (!that.edit_cert.group_name || that.edit_cert.group_name.length < 0) {
                        that.edit_cert.group_name = "Light";
                    }
                    if (!that.edit_cert.city || that.edit_cert.city.length < 0) {
                        that.edit_cert.city = "Hangzhou";
                    }
                    if (!that.edit_cert.country || that.edit_cert.country.length < 0) {
                        that.edit_cert.country = "China";
                    }
                    if (!that.edit_cert.province || that.edit_cert.province.length < 0) {
                        that.edit_cert.province = "Zhejiang";
                    }
                } else {
                    console.log(that.edit_cert);
                    if (!that.edit_cert.cert_file_id || that.edit_cert.cert_file_id.length < 1) {
                        API.error(this, '请上传证书文件');
                        return;
                    }
                }
            }

            if (that.edit_cert.cert_platform == 'ios') {
                if (!that.edit_cert.cert_file_id || that.edit_cert.cert_file_id.length < 1) {
                    API.error(this, '请上传证书文件');
                    return;
                }
                if (!that.edit_cert.cert_p12file_id || that.edit_cert.cert_p12file_id.length < 1) {
                    API.error(this, '请上传p12证书文件');
                    return;
                }
            }
            if (!that.edit_cert.id) {
                that.edit_cert.cert_status = 1;
                that.edit_cert.create_date = new Date().getTime();
                that.edit_cert.app_id = that.app_id;
                that.page = 1;
            }
            if(that.edit_cert.cert_platform == 'ios') {
                API.success(that, "iOS 证书创建成功！");
            } else {
                API.success(that, "Android 证书创建成功！");
            }


            that.edit_cert.id = that.currentId;       
            that.edit_cert.name = that.edit_cert.cert_desc;
            that.edit_cert.date = that.edit_cert.create_date;
            that.edit_cert.platform = that.edit_cert.cert_platform;
            
            console.log(that.edit_cert);
            that.totalData.unshift(that.edit_cert);
            this.tableData = this.totalData.slice(0, this.pageSize);
            
            that.create_dialog = false;
            that.edit_cert = that.create_cert;
        },
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
    },
    computed: {
        total() {
            return this.totalData.length;
        },
        currentId() {
            let id = 0;
            for(var i = 0; i < this.totalData.length-1; i++) {
                if(this.totalData[i].id > this.totalData[i+1]) {
                    id = this.totalData[i].id
                }
            }
            return id+1;
        }
    },
    mounted () {
        this.tableData = this.totalData.slice(0, this.pageSize);
        console.log(API.error, API.deepCopy);
        this.create_cert = this.deepCopy(this.edit_cert);
    }
    
};
</script>

<style lang="less">


.dialog-createcert .el-dialog__body {
    text-align: left;
}
.upload-cert {
    position: absolute;
    top: -3px;
    right: 0;
}
</style>
