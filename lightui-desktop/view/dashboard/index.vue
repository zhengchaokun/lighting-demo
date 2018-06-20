
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
                <el-col :xs="24" :sm="24" :md="16" :lg="16">
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
                    <div class="block">
                        <div class="block-head">
                            <span class="block-title">动态</span>
                        </div>
                        <div class="block-body" style="">
                            <el-row :gutter="0">

                                <div style="padding: 0px 24px 8px;">
                                    <div v-for="(act,index) in actionList" :key="index" class="info-list">
                                        <img :src="act.avatar">
                                        <div class="info-list-content">
                                            <p class="mgb10" v-html="act.template">{{ act.user}} {{ act.template }}</p>
                                            <p class="text-muted">{{ act.date }}</p>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </el-row>
                        </div>
                    </div>


                </el-col>
                <el-col :xs="24" :sm="24" :md="8" :lg="8">
                    <div class="block">
                        <div class="block-head">
                            <span class="block-title">快速开始 / 便捷导航</span>
                        </div>
                        <div class="block-body" style="padding: 20px 0px 8px 24px;">
                            <el-row :gutter="20">
                                <el-col class="mgb15" :span="6" v-for="(op,index) in opList" :key="index">
                                    <span class="op-link" @click="operate(op.path)">{{ op.label }}</span>
                                </el-col>
                                <el-col :span="6">
                                    <el-button type="plain" size="mini" icon="plus">添加</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="block">
                        <div class="block-head">
                            <span class="block-title">成长指数</span>
                        </div>
                        <div class="block-body flex-row flex-center" style="padding: 24px;">
                            <div :style="canvas">
                                <chart :options="options" :style="canvas"></chart>
                            </div>
                        </div>
                    </div>
                    <div class="block">
                        <div class="block-head">
                            <span class="block-title">团队</span>
                        </div>
                        <div class="block-body" style="padding: 20px 0px 8px 24px;">
                            <el-row :gutter="30">
                                <el-col class="mgb15" :span="12" v-for="(team,index) in teamList" :key="index">
                                    <div class="flex-row">
                                        <img class="avatar" :src="team.src">
                                        <span class="op-link">{{ team.name }}</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
               
            </el-row>
        </div>
    </div>
</template>
<script>
import card from "../../ui/card-sm.vue";
import chart from "ligui/lib/utils/charts.js";
const options = require('../../mock/chart').radarOptions;
export default {
  	components: {
		card,chart
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
            ],
            actionList: [
                {
                    avatar: 'http://placehold.it/32x32/0AA9F1/FFFFFF/&text=light',
                    user: '管理员',
                    date: '2天前',
                    group: {
                        name: '高逼格设计天团',
                        link: 'http://github.com/',
                    },
                    project: {
                        name: '六月迭代',
                        link: 'http://github.com/',
                    },
                    template: '<a>在</a> <span></span> 新建项目 ${project.name}',

                }
            ],
            teamList: [
                {
                    src: 'http://placehold.it/24x24/0AA9F1/FFFFFF/&text=light',
                    name: '前端组'
                }, {
                    src: 'http://placehold.it/24x24/0AA9F1/FFFFFF/&text=light',
                    name: 'UED'
                }, {
                    src: 'http://placehold.it/24x24/0AA9F1/FFFFFF/&text=light',
                    name: '平台组'
                }, {
                    src: 'http://placehold.it/24x24/0AA9F1/FFFFFF/&text=light',
                    name: '终端组'
                }, {
                    src: 'http://placehold.it/24x24/0AA9F1/FFFFFF/&text=light',
                    name: '产品组'
                }, {
                    src: 'http://placehold.it/24x24/0AA9F1/FFFFFF/&text=light',
                    name: '测试组'
                }
            ],
            options: options,
            canvas: {
                width: '340px',
                height: '300px'
            }
           
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
.mgb15 {
    margin-bottom: 15px;
}
.op-link {
    cursor: pointer;
    &:hover {
        color: #0AA9F1;
    }
}
.avatar {
    border-radius: 50%;
    margin-right: 15px;
}
.page-head {
    min-width: 760px;
    height: 150px;
    padding: 15px 30px;
    border-bottom: 1px solid #D2D9E3;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #fff;

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
            .block-title {
                font-weight: 500;
            }
            .block-head-btn {
                font-size: 14px;
                color: #0AA9F1;
            }
        }
    }
}
.info-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 0;
    border-bottom: solid 1px #D2D9E3;
    img {
        border-radius: 50%;
        margin-right: 20px;
    }
    .info-list-content {
        width: 80%;
        
    }
}
</style>
