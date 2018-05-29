
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
    background: #fff;
    padding: 20px;
    border-bottom: solid 1px #eee;
    box-shadow: 0px 2px 8px 0px #eee;  
}

.title {
    color: #303030;
    font-size: 20px;
}

.desc {
    margin-top: 20px;
    color: #606060;
    font-size: 14px;
}
    
</style>
