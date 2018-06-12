<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>
        <div class="demo">
            <div id="compIndex">
                <div class="tool-bar">

                    <el-select v-model="groupSelect" :placeholder="placeholder" multiple type="fixedHeight" :disabled="isEdit">
                        <el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>

                    <el-button type="plain" class="btn-ghost fright" @click="ManageComp()" v-if="!isEdit">
                        管理
                    </el-button>

                    <el-button type="primary" class="btn-blue fright" @click="CommitManage()" v-if="isEdit">
                        确定
                    </el-button>

                    <el-button type="primary" class="fright btn-blue" @click="showCreateAppDialog()" :disabled="isEdit" style="margin-right:20px;">
                        组件创建
                    </el-button>
                    <div class="search_self">
                        <el-input class="w200" :disabled="isEdit" v-model="searchForm.keywords" :maxlength="30" icon="search" :on-icon-click="queryComp" @keypress.enter.native.prevent="queryComp" placeholder="名称/ID/标签">
                            <span slot="prepend">查询</span>
                        </el-input>
                    </div>
                </div>

                <div class="split2"></div>

                <div class="contentBox flexwrapper ">
                    <div class="floder" v-for="(group, index) in groupList" :key="index" v-show="floderShow(group.id)" :groupId="group.id" @drop="drop" @dragover="allowDrop">
                        <div class="floder-bar">
                            <h4>{{group.name}}</h4>
                            <span>/ {{group.comps.length}}</span>
                            <div class="edit-bar" v-if="isEdit">

                                <span class="icon-folder-add" @click="openAddRow(group,'add')"></span>

                                <span class="icon-folder-edit" @click="openAddRow(group,'edit')"></span>

                                <span class="icon-folder-delete" @click="openDeleteRow(group, index)"></span>

                                <span class="icon-folder-up" @click="upRow(group, index)" v-show="isUpShow(group, index)"></span>

                                <span class="icon-folder-down" @click="downRow(group, index)" v-show="isDownShow(group, index)"></span>

                            </div>
                        </div>
                        <div class="floder-container">
                            <template v-for="(comp, _index) in group.comps">
                                <div :id="comp.id" :key="group.id+'0'+_index" draggable="true" @dragstart="drag" style="display:inline-block;" v-show="isEdit">
                                    <card :id="comp.id" :type="0" :data="comp" :edit="isEdit" @cardClicked="jumpDetail" @editClicked="show_editComp_dialog" @deleteClicked="deleteComp" @disDeleteClicked="deleteTip">
                                    </card>
                                </div>
                                <div :id="comp.id" :key="group.id+'1'+_index" @dragstart="drag" style="display:inline-block;" v-show="!isEdit">
                                    <card :id="comp.id" :type="0" :data="comp" :edit="isEdit" @cardClicked="jumpDetail" @editClicked="show_editComp_dialog" @deleteClicked="deleteComp" @disDeleteClicked="deleteTip">
                                    </card>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="floder" v-show="floderShow(-1)" :groupId="-1" @drop="drop" @dragover="allowDrop">
                        <div class="floder-bar">
                            <h4>默认分组</h4>
                            <span>/ {{no_group_list.length}}</span>
                            <div class="edit-bar" v-if="isEdit">
                                <span class="icon-folder-add" @click="openAddRow()"></span>
                            </div>
                        </div>
                        <div class="floder-container">
                            <template v-for="(comp, index) in no_group_list">
                                <div :id="comp.id" :key="-1+'0'+index" draggable="true" @dragstart="drag" style="display:inline-block;" v-show="isEdit">
                                    <card :id="comp.id" :type="0" :data="comp" :edit="isEdit" @cardClicked="jumpDetail" @editClicked="show_editComp_dialog" @deleteClicked="deleteComp" @disDeleteClicked="deleteTip">
                                    </card>
                                </div>
                                <div :id="comp.id" :key="-1+'1'+index" style="display:inline-block;" v-show="!isEdit">
                                    <card :id="comp.id" :type="0" :data="comp" :edit="isEdit" @cardClicked="jumpDetail" @editClicked="show_editComp_dialog" @deleteClicked="deleteComp" @disDeleteClicked="deleteTip">
                                    </card>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <!-- 创建H5组件弹框 -->
                <el-dialog title="创建组件" :visible.sync="create_app" class="dialog-intergrate" @close="resetAPPForm('comp')">
                    <el-form v-model="comp" :rules="app_rules" ref="comp" label-width="80px">
                        <el-form-item label="名称" prop="show_name" tip="1-30位中英文、数字和下划线，且首位不能为下划线">
                            <el-input v-model="comp.show_name" :minlength="1" :maxlength="30" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="简介" prop="app_describe" tip="请输入0-200位字符" style="padding-top: 6px;">
                            <el-input type="textarea" v-model="comp.app_describe" :maxlength="200" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="分组" prop="appGroup" style="padding-top: 6px;">
                            <el-select v-model="comp.appGroup" type="fixedHeight" placeholder="请选择" class="w300">
                                <el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="标签" style="padding-top: 6px;">
                            <el-select
                                :multiple-limit="3"
                                @change="handleSelectChange"
                                class="w300"
                                v-model="comp.tagsArr"
                                multiple
                                type="fixedHeight"
                                filterable
                                allow-create
                                placeholder="请选择标签或创建新标签">
                                <el-option
                                    v-for="item in allTags"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="createComp(comp,'comp')">提 交</el-button>
                    </div>
                </el-dialog>

                <!-- 编辑H5组件弹框 -->
                <el-dialog title="编辑组件" :visible.sync="edit_dialog_show" class="dialog-intergrate">
                    <el-form v-model="editing_comp" :rules="app_rules_edit" ref="editing_comp" label-width="80px">
                        <el-form-item label="名称" prop="show_name" tip="1-30位中英文、数字和下划线，且首位不能为下划线">
                            <el-input v-model="editing_comp.show_name" :maxlength="30" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="简介" prop="app_describe" tip="请输入0-200位字符" style="padding-top: 6px;">
                            <el-input type="textarea" v-model="editing_comp.app_describe" :maxlength="200" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="分组" prop="appGroup" style="padding-top: 6px;">
                            <el-select v-model="editing_comp.appGroup" type="fixedHeight" placeholder="请选择" class="w300">
                                <el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="标签" style="padding-top: 6px;">
                            <el-select
                                :multiple-limit="3"
                                @change="handleSelectChange"
                                class="w300"
                                v-model="editing_comp.tagsArr"
                                multiple
                                type="fixedHeight"
                                filterable
                                allow-create
                                placeholder="请选择标签或创建新标签">
                                <el-option
                                    v-for="item in allTags"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="editComp(editing_comp,'editing_comp')">提 交</el-button>
                    </div>
                </el-dialog>

                <!-- 编辑&创建分组 -->
                <el-dialog :title="isEditing?'编辑分组':'创建分组'" :visible.sync="dialog2Visible" @close="groupAddConfirm('addonerow')">
                    <el-form :model="addOneRow" :rules="rules" ref="addonerow" label-width="80px">
                        <el-form-item label="分组名称" prop="name" tip="请输入1-10位字符，不允许输入空格">
                            <el-input v-model="addOneRow.name" placeholder="请输入" :minlength="1" :maxlength="10"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancelForm('addonerow')" type="plain" class="expand-button">取 消</el-button>
                        <el-button @click="submitForm('addonerow')" type="primary" class="expand-button mgl20">确 定</el-button>
                    </div>
                </el-dialog>

                <!-- 删除分组 -->
                <el-dialog type="warning" :visible.sync="dialog3Visible" @close="groupDeleteConfirm">
                    <p>确定要删除该分组吗？</p>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialog3Visible = false" type="plain">取 消</el-button>
                        <el-button @click="deleteRow(deleting.item, deleting.index)">确 定</el-button>
                    </div>
                </el-dialog>

                <!-- 删除组件 -->
                <el-dialog
                    type="warning"
                    :visible.sync="dialog4Visible">
                    <p>确定要删除该组件吗？</p>
                    <br>
                    <p class="muted">删除后不可恢复</p>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialog4Visible=false" type="plain">取 消</el-button>
                        <el-button @click="confirmDeleteComp">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import App from "light";
const API = require("../../../lib/api")
import Card from '../../../ui/card.vue'
import top from "../../../ui/top.vue";


var typeDict = {
    'create': '0',
    'buy': '1'
};
function deepCopy(source) { 
    var result = {};
    for (var key in source) {
        result[key] = typeof source[key]==='object'? deepCopy(source[key]): source[key];
    } 
    return result; 
}
function queryComp() {
    var that = this;
    that.groupList = [];
    that.no_group_list = [];
    
    if (that.searchForm.keywords && that.searchForm.keywords.length > 0) {
        let keyword = that.searchForm.keywords;
        //名称/id/标签
        var allGroupList = API.groupList.concat();
        allGroupList.forEach(function(group) {
            let temp_group = deepCopy(group);
            if(group.comps && group.comps.length>0) {
                let comps = group.comps.concat();
                let temp_comps = [];
                comps.forEach(function(comp) {
                    if(comp.id.toString().indexOf(keyword)>-1 || comp.show_name.indexOf(keyword)>-1 || (comp.tagsArr && comp.tagsArr.length>0 && comp.tagsArr.indexOf(keyword)>-1)) {
                        temp_comps.push(comp);
                    }
                })
                temp_group.comps = temp_comps;
            }
            that.groupList.push(temp_group);
        });

        API.comps.forEach(function(comp) {
            if(comp.id.toString().indexOf(keyword)>-1 || comp.show_name.indexOf(keyword)>-1 || (comp.tagsArr && comp.tagsArr.length>0 && comp.tagsArr.indexOf(keyword)>-1)) {
                that.no_group_list.push(comp);
            }
        })
    } else {
        that.groupList = API.groupList.concat();
        that.placeholder = '全部 / ' + (that.groupList.length+1); 
        API.comps.forEach(function(comp) {
            if (comp.group_id == undefined || comp.group_id == -1) {
                that.no_group_list.push(comp);
            }
        })
    }

    
    


   
    


}
export default {
    data: function() {
        var that = this;
        var checkRowName = function(rule, value, callback) {
            if (!value) {
                return callback(new Error('名称不能为空'));
            } else if(value=='默认分组') {
                return callback(new Error('默认分组已存在'));                
            } else if (new RegExp(' ').test(value)) {
                return callback(new Error('名称不能包含空格'));
            } else {
                callback();
            }
        };
        var checkShowName = function(rule, value, callback) {
            debugger
            callback();
            return;
            that.showname_error = false;
            if (!value) {
                that.showname_error = true;
                return callback(new Error('组件名称不能为空'));
            } else if (!/^[a-zA-Z0-9\u4E00-\u9FA5][\w\u4E00-\u9FA5]*$/g.test(value)) {
                that.showname_error = true;
                return callback(new Error('请输入中英文、数字和下划线，且首位不能为下划线'));
            } else if (value && value.length > 0) {
                if(that.appNameList.indexOf(value) > -1) {
                    that.showname_error = true;
                    return callback(new Error("该H5名称已被使用"));
                } else {
                    that.showname_error = false;
                }
                // API.check_comp_name({
                //     show_name: value,
                //     system: that.comp.system
                // }).then(function(data) {
                //     if (data && data.data && data.data.appNum > 0) {
                //         that.showname_error = true;
                //         return callback(new Error("该H5名称已被使用"));
                //     } else {
                //         that.showname_error = false;
                //         callback();
                //     }
                // });
            } else {
                that.showname_error = false;
                callback();
            }
        };
        var checkDesc = function(rule, value, callback) {
            callback();
        };
        var checkDescEdit = function(rule, value, callback) {
            callback();
        };
        var checkShowNameEdit = function(rule, value, callback) {
            callback();
            return;
            that.showname_edit_error = false;
            if (!value) {
                that.showname_edit_error = true;
                return callback(new Error('H5名称不能为空'));
            } else if (!/^[a-zA-Z0-9\u4E00-\u9FA5][\w\u4E00-\u9FA5]*$/g.test(value)) {
                that.showname_edit_error = true;
                return callback(new Error('请输入中英文、数字和下划线，且首位不能为下划线'));
            } else if (value && value.length > 0) {
                API.check_comp_name({
                    show_name: value,
                    system: 'h5',
                    id: that.editing_comp.id
                }).then(function(data) {
                    if (data && data.data && data.data.appNum > 0) {
                        if (value != that.currentComp.show_name) {
                            that.showname_edit_error = true;
                            return callback(new Error("该H5名称已被使用"));
                        } else {
                            that.showname_edit_error = false;
                            callback();
                        }
                    } else {
                        that.showname_edit_error = false;
                        callback();
                    }
                });
            } else {
                that.showname_edit_error = false;
                callback();
            }
        };
        return {
            title: '卡片管理',
            desc: '分组管理卡片，可进行新增、编辑、删除等操作',
            placeholder: '',
            showname_edit_error: false,
            showname_error: false,
            randomCompId: 100011,
            isEdit: false,
            groupSelect: '',
            dialog1Visible: false,
            dialog2Visible: false,
            dialog3Visible: false,
            dialog4Visible: false, 
            deletingComp: {},           
            deleting: {
                item: {},
                index: ''
            },
            isAdding: false,
            isEditing: false,
            groupList: [],
            editing: {
                id: '',
                name: ''
            },
            rawName: '',

            searchForm: {
                keywords: ''
            },

            no_group_list: [],
            comp_list: [],
            create_app: false,
            comp: {
                show_name: "",
                app_describe: "",
                system: 'h5',
                biz_type: 1,
                tags: '',
                tagsArr: [],
                appGroup: -1
            },
            loginInfo: {},
            error: {
                show_name: '',
                app_describe: '',
                tags: '',

            },
            edit_dialog_show: false,
            editing_comp: {
                show_name: '',
                app_describe: '',
                tags: '',
                tagsArr: [],
                appGroup: -1
            },
            currentComp: "",
            tagList: [],
            showpulltags: false,
            isTagOn: false,
            appTagisNone: false,
            addOneRow: { name: '' },
            rules: {
                name: [
                    { validator: checkRowName, trigger: 'blur' }
                ]
            },
            app_rules: {
                show_name: [
                    { validator: checkShowName, trigger: 'blur' }
                ],
                app_describe: [
                    { validator: checkDesc, trigger: 'blur' }
                ]
            },
            app_rules_edit: {
                show_name: [
                    { required: true, message: '组件名称不能为空', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                    // { validator: checkShowNameEdit, trigger: 'blur' }
                ],
                app_describe: [
                    { validator: checkDescEdit, trigger: 'blur' }
                ]
            },
            allTags: [
                {label: 'iOS', value: 'ios'},
                {label: 'Android', value: 'android'},
                {label:'正式', value: 'formal'},
                {label:'测试', value: 'test'}]

        }


    },
    components: {
        Card, top
    },
    computed: {
        groupOptions() {
            let tmp = [];
            this.groupList.forEach((item, index) => {
                tmp.push({
                    label: item.name,
                    value: item.id
                });
            })
            tmp.push({
                label: '默认分组',
                value: -1
            });
            return tmp;
        },
        appNameList() {
            let temp = [];
            this.groupList.forEach(function(group) {
                if(group.comps && group.comps.length > 0) {
                    let comps = group.comps;
                    comps.forEach(function(comp) {
                        if(temp.indexOf(comp.name) == -1) {
                            temp.push(comp.name);
                        }
                    })
                }
            })
            this.no_group_list.forEach(function(comp) {
                if(temp.indexOf(comp.name) == -1) {
                    temp.push(comp.name);
                }
            })
            console.log(temp);
            return temp;
        }
    },
    methods: {
        handleSelectChange(val) {
            console.log(val);
            var temp = this.allTags.concat();
            temp.forEach(function(tag) {
                if(val.indexOf(tag.value) == -1) {
                    temp.push({
                        label: val,
                        value: val
                    })
                }
            })
            // console.log(temp);
            // this.all = temp;
            // if(this.allTags.indexOf)
        },
        allowDrop(ev) {
            ev.preventDefault();
            var winHeight = window.innerHeight;
            var y = ev.clientY;
            if (y < 100) {
                window.scrollBy(0, -10);
            }
        },
        drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        },
        drop(ev) {
            if (!this.isEdit) {
                return;
            }
            ev.preventDefault();
            var groupId = ev.currentTarget.getAttribute('groupId');
            var compId = ev.dataTransfer.getData("text");

            if (!compId) {
                return;
            }
            if (!groupId) {
                return;
            }
            // API.setCompGroup({
            //     compId: compId,
            //     groupId: groupId,
            //     type: 1
            // })
            //     .then(data => {
            //         queryComp.call(this);
            //     })
        },
        queryComp() {
            queryComp.call(this);
        },
        floderShow(id) {
            if (this.groupSelect.length == 0) {
                return true;
            }
            var index = this.groupSelect.indexOf(id);
            if (index >= 0) {
                return true;
            } else {
                return false;
            }
        },
        groupEditConfirm() {
            this.dialog1Visible = false;
            this.editing.name = '';
            this.editing.id = '';
            this.rawName = '';
        },
        groupAddConfirm(formName) {
            if (this.isEditing) {
                this.addOneRow = {};
            } else {
                this.addOneRow.name = '';
            }
            this.$refs[formName].resetFields();
        },
        groupDeleteConfirm() {
            this.deleting.item = {};
            this.deleting.index = '';
        },
        editRow(item) {
            debugger
            this.rawName = item.name;
            this.editing.name = item.name;
            this.editing.id = item.id;
        },
        saveRow(item) {
            if (this.editing.name == '') {
                API.error(this, '请填写分组名称');
                return;
            }
            if (this.editing.name.indexOf(' ') >= 0) {
                API.error(this, '名称内不得含有空格');
                return;
            }
            if (this.editing.name.length > 10) {
                API.error(this, '分组名称过长');
                return;
            }
            if (this.editing.name == this.rawName) {
                this.editing.name = '';
                this.editing.id = '';
                this.rawName = '';
                return;
            }

            this.editing.name = '';
            this.editing.id = '';
            this.rawName = '';
            this.groupList.forEach(function(group) {
                if(group.id==item.id) {
                    group.name = item.name;
                }
            })
            API.success(this, "分组修改成功！");
            this.addOneRow = {};
            this.dialog2Visible = false;
            // API.updateH5Group({
            //     id: item.id,
            //     name: this.editing.name,
            //     type: 1
            // })
            //     .then(data => {
            //         this.editing.name = '';
            //         this.editing.id = '';
            //         this.rawName = '';
            //         queryComp.call(this);
            //     })
            //     .catch(err => {
            //         API.error(this, err.err_info);
            //     })
            // API.updateH5Group({
            //     id: item.id,
            //     name: item.name,
            //     type: 1
            // })
            //     .then(data => {
            //         API.success(this, "分组修改成功！");
            //         this.addOneRow = {};
            //         this.dialog2Visible = false;
            //         queryComp.call(this);
            //     })
            //     .catch(err => {
            //         API.error(this, err.err_info);
            //     })
        },
        openDeleteRow(item, index) {
            debugger
            if (item.comps.length > 0) {
                API.error(this, '若要删除分组，请先清空分组内的组件！');
            } else {
                this.dialog3Visible = true;
                this.deleting.item = item;
                this.deleting.index = index;
            }
        },
        deleteRow(item, index) {
            debugger
            var that = this;
            this.groupList.forEach(function(group, idx) {
                if(group.id==item.id) {
                    that.groupList.splice(idx, 1);
                }
            })
            API.success(this, "分组删除成功！");
            this.dialog3Visible = false;
            // API.deleteH5Group({
            //     id: item.id,
            //     type: 1
            // })
            //     .then(data => {
            //         queryComp.call(this);
            //         var index = this.groupSelect.indexOf(item.id);
            //         if (index > -1) {
            //             this.groupSelect.splice(index, 1);
            //         }
            //         API.success(this, "分组删除成功！");
            //         this.dialog3Visible = false;
            //         // queryComp.call(this);
            //         // this.groupDeleteConfirm();
            //     })
            //     .catch(err => {
            //         API.error(this, err.err_info);
            //     })
        },
        upRow(item, index) {
            var target = item;
            var prev = this.groupList[index - 1];
            var tmp;
            tmp = prev.position;
            prev.position = target.position;
            target.position = tmp;

            this.groupList.splice(index - 1, 1, target);
            this.groupList.splice(index, 1, prev);

            // var promise = [API.updateH5Group({
            //     id: target.id,
            //     position: target.position
            // }), API.updateH5Group({
            //     id: prev.id,
            //     position: prev.position
            // })];
            // Promise.all(promise)
            //     .then(data => {
            //     })
        },
        downRow(item, index) {
            var target = item;
            var next = this.groupList[index + 1];
            var tmp;
            tmp = next.position;
            next.position = target.position;
            target.position = tmp;

            this.groupList.splice(index + 1, 1, target);
            this.groupList.splice(index, 1, next);

            // var promise = [API.updateH5Group({
            //     id: target.id,
            //     position: target.position
            // }), API.updateH5Group({
            //     id: next.id,
            //     position: next.position
            // })];
            // Promise.all(promise)
            //     .then(data => {
            //     })
        },
        isUpShow(item, index) {
            if (index == 0) {
                return false;
            } else {
                return true;
            }
        },
        isDownShow(item, index) {
            if (index == this.groupList.length - 1) {
                return false;
            } else {
                return true;
            }
        },
        openAddRow(item,type) {
            var that = this;
            if (type=='edit') {
                that.isEditing = true;
                that.addOneRow.id = item.id;
                that.addOneRow.name = item.name;
                that.editing.name = item.name;
                that.editing.id = item.id;
            } else {
                this.isEditing = false;
                this.addOneRow = {};
                if(!item) {
                    that.addOneRow.indexOld = -1;
                } else {
                    that.addOneRow.indexOld = item.position
                }
            }
            this.dialog2Visible = true;
        },
        
        addRow(name) {
            var that = this;
            let item = {
                type: 1,
                name: name,
                position: that.addOneRow.indexOld,
                comps: []
            }
            API.groupList.unshift(item);
            this.groupList = API.groupList;
            API.success(this, "创建分组成功！");
            this.dialog2Visible = false;
        },
        
        queryGroup() {
            // API.queryH5Group({
            //     type: 1
            // })
            //     .then(data => {
            //         this.groupList = data.data;
            //     })
        },
        ManageComp() {
            this.isEdit = true;
            this.groupSelect.splice(0, 0);
        },
        CommitManage() {
            this.isEdit = false;
            this.groupSelect.splice(0, 0);
        },
        showManageDialog() {
            if (!this.isEdit) {
                this.dialog1Visible = true;
            }
        },


        /*  */
        deleteTip() {
            // API.confirm("该组件已创建实例，若确定要删除该组件，请先清除实例！", "确认");
        },
        escape2Html: function(str) {
            var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
            return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) { return arrEntities[t]; });
        },
        chooseCompType: function(type) {
            // API.countly.event("71");
            this.comp.system = type;
        },
        toggleTags: function() {
            this.showpulltags = !this.showpulltags;
            this.getTags();
        },
        show_editComp_dialog: function(comp) {
            debugger
            this.showpulltags = false;
            this.edit_dialog_show = true;
            this.currentComp = comp.show_name;
            this.editing_comp.id = comp.id;
            this.editing_comp.show_name = comp.show_name;
            this.editing_comp.app_describe = comp.app_describe;
            this.editing_comp.appGroup = comp.group_id;
            this.showname_edit_error = false;
            if (comp.tagsArr) {
                this.editing_comp.tagsArr = comp.tagsArr;
            } else {
                this.editing_comp.tagsArr = [];
            }

        },
        editComp: function(comp, appForm) {
            var that = this;

            if (!comp.show_name || !that.showname_edit_error) {
                this.$refs[appForm].validateField('show_name');
            }

            if (that.showname_edit_error) {
                return;
            }
            // setTimeout(function() {
            //     API.comp_detail_update({
            //         id: comp.id,
            //         show_name: comp.show_name,
            //         app_describe: comp.app_describe,
            //         group_id: comp.appGroup,
            //         tags: comp.tagsArr.join(",")
            //     }).then(function(data) {
            //         if (data.err_no != "0") {
            //             API.error(that, data.err_info);
            //         } else {
            //             that.selectedTag = [];
            //             that.resetAPPForm(appForm);
            //             that.edit_dialog_show = false;
            //             API.success(that, "组件信息编辑成功！");
            //             queryComp.call(that);
            //         }
            //     })
            // }, 500);
        },

        actionEvent: function(id) {
            API.countly.event(id);
        },
        jumpDetail: function(comp) {
            if (this.isEdit == true) {
                return;
            }
            if (comp.is_buy) {
                App.navigate("index/comp/tab/instance", {
                    id: comp.id
                });
            } else {
                if (comp.system == 'h5') {
                    App.navigate("index/comp/tab/publish/h5", {
                        id: comp.id
                    });
                } else {
                    App.navigate("index/comp/tab/publish/native", {
                        id: comp.id
                    });
                }
            }
        },
        check_name: function(comp) {

            if (!comp.show_name || comp.show_name == this.currentComp) {
                return
            };
            API.check_comp_name({
                show_name: comp.show_name,
                system: 'h5'
            }).then(function(data) {
                if (data && data.data && data.data.appNum > 0) {
                    API.confirm("您填写的名称已经存在，要重新输入吗？", "再次输入:red", function() {
                    })
                }
            })
        },
        addToSelectTags: function(key, comp) {
            var that = this;
            if (comp.tagsArr.indexOf(that.tagList[key].name) > -1) {
                // API.alert("不能添加相同标签");
                comp.tagsArr = comp.tagsArr.filter(function(k) {
                    if (k == that.tagList[key].name) {
                        return false;
                    } else {
                        return true;
                    }
                })
            } else {
                // if (comp.tagsArr.length >= 3) {
                //     API.warning(that, '标签数量不能多于3个');
                // } else {
                //     comp.tagsArr.push(that.tagList[key].name);
                // }
            }
        },
        deleTag: function(index, comp) {
            var that = this;
            comp.tagsArr.splice(index, 1);
        },
        createComp: function(comp, appForm) {
            var that = this;
            console.log(comp);

            //5-30个字符
            if (!comp.show_name || !that.showname_error) {
                this.$refs[appForm].validateField('show_name');
            }
            if (that.showname_error) {
                return;
            }
            let item = {
                id: that.randomCompId,
                show_name: comp.show_name,
                tagsArr: comp.tagsArr.concat(),
                app_describe: comp.app_describe,
                group_id: comp.appGroup,
                app_status: 1,
                store_status: 2
            }
            that.randomCompId++;
            if(item.group_id==-1) {
                that.no_group_list.push(item);
            } else {
                that.groupList.forEach(function(group) {
                    if(group.id == item.group_id) {
                        group.comps.push(item)
                    }
                })
            }
            that.create_app = false;
            API.success(this, "分组创建成功！");
        },
        // 重置组件表单
        resetAPPForm(formName) {
            this.$refs[formName].resetFields();
        },
        showCreateAppDialog: function() {
            // API.countly.event("70");
            this.create_app = true;
            this.showpulltags = false;
            this.showname_error = false;
            this.comp.show_name = "";
            this.comp.system = "h5";
            this.comp.app_describe = "";
            this.comp.tags = "";
            this.comp.tagsArr = [];
            this.comp.biz_type = 1;
            this.comp.appGroup = -1;
            this.error = {
                show_name: '',
                app_describe: '',
                tags: ''
            }
        },
        hide_create_app_dialog: function(comp) {
            var that = this;
            API.countly.event("73");
            if (comp.show_name || comp.app_describe) {
                API.confirm("确定要放弃编辑吗？", "确认放弃", function() {
                    that.create_app = false;
                })
            } else {
                that.create_app = false;
            }
        },

        check_desc: function(comp) {
            var that = this;
            // if (comp.app_describe.length < 8) {
            //     that.error.app_describe = ("简介至少为8个字符！");
            //     return;
            // } else {
            //     that.error.app_describe = '';
            // }
        },

        check_showName: function(comp) {
            if (!comp.show_name) return;
            var that = this;
            API.check_comp_name({
                show_name: comp.show_name,
                system: 'h5'
            }).then(function(data) {
                if (data && data.data && data.data.appNum > 0) {
                    that.error.show_name = ("名称已经存在，请重新输入")
                } else {
                    that.error.show_name = "";
                }
            })
        },
        deleteComp: function(comp) {
            this.dialog4Visible = true;
            this.deletingComp = comp;
        },
        confirmDeleteComp() {
            var that = this;
            let comp = this.deletingComp;
            if(!comp.group_id || comp.group_id==-1) {
                that.no_group_list.forEach(function(item, idx) {
                    if(item.id == comp.id) {
                        that.no_group_list.splice(idx, 1);
                    }
                })
            } else {
                that.groupList.forEach(function(group) {
                    if(group.comps && group.comps.length>0) {
                        let comps = group.comps;
                        comps.forEach(function(item, i) {
                            if(item.id == comp.id) {
                                comps.splice(i, 1);
                            }
                        })
                    }
                })
            }
            this.dialog4Visible = false;
            
        },
        // 取得所有标签
        getTags: function() {
            var _this = this;
            // API.getTags().then(function(data) {
            //     if (data.err_no == 0) {
            //         _this.tagList = data.data;
            //     }
            // });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var validValue = this.$refs[formName].fields[0].fieldValue;
                    if (this.isEditing) {
                        this.saveRow(this.addOneRow);
                    } else {
                        this.addRow(validValue);
                    }
                } else {
                    return false;
                }
            });
        },
        cancelForm(formName) {
            this.$refs[formName].resetFields();
            this.dialog2Visible = false;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    watch: {
        "editing_comp.tagsArr": function(tag) {
            // if (tag.length == 0) {
            //     this.appTagisNone = true;
            // } else {
            //     this.appTagisNone = false;
            // }
        },
        "comp.tagsArr": function(tag) {
            // if (tag.length == 0) {
            //     this.appTagisNone = true;
            // } else {
            //     this.appTagisNone = false;
            // }
        },
        'edit_dialog_show': function(param) {
            if (!param) {
                this.resetAPPForm('editing_comp');
                this.editing_comp.id = '';
                this.editing_comp.show_name = '';
                this.editing_comp.app_describe = '';
                this.editing_comp.appGroup = -1;
                this.editing_comp.tags = '';
                this.edit_dialog_show = false;
                this.showname_error = false;
                // this.resetAPPForm('editing_comp');
            }
        }
    },
    created: function() {
        var _this = this;
        // this.loginInfo = API.loginInfo().user;
        queryComp.call(this);
        this.groupList = API.groupList;
    },
    activated: function() {
        queryComp.call(this);
    }
}
</script>


<style>
#compIndex {
    width: 100%;
}
.search_self {
    display: inline-block;
    float: right;
}
.tool-bar {
    margin-top: 12px;
    min-width: 658px;
}

.icon-floder-blue {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('../../../images/floder-gray.svg');
    background-size: contain;
    vertical-align: middle;
    margin: 0 10px 0px 20px;
    cursor: pointer;
}

.icon-floder-blue:hover {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('../../../images/floder-blue.svg');
    background-size: contain;
    vertical-align: middle;
    margin: 0 10px 0px 20px;
    cursor: pointer;
}

.edit-bar {
    display: inline-block;
    float: right;
    line-height: 30px;
    padding-right: 10px;
}

.expand-button {
    width: 140px;
    height: 30px !important;
}

.icon-folder-add {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../../images/add-gray.svg');
    background-size: contain;
    vertical-align: middle;
    cursor: pointer;
}

.icon-folder-add:hover {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../../images/add-blue.svg');
    background-size: contain;
    vertical-align: middle;
    cursor: pointer;
}

.icon-folder-edit {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../../images/edit-gray.svg');
    background-size: contain;
    vertical-align: middle;
    cursor: pointer;
}

.icon-folder-edit:hover {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../../images/edit-blue.svg');
    background-size: contain;
    vertical-align: middle;
    cursor: pointer;
}

.icon-folder-delete {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../../images/delete-gray.svg');
    background-size: contain;
    vertical-align: middle;
    cursor: pointer;
}

.icon-folder-delete:hover {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../../images/delete-blue.svg');
    background-size: contain;
    vertical-align: middle;
    cursor: pointer;
}

.icon-folder-up {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../../images/up-gray.svg');
    background-size: contain;
    vertical-align: middle;
    cursor: pointer;
}

.icon-folder-up:hover {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../../images/up-blue.svg');
    background-size: contain;
    vertical-align: middle;
    cursor: pointer;
}

.icon-folder-down {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../../images/down-gray.svg');
    background-size: contain;
    vertical-align: middle;
    cursor: pointer;
}

.icon-folder-down:hover {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../../images/down-blue.svg');
    background-size: contain;
    vertical-align: middle;
    cursor: pointer;
}

.search-input {
    float: right;
    margin-right: 30px;
    width: 200px;
}

.btn-blue {
    display: inline-block;
    width: 90px;
    height: 32px;
    margin-right: 20px;
}

.btn-ghost {
    display: inline-block;
    width: 90px;
    height: 32px;
    color: #0AA9F1;
    background-color: #ffffff;
    margin-right: 20px;
}

.split2 {
    width: auto;
    display: block;
    height: 2px;
    background-color: #D2D9E3;
    margin: 10px 0;
}

.floder {
    width: 100%;
    padding-bottom: 20px;
}

.floder-bar {
    height: 30px;
    background: #F5F7FA;
}

.floder-bar h4 {
    display: inline-block;
    font-size: 16px;
    color: #606060;
    letter-spacing: 0.24px;
    margin-left: 20px;
    line-height: 30px;
}

.floder-bar span {
    font-size: 14px;
    color: #606060;
    letter-spacing: 0.21px;
    margin-left: 2px;
    line-height: 30px;
}

.floder-container {
    min-height: 40px;
}

.icon-floder-sm {
    display: inline-block;
    width: 20px;
    height: 22px;
    background-image: url('../../../images/floder-sm.svg');
    background-size: contain;
    background-repeat: no-repeat;
    margin: 0 10px 0px 10px;
    position: relative;
    top: 6px;
}

.dialog-item {
    display: block;
    width: 400px;
    height: 30px;
    border-radius: 2px;
    text-align: left;
}

.dialog-item input {
    vertical-align: baseline;
    width: 186px;
}

.dialog-item.active {
    background-color: #F5F7FA;
}

.dialog-item.add {
    background: #F5F7FA;
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    color: #909090;
    letter-spacing: 0.21px;
    cursor: pointer;
    line-height: 30px;
    border: 0px;
    width: auto;
    height: auto;
}

.dialog-item .floder-title {
    display: inline-block;
    width: 190px;
}

.dialog-item .floder-edit {
    font-size: 14px;
    color: #0AA9F1;
    letter-spacing: 0.21px;
    margin: 0 10px;
    cursor: pointer;
}

.icon-arrow-up {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 10px;
    background-image: url('../../../images/arrow.svg');
    background-size: contain;
    background-repeat: no-repeat;
    transform: rotate(180deg);
    cursor: pointer;
    vertical-align: bottom;
    float: right;
    position: relative;
    top: 6px;
}

.icon-arrow-down {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 10px;
    background-image: url('../../../images/arrow.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: 6px;
    cursor: pointer;
    vertical-align: bottom;
    float: right;
    position: relative;
    top: 6px;
}

.icon-plus {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 0 10px;
    background-image: url('../../../images/plus.svg');
    background-size: contain;
    background-repeat: no-repeat;
}

.forbid {
    cursor: not-allowed;
}

.btn-grey {
    background-color: #ECEFF5;
    color: #B5C1D4;
}
</style>