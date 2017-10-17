
<template>
    <el-row>
        <el-col :span="5" class="sidebar">
            <el-menu default-active="1-4" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>运营中心</template>
                    <el-menu-item-group>
                        <template slot="title">概况</template>
                        <el-menu-item index="1-1">应用概况</el-menu-item>
                        <el-menu-item index="1-2">用户概况</el-menu-item>
                        <el-menu-item index="1-3">流量概况</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">用户数据</template>
                        <el-menu-item index="1-4">基础数据</el-menu-item>
                        <el-menu-item index="1-5">实例数据</el-menu-item>
                        <el-menu-item index="1-6">组件数据</el-menu-item>
                        <el-menu-item index="1-7">应用数据</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="2"><i class="el-icon-menu"></i>系统中心</el-menu-item>
                <el-menu-item index="3"><i class="el-icon-setting"></i>运维中心</el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="19" class="mainbody">
            <el-tabs v-model="activeTab" type="card" @tab-click="handleTabClick">
                <el-tab-pane label="基础数据" name="first">
                    <!--编辑用户信息弹框-->
                    <el-dialog title="编辑" :visible.sync="editinfo">
                        <el-form :model="form" label-width="80px" class="form-editinfo">
                            <el-form-item label="姓名" >
                                <el-input v-model="form.certname" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="登录平台">
                                <el-select v-model="form.platform" placeholder="请选择" class="w300">
                                    <el-option
                                        v-for="item in form.platforms"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="注册时间" class="tcenter">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="工会成员">
                                <el-switch v-model="form.quickcreate" on-text="是" off-text="否"></el-switch>
                                <el-tooltip content="加入工会后方可享受工会权益" placement="right">
                                    <img src="../images/tooltip.svg" class="tooltip">
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="办公地点" >
                                <el-radio-group v-model="form.resource">
                                    <el-radio label="恒生大厦"></el-radio>
                                    <el-radio label="智汇中心"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="订阅频道" >
                                <el-checkbox-group v-model="form.type">
                                    <el-checkbox label="美食匣" name="type"></el-checkbox>
                                    <el-checkbox label="摄影圈" name="type"></el-checkbox>
                                    <el-checkbox label="跑步圈" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="form.desc"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="editinfo=false" type="plain">取 消</el-button>
                            <el-button @click="editinfo=false" type="primary">保 存</el-button>
                        </div>
                    </el-dialog>
                    <div class="ver-table mgt15">
                        <el-table
                                stripe
                                :data="table_userinfo"
                                style="width: 100%"
                                class="table-interg">
                            <el-table-column
                                    prop="name"
                                    label="姓名"
                                    min-width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="regtime"
                                    label="注册时间"
                                    min-width="220">
                            </el-table-column>
                            <el-table-column
                                    label="状态"
                                    min-width="192">
                                <template scope="scope_status">
                                    <span class="text-bold" :class="{'text-success':scope_status.row.status=='使用中', 'text-error':scope_status.row.status=='已注销', 'text-primary':scope_status.row.status=='未激活'}">
                                        {{scope_status.row.status}}
                                    </span>
                                    <span v-show="scope_status.row.status=='使用中'" class="mgl4"></span>
                                    <span v-show="scope_status.row.status=='已注销'" class="mgl4">
                                        / <el-button type="text" class="mgl4" @click="downloadpacks=true">查看日志</el-button>
                                    </span>
                                    <span v-show="scope_status.row.status=='未激活'" class="mgl4">
                                        / <el-button type="text" class="mgl4" @click="checklog=true">发送提醒</el-button>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    min-width="140">
                                <template scope="scope_operate">
                                    <el-button type="text" @click="editinfo=true">编辑</el-button>
                                    <el-button type="text" @click="delete_record=true">删除</el-button>
                                    <el-button type="text" @click="scope_operate.row.withdraw=false" v-show="scope_operate.row.withdraw==true">撤回</el-button>
                                    <el-tag v-show="scope_operate.row.withdraw==false">已撤回</el-tag>
                                </template>
                            </el-table-column>
                        </el-table>


                        <!--删除记录-->
                        <el-dialog type="warning" :visible.sync="delete_record">
                            <p>确定要删除该条用户数据吗？</p>
                            <br>
                            <p class="muted">删除后，可在回收站中查询到该记录</p>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="delete_record = false" type="plain">取 消</el-button>
                                <el-button @click="delete_record = false;deleteRecord();" type="danger">删 除</el-button>
                            </div>
                        </el-dialog>
                    </div>
                    <div class="ver-page mgt50 tcenter">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="10"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="100">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="实例数据" name="second">
                    <el-form :model="form_set" label-width="80px" class="form-service mgt15">
                        <el-form-item label="服务控制">
                            <el-switch
                                v-model="form_set.val_set"
                                on-text="开"
                                off-text="关">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="流量限制">
                            <el-slider
                                :disabled="!form_set.val_set"
                                show-input
                                v-model="form_set.value1"
                                :min="0"
                                :max="10">
                            </el-slider>
                        </el-form-item>
                        <el-form-item label="流量限制">
                            <el-slider
                                :disabled="!form_set.val_set"
                                show-stops
                                v-model="form_set.value2"
                                :min="10"
                                :step="10"
                                :max="100">
                            </el-slider>
                        </el-form-item>
                        <el-form-item label="使用期限">
                            <el-slider
                                :disabled="!form_set.val_set"
                                v-model="form_set.value3"
                                :min="0"
                                :step="10"
                                :client-stops="[0,20,45,50,60,80,100]"
                                :max="100">
                            </el-slider>
                        </el-form-item>
                        <el-form-item class="mgt60">
                            <el-button>保存设置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="组件数据" name="third">
                    <div class="tcenter">暂无数据</div>
                </el-tab-pane>
                <el-tab-pane label="应用数据" name="fourth">
                    <div class="tcenter">暂无数据</div>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        data(){
            return {
                activeTab: 'first',
                intergrate: false,
                share: false,
                delete_record: false,
                editinfo: false,
                form: {
                    //平台
                    platforms:[{
                        value: 'iOS',
                        label: 'iOS'
                    }, {
                        value: 'Android',
                        label: 'Android'
                    }],
                    platform:'',
                    types:[{
                        value: '正式',
                        label: '正式'
                    }, {
                        value: '测试',
                        label: '测试'
                    }],
                    date1:'',
                    date2:'',
                    type:[],
                    certname: '',
                    certpass: '',
                    certlibpass: '',
                    quickcreate: false,
                    validtime:'100',
                },
                form_set: {
                    val_set: true,
                    value1: 20,
                    value2: 10,
                    value3: 30
                },
                table_userinfo: [{
                    name: '李华',
                    regtime: '2011-09-21  08:50:50',
                    status: '使用中',
                    withdraw: true
                }, {
                    name: '王小虎',
                    regtime: '2016-09-21  08:50:50',
                    status: '未激活',
                    withdraw: true
                }, {
                    name: '于珊珊',
                    regtime: '2016-05-21  08:50:50',
                    status: '使用中',
                    withdraw: true
                }, {
                    name: '哈林',
                    regtime: '2016-09-25  08:50:50',
                    status: '使用中',
                    withdraw: true
                }, {
                    name: '吴浩然',
                    regtime: '2013-04-21  14:50:50',
                    status: '已注销',
                    withdraw: true
                }],
                currentPage: 1
            }
        },
        methods: {
            handleOpen() {

            },
            handleClose() {

            },
            handleTabClick() {

            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            },
            handlePreview() {

            },
            handleRemove() {

            },
            handleIconClick() {

            },
            deleteRecord() {
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                });
            }

        }
    }
</script>
