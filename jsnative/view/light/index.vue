
<template>
    <div>
       <navlist :navLists="navLists" @navListOnClick="navListOnClick"></navlist>
    </div>
</template>
<script>
    import navlist from '../../ui/navlist.vue'
    export default {
        data(){
            return {
                navLists:[
                    {
                        index:0,
                        color:'#646d88',
                        name:'要闻'
                    },
                    {
                        index:1,
                        color:'#646d88',
                        name:'牛牛大学'
                    },
                    {
                        index:2,
                        color:'#646d88',
                        name:'要闻'
                    },
                    {
                        index:3,
                        color:'#646d88',
                        name:'牛牛大学'
                    }
                ]
            }
        },
        components: { navlist },
        methods:{
            navListOnClick: function (e) {
                console.log('navListOnClick', e.index)
            }
        }
    }
</script>
<style scoped>

</style>
