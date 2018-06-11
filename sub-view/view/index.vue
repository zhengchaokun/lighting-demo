<template>
    <div style="">
        <text>hello,world</text>
        <keep-alive>
            <sub-view @help="help"></sub-view>
        </keep-alive>
    </div>
</template>
<script>
    export default {
        data(){
            return {};
        },
        methods:{
            help(){
                console.log(123)
            }
        }
    }
</script>
<style scoped>
</style>
