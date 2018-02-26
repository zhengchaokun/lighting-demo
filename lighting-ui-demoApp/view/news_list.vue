
<template>
    <div>
       <div class="title-bar">
           <image src="images/icon.png" class="icon-back"></image>
           <text>{{title}}</text>
           <image src="images/icon.png" class="icon-search"></image>
       </div>
       <scroller>
           <div>
               
           </div>
       </scroller>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                title: '公告',
            }
        },
        methods:{

        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style lang="less">

</style>
