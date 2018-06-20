
<template>
    <div style="height: 100%;">
        <div class="card-wrap">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="12" :lg="6" v-for="(card,index) in dataList" :key="index">
                    <card-data :options="card"></card-data>
                </el-col>
            </el-row>
        </div>
		<div class="pos-r">
			<el-tabs v-model="activeName">
				<el-tab-pane label="销售额" name="first">
					<el-row>
						<el-col :span="18">
							<h3>销售额趋势</h3>
							<chart :options="trendOptions"></chart>
						</el-col>
						<el-col :span="6">
							<h3>门店销售额排名</h3>
							<list :list="rankList" :has-index="hasIndex"></list>
						</el-col>
					</el-row>
				</el-tab-pane>
				<el-tab-pane label="访问量" name="second">

				</el-tab-pane>
			</el-tabs>
			<el-date-picker
				class="tab-picker"      
				v-model="date"
				type="daterange"
				align="right"
				placeholder="选择日期范围"
				:picker-options="pickerOptions">
			</el-date-picker>

		
		</div>

		<div class="page-body">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <div class="block">
                        <div class="block-head">
                            <span class="block-title">线上热门搜索</span>
                            <span class="block-head-btn">操作</span>
                        </div>
                        <div class="block-body">
							<div>
								<el-row>
									<!-- <el-col :span="8" v-for="(option,index) in cardList" :key="index">
										<card :options="option"></card>
									</el-col> -->
								</el-row>
							</div>
							<div>
								<el-table :data="tableData" style="width: 100%">
									<el-table-column
										prop="ranking"
										label="排名"
										min-width="50">
									</el-table-column>
									<el-table-column
										prop="keyword"
										label="搜索关键词"
										min-width="100">
									</el-table-column>
									<el-table-column
										sortable
										prop="count"
										label="用户数"
										min-width="60">
									</el-table-column>
									<el-table-column
										sortable
										prop="range"
										label="周涨幅"
										min-width="60">
										<template scope="scope">
											<div class="flex-row justify-end">
												<span>{{Math.abs(scope.row.range)}}%</span>
												<i :class="getClass(scope.row.range)"></i>
											</div>
											
										</template>
									</el-table-column>
								</el-table>
								<el-pagination
									class="small-page"
									@size-change="handleSizeChange"
									@current-change="handleCurrentChange"
									:current-page="currentPage"
									:page-size="pageSize"
									layout="prev, pager, next"
									:total="total">
								</el-pagination>
							</div>
                            
                        </div>
                    </div>
                </el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12">
					<div class="block">
                        <div class="block-head block-head-lg">
							<div class="flex-row">
								<span class="block-title">销售额类别占比</span>
								<span class="block-head-btn">操作</span>
							</div>
							<div>
								<el-radio-group v-model="radio" @change="handleRadioChange">
									<el-radio-button label="全部渠道"></el-radio-button>
									<el-radio-button label="线上"></el-radio-button>
									<el-radio-button label="门店"></el-radio-button>
								</el-radio-group>
							</div>
                        </div>
                        <div class="block-body">
							<div style="width:300px;height: 400px;">
								<chart :options="pieOptions[radioIndex]" style="width:300px;height: 200px;"></chart>
							</div>
                        </div>
					</div>

				</el-col>
            </el-row>
		</div>
    </div>
</template>
<script>
import Card from "../../ui/card.vue";
import CardSm from "../../ui/card-sm.vue";
import CardData from "../../ui/card-data.vue";
import list from "../../ui/list.vue";

import chart from "ligui/lib/utils/charts.js";

const options = require("../../mock/chart").radarOptions;
const pieOptions = require("../../mock/chart").pieOptions;
const searchData = require("../../mock/table").searchData;

export default {
  	components: {
		Card,
		CardSm,
		CardData,
		chart,
		list
	},
	data() {
		return {
			dataList: [
				{
				title: "日销售额",
				tooltip: "日销售额",
				data: "￥126,560",
				compare: [
					{
					key: "周同比",
					value: "12%",
					minus: false
					},
					{
					key: "日环比",
					value: "6%",
					minus: true
					}
				],
				footer: {
					key: "日均销售额",
					value: "￥12,432"
				}
				},
				{
				title: "访问量",
				tooltip: "访问量",
				data: "8,846",
				chart: {
					xAxis: {
					type: "category",
					boundaryGap: false,
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
					},
					yAxis: {
					type: "value"
					},
					series: [
					{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: "line",
						areaStyle: {},
						smooth: true
					}
					]
				},
				footer: {
					key: "日访问量",
					value: "12,44"
				}
				},
				{
				title: "支付笔数",
				tooltip: "支付笔数",
				data: "6,560",
				chart: {
					xAxis: {
					type: "category",
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
					},
					yAxis: {
					type: "value"
					},
					series: [
					{
						data: [120, 200, 150, 80, 70, 110, 130],
						type: "bar"
					}
					]
				},
				footer: {
					key: "转化率",
					value: "65%"
				}
				},
				{
				title: "产品普及率",
				tooltip: "产品普及率",
				data: "45%",
				chart: {
					tooltip: {
					trigger: "item",
					formatter: "{b} : {d}%"
					},
					series: [
					{
						type: "pie",
						radius: "65%",
						center: ["50%", "50%"],
						selectedMode: "single",
						data: [
						{
							value: 45,
							name: "杭州"
						},
						{ value: 5, name: "上海" },
						{ value: 10, name: "北京" },
						{ value: 34, name: "深圳" },
						{ value: 6, name: "南京" }
						],
						itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: "rgba(0, 0, 0, 0.5)"
						}
						}
					}
					]
				},
				compareInFooter: true,
				compare: [
					{
					key: "周同比",
					value: "12%",
					minus: false
					},
					{
					key: "日环比",
					value: "5%",
					minus: true
					}
				]
				}
			],
			date: '',
			activeName: 'first',
			pickerOptions: {
				shortcuts: [
					{
					text: '最近一周',
					period: 7,
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick',[start, end, '最近一周']);
					}
				}, {
					text: '最近一个月',
					period:30,       
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					picker.$emit('pick', [start, end, '最近一个月']);
					}
				}, {
					text: '最近三个月',
					period: 90,
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
					picker.$emit('pick', [start, end, '最近三个月']);
					}
				}]
			},
			trendOptions: {
				xAxis: {
					type: 'category',
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月']
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: [1100, 200, 150, 800, 750, 333, 434, 999, 789, 260, 420, 744],
					type: 'bar'
				}]
			},
			hasIndex: true,
			rankList: [
				{
					title: '江南大道 1号店',
					desc: '112,800'
				}, {
					title: '江南大道 2号店',
					desc: '112,086'
				}, {
					title: '江南大道 3号店',
					desc: '110,395'
				}, {
					title: '江南大道 4号店',
					desc: '921,99'
				}, {
					title: '江南大道 5号店',
					desc: '906,802'
				}, {
					title: '江南大道 6号店',
					desc: '726,95'
				}, {
					title: '江南大道 7号店',
					desc: '214,04'
				}
			],
			radio: '全部渠道',
			pieOptions: pieOptions,
			radioIndex: 0,
			totalData: searchData,
			tableData: [],
			currentPage: 1,
			pageSize: 5,


		};
	},
	computed: {
		total() {
			return this.totalData.length;
		}
	},
	methods: {
		getClass(num) {
			if(num<0) {
				return 'el-icon-caret-bottom text-success mgl8'
			} else {
				return 'el-icon-caret-top text-error mgl8'
			}
		},
		handleRadioChange(val) {
			console.log(val);
			if(val=='全部渠道') {
				this.radioIndex = 0;
			} else if(val=='线上') {
				this.radioIndex = 1;
			} else {
				this.radioIndex = 2;
			}
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageSize = val;
			this.tableData = this.totalData.slice(val*(this.currentPage-1), this.currentPage*val);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.currentPage = val;
			this.tableData = this.totalData.slice(this.pageSize*(val-1), this.pageSize*val);
		},
	},
	created () {
		this.tableData = this.totalData.slice(0, this.pageSize);
	},
  	mounted() {
    //   console.log(Light);
  	}
};
</script>
<style lang="less" scoped>
.card-wrap {
  padding: 20px;
}
.tab-picker {
  position: absolute;
  right: 0;
  top: 0;
}
.page-body .block .block-head {
	&.block-head-lg {
		height: 103px;
		display: block;
		flex-direction: column;
		& > div:first-child {
			line-height: 56px;
			justify-content: space-between;
		}
	}
}
.small-page {
	margin: 20px 0;
	min-width: 200px;
}

</style>
