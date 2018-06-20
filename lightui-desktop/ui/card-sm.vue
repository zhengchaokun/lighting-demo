
<template>
    <div class="wrap">
        <div class="top">
            <img :src="options.src">
            <p>{{ options.title }}</p>
        </div>
        <div class="content">
            <p v-if="options.content">{{ options.content }}</p>
            <slot name="content"></slot>
        </div>
        <div class="footer">
            <span>{{ options.desc }}</span>
            <span>{{ options.date }}</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            options: Object,
            src: String,
            title: String,
            content: String,
            desc: String,
            date: String
        },
        data(){
            return {};
        }
    }
</script>
<style lang="less" scoped>

.wrap {
    padding: 20px;
    background: #fff;
    // border: solid 1px #D2D9E3;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
        border: none;
    }
}
.top {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    font-size: 14px;
    font-weight: 500;
    color: #303030;
    img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 10px;
    }
}
.content {
    padding: 10px 0;
}
.footer {
    display: flex;
    align-items:center;
    justify-content: space-between;
    color: #909090;
    font-size: 12px;
    .desc {

    }
}

    
</style>
