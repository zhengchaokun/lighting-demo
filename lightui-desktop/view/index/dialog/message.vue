
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <el-button type="success" @click="open2">成功</el-button>
            <el-button type="warning" @click="open3">警告</el-button>
            <el-button type="primary" @click="open">消息</el-button>
            <el-button type="danger" @click="open4">错误</el-button>
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
			title: "消息提示",
			desc: "常用于主动操作后的反馈提示，有四种状态。"
		};
	},
	methods: {
        open() {
            this.$message('这是一条消息提示！');
        },
        open2() {
            this.$message({
                message: '这是一条成功消息！',
                type: 'success'
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
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
}
</style>
