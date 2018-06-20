
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <el-row :gutter="20" class="w100">
                <el-col :span="12">
                    <el-alert
                        title="成功提示的文案"
                        type="success">
                    </el-alert>
                    <el-alert
                        title="消息提示的文案"
                        type="info">
                    </el-alert>
                    <el-alert
                        title="警告提示的文案"
                        type="warning">
                    </el-alert>
                    <el-alert
                        title="错误提示的文案"
                        type="error">
                    </el-alert>
                </el-col>

                <el-col :span="12">
                    <el-alert
                        title="不可关闭的 alert"
                        type="success"
                        :closable="false">
                    </el-alert>
                    <el-alert
                        title="自定义 close-text"
                        type="info"
                        close-text="知道了">
                    </el-alert>
                    <el-alert
                        title="设置了回调的 alert"
                        type="warning"
                        @close="hello">
                    </el-alert>
                    <el-alert
                        title="错误提示的文案"
                        type="error">
                    </el-alert>
                </el-col>
            </el-row>

            <el-row :gutter="20" class="w100 mgt40">

                <el-col :span="12">
                    <el-alert
                        title="成功提示的文案"
                        type="success"
                        show-icon>
                    </el-alert>
                    <el-alert
                        title="消息提示的文案"
                        type="info"
                        show-icon>
                    </el-alert>
                    <el-alert
                        title="警告提示的文案"
                        type="warning"
                        show-icon>
                    </el-alert>
                    <el-alert
                        title="错误提示的文案"
                        type="error"
                        show-icon>
                    </el-alert>
                </el-col>

                <el-col :span="12">
                    <el-alert
                        title="成功提示的文案"
                        type="success"
                        description="文字说明文字说明文字说明文字说明文字说明文字说明"
                        show-icon>
                    </el-alert>
                    <el-alert
                        title="消息提示的文案"
                        type="info"
                        description="文字说明文字说明文字说明文字说明文字说明文字说明"
                        show-icon>
                    </el-alert>
                    <el-alert
                        title="警告提示的文案"
                        type="warning"
                        description="文字说明文字说明文字说明文字说明文字说明文字说明"
                        show-icon>
                    </el-alert>
                    <el-alert
                        title="错误提示的文案"
                        type="error"
                        description="文字说明文字说明文字说明文字说明文字说明文字说明"
                        show-icon>
                    </el-alert>
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
			title: "重要提示",
			desc: "常用于标记页面中着重警示告知的内容。"
		};
	},
	methods: {
        open() {
            this.$notify({
                message: '您未实名认证，请进入个人中心处理',
                duration: 0
            });
        },
        hello() {
            this.$message({
                message: '这是一条成功消息！',
                type: 'info'
            });
        },

        open3() {
            this.$message({
            message: '这是一条警告消息！',
            type: 'warning'
            });
        },

        open4() {
            this.$message.error('这是一条错误消息！');
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
