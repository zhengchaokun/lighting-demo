
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <el-tabs v-model="activeName">
                <el-tab-pane label="fade 淡入淡出" name="first">
                    <el-row :gutter="20" type="flex">
                        <el-col :span="24">
                            <div class="mgt20">
                                <span>显示</span>
                                <el-switch
                                    v-model="show"
                                    on-text=""
                                    off-text=""
                                    on-color=""
                                    off-color="">
                                </el-switch>
                            </div>
                            
                            <div style="display: flex; margin-top: 20px; height: 100px;">
                                <transition name="el-fade-in-linear">
                                    <div v-show="show" class="transition-box">el-fade-in-linear</div>
                                </transition>
                                <transition name="el-fade-in">
                                    <div v-show="show" class="transition-box">el-fade-in</div>
                                </transition>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="zoom 缩放" name="second">
                    <el-row :gutter="20" type="flex">            
                        <el-col :span="24">
                            <div class="mgt20">
                                <span>显示</span>
                                <el-switch
                                    v-model="show2"
                                    on-text=""
                                    off-text=""
                                    on-color=""
                                    off-color="">
                                </el-switch>
                            </div>

                            <div style="display: flex; margin-top: 20px; height: 100px;">
                                <transition name="el-zoom-in-center">
                                    <div v-show="show2" class="transition-box">el-zoom-in-center</div>
                                </transition>

                                <transition name="el-zoom-in-top">
                                    <div v-show="show2" class="transition-box">el-zoom-in-top</div>
                                </transition>

                                <transition name="el-zoom-in-bottom">
                                    <div v-show="show2" class="transition-box">el-zoom-in-bottom</div>
                                </transition>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="collapse 展开折叠" name="third">
                    <el-row :gutter="20" type="flex">            
                        <el-col :span="12">
                            <div class="mgt20">
                                <span>显示</span>
                                <el-switch
                                    v-model="show3"
                                    on-text=""
                                    off-text=""
                                    on-color=""
                                    off-color="">
                                </el-switch>
                            </div>

                            <div style="display: flex; margin-top: 20px; height: 250px;">
                                <el-collapse-transition>
                                    <div v-show="show3">
                                        <div class="transition-box">el-collapse-transition</div>
                                        <div class="transition-box">el-collapse-transition</div>
                                    </div>
                                </el-collapse-transition>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            
            
            
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
			title: "过渡动画",
            desc: "Ligui 内应用在部分组件的过渡动画，你也可以直接使用。与 Vue 内置过渡动画类似。",
            show: true,
            show2: true,
            show3: true,
            activeName: 'first'
		};
    },
	methods: {
        
        
       

        
	}
};
</script>

<style lang="less" scoped>
.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #20A0FF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
}
.el-row {
    width: 100%;
}
.el-tabs {
    width: 80%;
}
</style>
