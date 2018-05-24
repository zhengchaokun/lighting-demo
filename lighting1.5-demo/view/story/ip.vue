
<template>
    <div style="width:750px;height: 1334px;">
        <div class="doc" style="margin-top: 40px;margin-bottom: 40px;">
            <text class="title" style="margin-bottom: 30px;">需求：优先以本机ip打开调试窗口</text>
            <text class="desc" style="margin-top:20px;">步骤：在cmd窗口执行 ipconfig，得到本地ip，编译项目打开调试窗口；电脑打开wifi，重复以上步骤。</text>
            <text class="desc" style="margin-top:20px;">验收标准：打开的调试窗口地址与本地ip相符</text>         
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
