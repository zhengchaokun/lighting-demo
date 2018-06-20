<template>
    <div class="wrap">
        <ul>
            <li class="item flex-row" v-for="(item,index) in list" :key="index">
                <div>
                    <span class="index" v-if="hasIndex">{{index+1}}</span>
                    <span class="title">{{item.title}}</span>
                </div>
                <span class="desc">{{item.desc}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        hasIndex: Boolean,
        list: Array
    }
}
</script>

<style lang="less" scoped>
.wrap {
    .item {
        justify-content: space-between;
        line-height: 20px;
        margin-top: 15px;
        font-size: 14px;
        .index {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 8px;
            border-radius: 50%;
            background: #303030;
            color: #fff;
            line-height: 20px;
            text-align: center;
            font-size: 12px;
        }
        .title {

        }
        .desc {
            color: #909090;
        }
    }
}

</style>