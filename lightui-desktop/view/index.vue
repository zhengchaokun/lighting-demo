<template>
    <div style="height:100%">
        <div class="sidebar folded">
            <a class="sidebar-top" href="http://ui.lightyy.com/#/index">
                <div class="logo">
                </div>
            </a>
            <div class="sidebar-menu">
                <ul class="menu-list">
                    <li v-for="(menu,index) in menus" :key="index" @click="toggleActive(menu,$event)" :class="{'actived':currentSystem==menu.index}" v-show="isShow(menu)">
                        <span class="icon" :class="{'icon-system': menu.index==0,'icon-yunwei': menu.index==1,'icon-yunying': menu.index==2}"></span><span class="text-span">{{menu.title}}</span>
                    </li>
                </ul>
            </div>

            <div class="sidebar-bottom">
                <div class="toggle-fold" @click="toggleFold">
                    <span></span>
                    <span class="text-span">收起侧边栏</span>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="nav">
                <span class="nav-icon"><img src="images/bread-icon-20.svg"/></span>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item class="nav-text text-gray" :to="{ path: '/' }">桌面</el-breadcrumb-item>
                    <el-breadcrumb-item class="nav-text text-gray" v-for="(nav, index) in navList" :key="index" :to="{ path: nav.path }">{{nav.title}}</el-breadcrumb-item>
                </el-breadcrumb>

                <el-dropdown class="fright" @command="handleNavigate">
                    <span class="el-dropdown-link">
                        <a class="user-menu">
                            <img src="images/user-icon.png" />
                        </a>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="userinfo-dropdown">
                        <el-dropdown-item class="dropdown-menu-top">{{user.nickName}}</el-dropdown-item>
                        <div class="line line-menu"></div>
                        <el-dropdown-item><a><span class="menu-icon icon-order"></span>我的订单<el-badge :value="user.un_process_orders>99?'…':user.un_process_orders"></el-badge></a></el-dropdown-item>
                        <el-dropdown-item><a><span class="menu-icon icon-message"></span>我的消息<el-badge :value="user.un_read_message>99?'…':user.un_read_message"></el-badge></a></el-dropdown-item>
                        <div class="line line-menu"></div>
                        <el-dropdown-item><a><span class="menu-icon icon-setting"></span>个人设置</a></el-dropdown-item>
                        <el-dropdown-item><a><span class="menu-icon icon-openapi"></span>OPENAPI接入</a></el-dropdown-item>
                        <el-dropdown-item><a><span class="menu-icon icon-label"></span>标签管理</a></el-dropdown-item>
                        <div class="line line-menu"></div>
                        <el-dropdown-item><a><span class="menu-icon icon-exit"></span>退出</a></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div style="height: 100%;">
                <router-view></router-view>
            </div>
            
        </div>
    </div>
</template>
<script>
    import App from "light"
    // import API from 'api'
    import menus from "menus"
    export default {
        data: function () {
            return {
                userName: '',
                currentSystem: -1,
                activeTab: '',
                menus: menus,
                navList:[{title:'',path:''},{title:'',path:''}],
                isSessionTimeout: false,
                user: {
                    nickName: 'Light',
                    un_process_orders: 2,
                    un_read_message: 8
                },
            }
        },
        watch: {
            '$route': function(val){
                this.changeCurSystem(val);
            },
            'currentSystem': function(value){
                if(value == 0){
                    this.navList[0] = {title:'控制台', path:'/index/dashboard/index'}
                }
                if(value == 1){
                    this.navList[0] = {title:'全局用法', path:'/index/basic/layout'}
                }
                if(value == 2){
                    this.navList[0] = {title:'导航页', path:'/index/nav/menu'}
                }
                if(value == 3){
                    this.navList[0] = {title:'表单页', path:'/index/form/basic'}
                }
                if(value == 4){
                    this.navList[0] = {title:'表格页', path:'/index/table/basic'}
                }
                 if(value == 5){
                    this.navList[0] = {title:'弹框页', path:'/index/dialog/message'}
                }
                if(value == 6){
                    this.navList[0] = {title:'卡片页', path:'/index/card/basic'}
                }
                if(value == 7){
                    this.navList[0] = {title:'异常页', path:'/index/error/403'}
                }
            }
        },
        methods: {
            /* 点击一级菜单 */
            toggleActive(menu, event){
                this.currentSystem = menu.index;
                App.navigate('#'+menu.options[0].path, {});
                
            },
            /* 展开侧边栏 */
            toggleFold() {
                let sidebar = document.getElementsByClassName('sidebar')[0];
                sidebar.classList.toggle('folded');
            },
            changeCurSystem(router) {
                if(router.path.indexOf('/index/dashboard') > -1){
                    this.currentSystem = 0;
                }
                if(router.path.indexOf('/index/basic') > -1){
                    this.currentSystem = 1;
                }
                if(router.path.indexOf('/index/nav') > -1){
                    this.currentSystem = 2;
                }
                if(router.path.indexOf('/index/form') > -1){
                    this.currentSystem = 3;
                }
                if(router.path.indexOf('/index/table') > -1){
                    this.currentSystem = 4;
                }
                if(router.path.indexOf('/index/dialog') > -1){
                    this.currentSystem = 5;
                }
                if(router.path.indexOf('/index/card') > -1){
                    this.currentSystem = 6;
                }
                if(router.path.indexOf('/index/error') > -1){
                    this.currentSystem = 7;
                }
            },
            handleNavigate(value){
               if(value === "logout"){
                   this.logout();
               }else{
                   if(value){
                       App.navigate(value,{})
                   }
               }
            },
            // logout(){
            //     API.logout()
            //     .then(data => {
            //         window.location.reload();
            //     })
            //     .catch(err => {
            //         window.location.reload();
            //     })
            // },
            isShow(menu){
                return true;
                // if(menu.index == 0){
                //     // if(API.loginInfo && API.loginInfo.oper_type == 1){
                //     //     return true;
                //     // }else{
                //     //     return false;
                //     // }
                //     return false
                // }else{
                //     return true;
                // }
            }
        },
        created(){
            let _this = this;
            App.on('navChange', function(val){
                if(val){
                    _this.navList.splice(1,1,val);
                }else{
                    _this.navList.splice(1,1);
                }
            })
            App.on('nav2Change', function(val){
                if(val){
                    _this.navList.splice(2,1,val);
                }else{
                    _this.navList.splice(2,1);
                }
            })
        //     App.on('error', function(){
        //         if(_this.isSessionTimeout == true){
        //             return;
        //         }else{
        //             let h = _this.$createElement;
        //             _this.$msgbox({
        //                 title: '错误',
        //                 message: h('p', {style: 'text-align:center'}, [
        //                     h('h3', null, '登录已失效，请重新登录')
        //                 ]),
        //                 confirmButtonText: '确定'
        //             }).then(action => {
        //                 _this.logout();
        //             })

        //             _this.isSessionTimeout = true;
        //         }
        //     })
        },
        mounted(){
            let _this = this;
            // this.userName =  API.loginInfo.oper_no;
            this.changeCurSystem(this.$route);
        }
    }
</script>

<style>
    .cell .el-icon-more{
        color: #0AA9F1;
    }

    .el-message-box__btns button:nth-child(2) {
        margin-left: 0px;
    }
</style>