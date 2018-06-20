
<template>
    <div class="wrap">
        <h1 class="title">{{ title }}</h1>
        <p class="desc">{{ desc }}</p>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            title: String,
            desc: String
        },
        data(){
            return {};
        }
    }
</script>
<style lang="less" scoped>

.wrap {
    margin-bottom: 80px;
}

.title {
    color: #303030;
    font-size: 24px;
}

.desc {
    margin-top: 18px;
    color: #606060;
    font-size: 14px;
}
    
</style>
