<template>
    <div>
        <list class="list" @loadmore="fetch" loadmoreoffset="10">
            <cell class="cell" :key="list.title" v-for="list in infolists">
                <image class="cell-img" :src="list.imgsrc"></image>
                <div class="panel">
                    <text class="cell-tit">{{list.title}}</text>
                    <text class="cell-time">{{list.time}}</text>
                </div>
            </cell>
        </list>
    </div>
</template>

<style scoped>
    .list{
        padding-bottom: 80px;
    }
    .cell{
        height: 170px;
        flex-direction: row;
        padding-top: 20px;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        border-bottom-color: #e8e8ea;
    }
    .cell-img{
        width: 160px;
        height: 125px;
    }
    .panel {
        flex: 1;
        margin-left: 20px;
        margin-bottom: 20px;
        flex-direction: column;
        justify-content: space-between;
    }
    .cell-tit {
        font-size: 30px;
        text-align: left;
        color: #50697a;
        lines:2; /*控制行数*/
    }
    .cell-time{
        font-size: 20px;
        color: #b3bbc0;
        text-align: right;
    }
</style>

<script>
    import App from "light"
    export default {
        data: function () {
            return {
            }
        },
        props: ['infolists'],
        methods: {
            fetch (event) {
                modal.toast({ message: 'loadmore', duration: 1 })

                setTimeout(() => {
                    const length = this.infolists.length
                    for (let i = length; i < length + LOADMORE_COUNT; ++i) {
                    this.infolists.push(i + 1)
                }
                }, 800)
            }
        }
    }
</script>
