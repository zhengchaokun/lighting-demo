
<template>
    <div>
       撤单，暂无记录
    </div>
</template>
<script>
    import Light from 'light'
    export default {
        data(){
            return {}
        },
        created(){
            Light.trigger('tabChange', 2)
        }
    }
</script>
<style lang="less">

</style>
