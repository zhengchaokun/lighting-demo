
<template>
    <div style="width:750px;height: 1334px;">
        <div class="doc" style="margin-top: 40px;margin-bottom: 40px;">
            <text class="title" style="margin-bottom: 30px;">需求：清除npm缓存</text>
            <text class="desc" style="margin-top:20px;">步骤：在项目根目录执行命令 light plugin --fix</text>
            <text class="desc" style="margin-top:20px;">验收标准：npm缓存全部清空</text>   
            <text class="desc" style="margin-top:20px;">目录参考：C:\Users\chenljy19172\AppData\Roaming\npm-cache）</text>         
            <text class="desc" style="margin-top:20px;">执行npm config get cache来获取</text>
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
