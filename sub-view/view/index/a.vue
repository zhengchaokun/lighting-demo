
<template>
    <div>
       <text @click="help()">help</text>
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
            }
        }
    }
</script>
<style lang="less">

</style>
