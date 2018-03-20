
<template>
    <div class="modal" v-show="currentVisible" :style="{top:top+'rem'}">
        <div class="search-bar flex">
            <input v-model="currentValue" class="search-input mr30 flex1">
            <button class="btn-normal bg-green" @click="handleClick">确定</button>
        </div>
        <div class="search-list">
            <ul>
                <li v-for="(item, index) in list" :key="index" @click="handleSelect(item)">{{ item[type] }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                currentValue: this.value[this.type],
                currentVisible: this.visible
            }
        },
        props: {
            list: Array,
            type: String,
            visible: Boolean,
            top: Number,
            value: Object
        },
        methods: {
            handleClick() {
                if(!this.currentValue)return;
                this.$emit('btnClick', this.currentValue);
                this.currentVisible = false;
            },
            handleSelect(item) {
                this.currentValue = item[this.type];
                this.$emit('input', item);
                this.$emit('change', item);
            }
        },
        watch: {
            value(val) {
                this.currentValue = val[this.type]
            },
            currentVisible(val) {
                this.$emit('visible-change',val)
                // if(val) {
                //     document.ontouchmove = function(e){
                //         e.preventDefault();
                //     }
                // } else {
                //     document.ontouchmove = function(e){
                //         // e.preventDefault();
                //     }
                // }
            },
            visible(val) {
                this.currentVisible = val;
            }
        },
        mounted () {
            // console.log(this.list,this.type)
        }
    }
</script>

<style lang="less" scoped>

    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 1;
        background: #F9F9F9;
    }
    .modal > .detail-list {
        padding: 0.4rem 0.3rem 0.2rem 0.3rem;
        height: 1.48rem;
    }
    .search-bar {
        padding: 0.2rem 0.3rem 0.3rem 0.3rem;
    }
    .search-bar input {
        height: 0.84rem;
        background: #FFFFFF;
        border: 0.02rem solid #D7D7D7;
        border-radius: 0.04rem;
        padding: 0.06rem 0.2rem;
        font-size: 0.34rem;
        color: #4A4A4A;
        letter-spacing: 0.0.5rem;
        line-height: 0.72rem;
        font-weight: bold;
    }
    .search-bar button {
        width: 1.2rem;
        height: 0.84rem;
    }
    .search-list {
        font-size: 0.34rem;
        color: #787878;
        letter-spacing: 0.0.5rem;
        line-height: 0.72rem;
        padding: 0 0.3rem 0.3rem 0.3rem;
    }
    li {
        padding-left: 0.2rem;
    }
    li:nth-child(odd) {
        background: #EBEBF2;
    }
</style>
