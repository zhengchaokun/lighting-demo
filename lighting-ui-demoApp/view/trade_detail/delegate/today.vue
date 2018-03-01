
<template>
    <div>
        当日委托，
        暂无记录
    </div>
</template>
<script>
    import Light from 'light'
    export default {
        data(){
            return {

            }
        },
        mounted(){
            Light.trigger('delegateChange', 0)
        }
    }
</script>
<style lang="less">

</style>
