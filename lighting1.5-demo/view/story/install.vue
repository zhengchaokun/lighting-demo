
<template>
    <div style="width:750px;height: 1334px;">
        <div class="doc" style="margin-top: 40px;margin-bottom: 40px;">
            <text class="title" style="margin-bottom: 30px;">需求：light install命令安装插件和项目依赖</text>
            <text class="desc" style="margin-bottom: 20px;">步骤：在项目根目录执行命令 light install</text>
            <text class="desc" style="margin-bottom: 20px;">验收标准：插件（type-vue,jsnative,native）和依赖（weex-ui,lighting-ui）全部安装成功，可执行light plugin --list 查看插件列表</text>
            <text class="desc" style="margin-bottom: 20px;">插件目录参考：C:\Users\chenljy19172\.lighting-plugins\node_modules；依赖目录：node_modules或lib/node_modules</text>   
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
