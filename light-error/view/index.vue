<template>
    <div style="">
        <text>hello</text>
        <text v-if="mgs===1">hello1</text>
        <text v-if="mgs===3">hello3</text>
        <text v-if="mgs===2">hello2</text>
        <text v-if="mgs===4">hello4</text>
    </div>
</template>
<script>
    import Light from "light";
    export default {
        data(){
            return {
                mgs:null
            };
        },
        mounted(){
            const that = this;
            Light.on("error",function (type) {
                that.mgs = type
            })
        }
    }
</script>
<style scoped>
</style>
