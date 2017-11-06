
<template>
    <div>
        <sub-view></sub-view>

        <div class="wrapper">
            <text class="text" @click="jump('/light/index')">demo</text>
        </div>
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
    .wrapper {
        flex-direction: column;
        justify-content: center;
    }
    .button {
        /*width: 450px;*/
        /*margin-top: 30px;*/
        /*margin-left: 150px;*/
        padding-top: 20px;
        padding-bottom: 20px;
        border-width: 2px;
        border-style: solid;
        border-color: #DDDDDD;
        background-color: #F5F5F5
    }
    .text {
        font-size: 60px;
        color: #666666;
        text-align: center;
    }
</style>
