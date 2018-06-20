
<template>
    <div style="height: 100%;">
        <div class="page-head">
            <div class="page-head-left">
                <img class="page-avatar" src="http://placehold.it/72x72/000000/FFFFFF/&text=HelloWord">
                <div class="page-hello">
                    <p class="hello">{{helloText}}，{{user.nickname}}，祝你开心每一天。</p>
                    <p class="info">{{ user.job }} | {{ user.company }}－{{ user.department }}－{{user.team_name}}</p>
                </div>
            </div>
            <div class="page-head-right">
                <div class="page-head-right-item">
                    <p class="title">项目数</p>
                    <p class="num">{{ user.count_project }}</p>
                </div>
                <div class="page-head-right-item">
                    <p class="title">团队内排名</p>
                    <p class="num"><span>{{ user.ranking }}</span><span class="ranking">/{{ user.team_count }}</span></p>
                </div>
                <div class="page-head-right-item">
                    <p class="title">项目访问数</p>
                    <p class="num">{{ user.count_preview }}</p>
                </div>
            </div>
        </div>
        <div class="page-body">
            <el-row :gutter="0">
                <el-col :xs="24" :sm="24" :md="24" :lg="18">
                    <div class="block">
                        <div class="block-head">
                            <span class="block-title">进行中的项目</span>
                            <span class="block-head-btn">全部项目</span>
                        </div>
                        <div class="block-body">
                            <el-row>
                                <el-col :span="8" v-for="(option,index) in cardList" :key="index">
                                    <card :options="option"></card>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="6">
                    <div class="block">
                        <div class="block-head">
                            <span class="block-title">快速开始 / 便捷导航</span>
                        </div>
                        <div class="block-body">
                            <el-row :gutter="15">
                                <el-col :span="8" v-for="(op,index) in opList" :key="index">
                                    <span class="link" @click="operate(op.path)">{{ op.label }}</span>
                                </el-col>
                                <el-col :span="8">
                                    <el-button type="plain" icon="plus">添加</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="18"><div class="block bg-purple" style="height:900px">3</div></el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="6"><div class="block bg-purple-light">4</div></el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="6"><div class="block bg-purple-light">5</div></el-col>            
            </el-row>
        </div>
    </div>
</template>
<script>
import top from "../../../ui/top.vue";
import card from "../../../ui/card-sm.vue";
export default {
  	components: {
		top,card
	},
  	data() {
		return {
            now: new Date(),
            user: {
                nickname: 'light管理员',
                count_project: 84,
                ranking: 7,
                team_count: 28,
                count_preview: 2333,
                job: '前端工程师',
                company: '恒生电子',
                department: '研发中心',
                team_name: 'Light团队'

            },
            cardList: [
                {
                    src: 'http://placehold.it/24x24/0AA9F1/FFFFFF/&text=light',
                    title: 'lightUI',
                    content: '发我很难合肥合伙和东方红',
                    desc: 'asiaapu',
                    date: '20小时前'
                },{
                    src: 'http://placehold.it/24x24/0AA9F1/FFFFFF/&text=light',
                    title: 'lightUI',
                    content: '发我很难合肥合伙和东方红',
                    desc: 'asiaapu',
                    date: '20小时前'
                },{
                    src: 'http://placehold.it/24x24/0AA9F1/FFFFFF/&text=light',
                    title: 'lightUI',
                    content: '发我很难合肥合伙和东方红',
                    desc: 'asiaapu',
                    date: '20小时前'
                },{
                    src: 'http://placehold.it/24x24/0AA9F1/FFFFFF/&text=light',
                    title: 'lightUI',
                    content: '发我很难合肥合伙和东方红',
                    desc: 'asiaapu',
                    date: '20小时前'
                },{
                    src: 'http://placehold.it/24x24/0AA9F1/FFFFFF/&text=light',
                    title: 'lightUI',
                    content: '发我很难合肥合伙和东方红',
                    desc: 'asiaapu',
                    date: '20小时前'
                },{
                    src: 'http://placehold.it/24x24/0AA9F1/FFFFFF/&text=light',
                    title: 'lightUI',
                    content: '发我很难合肥合伙和东方红',
                    desc: 'asiaapu',
                    date: '20小时前'
                }
            ],
            opList: [
                {
                    label: '我的订单',
                    path: ''
                }, {
                    label: '我的消息',
                    path: ''
                }, {
                    label: '统计信息',
                    path: ''
                }, {
                    label: '我的订单',
                    path: ''
                }, {
                    label: '我的订单',
                    path: ''
                }, {
                    label: '我的订单',
                    path: ''
                }
            ]
           
		};
    },
    computed: {
        helloText() {
            let hour = this.now.getHours();
            if(5 < hour < 9) {
                return '早上好'
            } else if(9 < hour < 12) {
                return '上午好'
            } else if(12 < hour < 14) {
                return '中午好'
            } else if(14 < hour < 18) {
                return '下午好'
            } else {
                return '晚上好'
            }
        }
    },
	methods: {
        
        
       

        
	}
};
</script>

<style lang="less" scoped>
* {
    box-sizing: border-box;
}

.page-head {
    height: 150px;
    padding: 15px 30px;
    border-bottom: 1px solid #D2D9E3;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .page-head-left {
        display: flex;
        align-items: center;
        width: 60%;
        .page-avatar {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            margin-right: 20px;
        }
        .page-hello {
            .hello {
                font-size: 18px;
                line-height: 28px;
                font-weight: 500;
                color: #303030;
                margin-bottom: 12px;
            }
            .info {
                color: #606060;
                line-height: 24px;
            }
            
        }
    }
    .page-head-right {
        width: 40%;
        display: flex;
        align-items: center;
        .page-head-right-item {
            padding: 0 15px;
            .title {
                color: #909090;
                font-size: 14px;
                line-height: 22px;
                margin-bottom: 4px;
            }
            .num {
                color: #303030;
                font-size: 24px;
                line-height: 38px;
                .ranking {
                    font-size: 20px;
                    color: #909090;
                }
            }
            &:nth-child(2) .num {
                display: flex;
            }
        }
    }
}
.page-body {
    .block {
        margin: 20px;
        background: #fff;
        border: solid 1px #D2D9E3;
        border-radius: 2px;
        .block-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 56px;
            border-bottom: solid 1px #D2D9E3;
            padding: 0 15px;
            font-size: 16px;
            .block-head-btn {
                font-size: 14px;
                color: #0AA9F1;
            }
        }
    }
}
</style>
