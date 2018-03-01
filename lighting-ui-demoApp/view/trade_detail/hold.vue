
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
            Light.trigger('tabChange', 4)
        }
    }
</script>
<style lang="less">

</style>
