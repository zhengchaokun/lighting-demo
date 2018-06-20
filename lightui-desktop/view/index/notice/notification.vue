
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <el-button type="primary" @click="open">不会自动关闭</el-button>
            <el-button type="plain" @click="open2">有标题</el-button>
            <el-button type="danger" @click="open3">带状态</el-button>
            <!-- <el-button type="plain" @click="open4">错误</el-button> -->
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
			title: "通知",
			desc: "常用于系统层面的消息告知，具有主动推送、需要用户确认的特点。"
		};
	},
	methods: {
        open() {
            this.$notify({
                message: '您未实名认证，请进入个人中心处理',
                duration: 0
            });
        },
        open2() {
            this.$notify({
                title: '消息通知',
                message: '您有三条未读消息，请进入个人中心处理',
                duration: 0
            });
        },

        open3() {
            this.$notify({
                title: '系统通知',
                message: '登录异常，请重新登录',
                duration: 0,
                type: 'error',
                customClass: 'w350'
            });
        },

        
	}
};
</script>

<style lang="less" scoped>
.demo {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
}
.w350 {
    width: 350px;
}
</style>
