
<template>
    <div>
        <div class="sub-sidebar">
            <div class="sub-sidebar-title">{{ currentMenu.title }}</div>
            <ul class="sub-sidebar-menu">
                <template  v-for="(item,index) in currentMenu.options">
                    <li class="sub-sidebar-li" @click="selectOption(item)" :class="{'selected':currentPath.indexOf(item.path) > -1}" :key="index">
                        {{ item.title }}
                    </li>
                </template>
            </ul>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>  
    </div>
</template>
<script>
    import menus from "menus"
    import App from "light"
    // import API from 'api'
    export default {
        data(){
            return {
                currentMenu: menus[2],
                currentPath: '',
                navList:['表格页','基础表格']
            }
        },
        methods:{
            selectOption(item){
                App.navigate('#' + item.path,{});
                this.currentPath = item.path;
            }
        },
        watch:{
            "$route":function(val){
                this.currentPath = this.$route.path;
            }
        },
        created(){
            App.trigger('navChange', '')
        },
        mounted(){
            this.currentPath = this.$route.path;
        }
    }
</script>
<style lang="less">

</style>
