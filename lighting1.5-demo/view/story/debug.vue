
<template>
    <div style="width:750px;height: 1334px;">
        <div class="doc" style="margin-top: 40px;margin-bottom: 40px;">
            <text class="title" style="margin-bottom: 30px;">需求：支持jsn指定视图进行调试</text>
            <text class="desc" style="margin-bottom: 20px;">步骤：在项目根目录执行命令 light release -wb，打开调试窗口，分别在浏览器地址栏后面输入 /#/story/dom，刷新页面，用lightView进行调试</text>
            <text class="desc" style="margin-bottom: 20px;">验收标准：正确显示 #/story/dom 视图</text>   
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
