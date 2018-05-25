
<template>
    <div style="width:750px;height: 1334px;">
        <div class="doc" style="margin-top: 40px;margin-bottom: 40px;">
            <text class="title" style="margin-bottom: 30px;">需求：在vue中注入light变量</text>
            <text class="desc" style="margin-top:20px;">步骤：点击按钮</text>
            <text class="desc" style="margin-top:20px;">成功跳转至首页(this.$light调用navigate方法)</text>   
        </div>
        <div class="demo">
            <lc-button class="button" text="返回首页" @wxcButtonClicked="back"></lc-button>
        </div>
    </div>
</template>
<script>
    import LcButton from 'lighting-ui/packages/lc-button';
    export default {
        components: {
            LcButton
        },
        data(){
            return {}
        },
        methods: {
            back() {
                console.log(this.$light);
                this.$light.navigate("#/index");
            }
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
.button {
    margin-left: 24px;
    margin-top: 100px;
}
</style>
