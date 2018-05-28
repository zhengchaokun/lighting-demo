
<template>
    <div style="width:750px;height: 1334px;">
        <div class="doc" style="margin-top: 40px;margin-bottom: 40px;">
            <text class="title" style="margin-bottom: 30px;">需求：支持jsn工程的自定义build.js</text>
            <text class="desc" style="margin-top:20px;">步骤：执行light release -wb，进入调试模式</text>
            <text class="desc" style="margin-top:20px;">期望：执行build.js，控制台打印出信息</text>   
        </div>
        
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        }
    }
</script>
<style scoped>

.doc {
    padding-left: 40px;
    padding-right: 40px;
}
.title {
    font-size: 36px;
    text-align: center;
}
.desc {
    font-size: 32px;
    text-align: left;
}
</style>
