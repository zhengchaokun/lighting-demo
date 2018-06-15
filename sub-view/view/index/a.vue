
<template>
    <div>
       <text @click="jump()">helpa</text>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        },
        methods:{
            help(){
                this.$emit("help")
            },
            jump(){
                this.$light.navigate('index/b',{},{replace:true})
            }
        },
        mounted(){
            console.log(123)
        }
    }
</script>
<style lang="less">

</style>
