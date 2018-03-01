
<template>
    <div>
       Hello,World !
    </div>
</template>
<script>
    import Light from 'light'
    export default {
        data(){
            return {}
        },
        mounted(){
            Light.trigger('tabChange', 1)
        }
    }
</script>
<style lang="less">

</style>
