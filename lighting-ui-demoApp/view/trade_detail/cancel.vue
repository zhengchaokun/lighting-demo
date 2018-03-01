
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
        created(){
            Light.trigger('tabChange', 2)
        }
    }
</script>
<style lang="less">

</style>
