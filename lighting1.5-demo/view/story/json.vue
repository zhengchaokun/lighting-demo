
<template>
    <div style="width:750px;height: 1334px;">
        <div class="doc" style="margin-top: 40px;margin-bottom: 40px;">
            <text class="title" style="margin-top:30px;">需求：打包native项目生成的包里，.gmu文件自动格式化</text>
            <text class="desc" style="margin-top:20px;">步骤：在项目根目录执行命令 light release -p，打包好后解压缩包</text>
            <text class="desc" style="margin-top:20px;">验收标准：App\Resource\gmu目录下的.gmu文件自动格式化（不显示为一行）</text>   
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
