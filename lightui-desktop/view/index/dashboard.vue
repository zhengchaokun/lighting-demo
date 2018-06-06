
<template>
    <div style="height: 100%;">
        <div class="sub-sidebar">
            <div class="sub-sidebar-title">{{ currentMenu.title }}</div>
            <ul class="sub-sidebar-menu">
                <template  v-for="(item,index) in currentMenu.options">
                    <li class="sub-sidebar-li" @click="selectOption(item)" :class="{'selected':currentPath==item.path}" :key="index">
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
                currentMenu: menus[0],
                currentPath: '',
                navList:['控制台','分析页']
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
