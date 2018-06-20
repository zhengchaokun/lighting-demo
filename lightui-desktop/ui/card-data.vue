
<template>
    <div class="wrap">
            
        <div class="top">
            <span>{{options.title}}</span>
            <el-popover
                ref="popover"
                placement="top-center"
                :width="options.tooltipWidth?options.tooltipWidth:40"
                trigger="hover"
                :content="options.tooltip">
            </el-popover>
            <i class="el-icon-information" v-popover:popover></i>
            
        </div>
        <div class="card-content">
            <div class="content-title">{{options.data}}</div>
            <div class="content-body">
                <div v-if="options.chart">
                    <chart :style="chartStyle" :options="options.chart"></chart>
                </div>
                <div v-if="options.compare&&!options.compareInFooter" class="compare flex-row">
                    <div v-for="(item,index) in options.compare" :key="index">
                        <span>{{ item.key }}</span>
                        <span>{{ item.value }}</span>
                        <i :class="getClass(item.minus)"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div v-if="options.compare&&options.compareInFooter" class="compare flex-row">
                <div v-for="(item,index) in options.compare" :key="index">
                    <span class="text-lighter">{{ item.key }}</span>
                    <span>{{ item.value }}</span>
                    <i :class="getClass(item.minus)"></i>
                </div>
            </div>
            <div v-if="options.footer">
                <span>{{ options.footer.key }}</span>
                <span>{{ options.footer.value }}</span> 
            </div>
            
            
        </div>
    </div>
</template>
<script>
    import chart from "ligui/lib/utils/charts.js"
    export default {
        components: {
            chart
        },
        props: {
            options: Object,
            src: String,
            title: String,
            content: String,
            desc: String,
            date: String
        },
        data(){
            return {
                chartStyle: {
                    width: '200px',
                    height: '29px'
                }
            };
        },
        methods: {
            getClass(minus) {
                if(minus) {
                    return 'el-icon-caret-bottom text-success'
                } else {
                    return 'el-icon-caret-top text-error'
                }
            }
        },
        created () {
            console.log(this)
        }
    }
</script>
<style lang="less" scoped>

.wrap {
    min-width: 295px;
    height: 205px;
    padding-left: 12px;
    padding-right: 12px;
    margin-bottom: 24px;
    padding: 20px 24px 8px;
    background: #fff;
    border-radius: 2px;
}
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    font-size: 14px;
    color: #909090;
    i {
        width: 24px;
        height: 24px;
        
    }
}
.card-content {
    .content-title {
        font-size: 30px;
    }
    .content-body {
        margin: 20px 0 10px;
    }
}
.compare {
    div {
        margin-right: 20px;
    }
    i {
        font-size: 10px;
    }
}
.footer {
    border-top: solid 1px #eee;
    padding: 10px 0;
}

    
</style>
