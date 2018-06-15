
<template>
    <div style="width:750px;height: 1334px;">
        <div class="doc" style="margin-top: 40px;margin-bottom: 40px;">
            <text class="title" style="margin-bottom: 30px;">需求：运行任何light命令结束后检查更新</text>
            <text class="desc" style="margin-top:20px;">步骤：在项目根目录执行命令 light, light -v等任何light命令(-b除外)</text>
            <text class="desc" style="margin-top:20px;">验收标准：命令执行完成后显示检查更新结果</text>
        </div>



        
    </div>
</template>
<script>
    export default {
        data(){
            return {
            }
        },
        mounted () {
           

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
