
<template>
    <div style="height: 100%;">
        <top :title="title" :desc="desc"></top>    
        <div class="demo">
			<el-row :gutter="20">
				<el-col :span="12" v-for="(item, index) in card1" :key="index">
					<el-card type="recommend">
						<div slot="header" class="clearfix">
							<span style="line-height: 36px;">{{ item.title }}</span>
							<el-button style="float: right;" type="primary">{{ item.btn }}</el-button>
						</div>
						<div v-for="(o,i) in item.contents" :key="i" class="text item">
							{{ o }}
						</div>
					</el-card>
				</el-col>
			</el-row>


			<el-row :gutter="20" class="mgt40">
				<el-col :span="6" v-for="(item, index) in 4" :key="index">
					<el-card type="comp">
						<div v-for="o in 3" :key="o" class="text item">
							{{'列表内容 ' + o }}
						</div>
					</el-card>
				</el-col>
			</el-row>

            <el-row :gutter="20" class="mgt40">
                <el-col :span="6" v-for="(item, index) in card" :key="index">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="item.src" class="image">
                        <div style="padding: 14px;">
                            <span>{{ item.title }}</span>
                            <div class="bottom clearfix">
                                <time class="time">{{ currentDate }}</time>
                                <el-button type="text" class="button">{{ item.btn }}</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
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
			title: "卡片",
			desc: "将信息聚合在卡片容器中展示，包含标题，内容和操作，可自定义更丰富的内容展示。",
			currentDate: API.formatDateTime(new Date()),
			card1: [
				{
					title: '今日代办事项',
					btn: '编辑',
					contents: [
						'跟客户A确认需求方案', '与客户B开展电话会议', '制定年会采购计划', '筹备开发者大会'
					]
				}, {
					title: '开发者大会代办事项',
					btn: '编辑',
					contents: [
						'预订场地', '采购活动所需物品', '招募志愿者及开展培训', '确认能到场的嘉宾名单'
					]
				}
			],
			card: [
				{
					title: '行情组件',
					src: '../../../images/logo-big.svg',
					btn: '查看详情'
				}, {
					title: '行情组件',
					src: '../../../images/logo-big.svg',
					btn: '查看详情'
				}, {
					title: '行情组件',
					src: '../../../images/logo-big.svg',
					btn: '查看详情'
				}, {
					title: '行情组件',
					src: '../../../images/logo-big.svg',
					btn: '查看详情'
				}
			]
		};
	},
	mounted () {
		console.log(this.currentDate);
	}
};
</script>
<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
  margin-top: 10px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
