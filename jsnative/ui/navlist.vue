<template>
    <div class="nav-head">
        <text class="nav-head-text"
              v-for='list in navLists'
              @click="onclicklist(list)"
              :class="[selected(list)]"
        >{{list.name}}
        </text>
    </div>
</template>

<style scoped>
    .nav-head {
        background: #fff;
        flex-direction: row;
    }

    .nav-head-text {
        height: 70px;
        line-height: 70px;
        font-size: 30;
        color: #646d88;
        padding-right: 10px;
        padding-left: 10px;
        margin-left: 10px;
        margin-right: 10px;
        justify-content: center;
    }

    .on {
        color: #457fca;
        border-bottom-style: solid;
        border-bottom-width: 4px;
        border-bottom-color: #457fca;
    }

</style>

<script>
    export default {
        data: function () {
            return {
                selectedIndex: 0
            }
        },
        props: ['navLists'],
        mounted(){
        },
        methods: {
            selected: function (list) {
                if (this.selectedIndex == list.index) {
                    return "on"
                }
                else {
                    return "";
                }
            },
            onclicklist: function (e) {
                this.selectedIndex = e.index;
                this.$emit('navListOnClick', e);
            }

        }
    }
</script>
