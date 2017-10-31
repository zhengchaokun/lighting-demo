
<template>
    <div>
        <sub-view></sub-view>
    </div>
</template>
<script>
    import App from "light"
    export default {
        data(){
            return {
                index:1
            }
        },
        methods:{
            jump(link,index){
                App.router.push(link)
            }
        }
    }
</script>
<style scoped>
</style>
