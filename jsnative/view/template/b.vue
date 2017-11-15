
<template>
    <div>
       <div class="top-container">
           <div class="flex-row">
               <image class="app-icon row-item"></image>
               <image class="app-icon row-item"></image>
               <image class="app-icon row-item"></image>
               <image class="app-icon row-item"></image>
           </div>
           <div class="align-items-center">
               <text>更多登录方式 ></text>
           </div>
       </div>

    </div>
</template>
<script>
    export default {
        data(){
            return {}
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .top-container{
        background-color: #373737;
    }
    .app-icon{
        width: 135px;
        height: 135px;
        border-radius: 50%;
        background-color: #ccc;
    }
</style>
