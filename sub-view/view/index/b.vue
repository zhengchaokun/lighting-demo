
<template>
    <div>
       <text @click="jump()">helpb</text>
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
                this.$light.navigate('index/a',{},{replace:true})
            }
        },
        mounted(){
            console.log(456)
        }
    }
</script>
<style lang="less">

</style>
