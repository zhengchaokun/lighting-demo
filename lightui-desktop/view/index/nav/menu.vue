
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <el-row class="w100">
                <el-col :span="18">
                    <el-menu :theme="theme" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="1">组件案例</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">处理中心</template>
                            <el-menu-item index="2-1">监控页</el-menu-item>
                            <el-menu-item index="2-2">分析页</el-menu-item>
                            <el-menu-item index="2-3">工作台</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="3"><a href="http://ui.lightyy.com/#/index" target="_blank">lightUI</a></el-menu-item>
                        <el-menu-item index="4">文档</el-menu-item>
                        <el-menu-item index="5">社区</el-menu-item>                        
                        <el-menu-item index="6">点击换肤</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            <el-row class="w100 mgt40" :gutter="0">
                <el-col :span="6">
                    <h4>带 icon</h4>                    
                    <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo mgt20" @open="handleOpen" @close="handleClose">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>导航一</template>
                            <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
                        <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="6">
                    <h4>不带 icon</h4>
                    <el-menu default-active="2" class="el-menu-vertical-demo mgt20" @open="handleOpen" @close="handleClose" theme="dark">
                        <el-submenu index="1">
                            <template slot="title">导航一</template>
                            <el-menu-item-group title="分组一">
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2">导航二</el-menu-item>
                        <el-menu-item index="3">导航三</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="6">
                    <h4>分组</h4>
                    <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo mgt20">
                        <el-menu-item-group title="分组一">
                            <el-menu-item index="1"><i class="el-icon-message"></i>导航一</el-menu-item>
                            <el-menu-item index="2"><i class="el-icon-message"></i>导航二</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组二">
                            <el-menu-item index="3"><i class="el-icon-message"></i>导航三</el-menu-item>
                            <el-menu-item index="4"><i class="el-icon-message"></i>导航四</el-menu-item>
                        </el-menu-item-group>
                    </el-menu>
                </el-col>
            </el-row>

            <el-row class="w100 mgt40">
                <el-col :span="6">
                    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                        <el-radio-button :label="false">展开</el-radio-button>
                        <el-radio-button :label="true">收起</el-radio-button>
                    </el-radio-group>
                    <el-menu :default-active="activeIndex3" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                <span slot="title">导航一</span>
                            </template>
                            <el-menu-item-group>
                                <span slot="title">分组一</span>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <span slot="title">选项4</span>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
            

            

            
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
			title: "导航菜单",
            desc: "为网站提供导航功能的菜单。",
            theme: "",
            activeIndex: '1',
            activeIndex2: '1',
            activeIndex3: '1-4-1',
            
            isCollapse: true
		};
	},
	methods: {
        changeStyle() {
            if(this.theme == "") {
                this.theme = "dark";
            } else {
                this.theme = "";
            }
        },
        handleSelect(key, keyPath) {
            if(key == 6) {
                this.changeStyle();
            }
        },
        open() {
            this.$message('这是一条消息提示！');
        },
        open2() {
            this.$message({
                message: '这是一条成功消息！',
                type: 'success'
            });
        },
         handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }

        
	}
};
</script>

<style lang="less" scoped>
.demo {
    // flex-direction: row;
    // justify-content: center;
    // align-items: flex-start;
}
</style>
