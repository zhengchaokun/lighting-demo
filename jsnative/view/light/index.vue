
<template>
    <div>
       <navlist :navLists="navLists"></navlist>
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
                        name:'要闻',
                        selected:''
                    },
                    {
                        index:1,
                        color:'#646d88',
                        name:'牛牛大学',
                        selected:''
                    },
                    {
                        index:2,
                        color:'#646d88',
                        name:'要闻',
                        selected:''
                    },
                    {
                        index:3,
                        color:'#646d88',
                        name:'牛牛大学',
                        selected:''
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
