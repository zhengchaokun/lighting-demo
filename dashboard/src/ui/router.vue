<template>
    <a :href="'#/'+view">{{name}}</a>
</template>

<script>
    export default {
        props:['view','name']
    }
</script>

<style>
</style>