
<template>
    <div style="width:750px;height: 1334px;">
        <div class="doc" style="margin-top: 40px;margin-bottom: 40px;">
            <text class="title" style="margin-bottom: 30px;">需求：支持node_modules目录出现在项目根目录</text>
            <text class="desc" style="margin-top:20px;">验收标准：项目成功编译，按钮正常显示</text>
        </div>
        <div class="demo">
            <wxc-button style="margin-bottom:30px;" class="button" text="引用 根目录/node_modules"></wxc-button>
            <lc-button class="button" type="normal" text="引用 lib/node_modules"></lc-button>
        </div>
        
    </div>
</template>
<script>
    import WxcButton from 'weex-ui/packages/wxc-button';
    import LcButton from "lighting-ui/packages/lc-button";

    export default {
        components: {
            WxcButton,
            LcButton
        },
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
.demo {
    align-items: center;
    margin-top: 100px;
}
</style>
