<template>
    <div style="">
        <text>hello,world</text>
        <sub-view @help="help"></sub-view>
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
