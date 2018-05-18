
<template>
    <div style="width:750px;height: 1334px;">
        <div class="doc" style="margin-top: 40px;margin-bottom: 40px;">
            <text class="title" style="margin-bottom: 30px;">需求：针对不同浏览器给css属性增加前缀</text>
            <text class="desc" style="margin-top:20px;">验收标准：F12打开控制台，检查元素，transform属性已经自动增加了前缀</text>
        </div>
        <div class="demo">
            <div class="block">
                <text class="text">transform属性</text>
            </div>
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
.block {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    height: 100px;
}

.text {
    font-size: 16px;
    transform: scale(1.5);
    text-align: center;
    transition: transform 1s ease;
}

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
