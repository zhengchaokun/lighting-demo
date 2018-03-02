
<template>
    <div>
        当日成交
        暂无记录
    </div>
</template>
<script>
    import Light from 'light'
    export default {
        data(){
            return {}
        },
        mounted(){
            Light.trigger('delegateChange', 1)
        }
    }
</script>
<style lang="less">

</style>
