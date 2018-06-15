
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="用户名" label-width="50px">
                    <el-input v-model="formInline.user" placeholder="输入用户名查询" class="w200"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" label-width="70px">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="上海" value="shanghai"></el-option>
                    <el-option label="北京" value="beijing"></el-option>
                    <el-option label="杭州" value="hangzhou"></el-option>					
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
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
			title: "行内表单",
			desc:
				"当垂直方向空间受限且表单较简单时，可以在一行内放置表单。多用于检索表格。",
			formInline: {
				user: "",
				region: ""
			}
		};
	},
	methods: {
		onSubmit() {
			this.$message({
				message: '查无此人！',
				type: 'error'
			});
		}
	}
};
</script>

<style lang="less">

</style>
