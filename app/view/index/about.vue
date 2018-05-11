
<template>
    <div>
        <div class="main">
            <h1>LIGHT，致力于降低金融移动终端产品的开发门槛，提升产品交付效率，帮助产品以更小的试错成本快速迭代</h1>
            <a href="#/index/contact/demo">跳转</a>
        </div>

        <ul>
            <li v-for="item in items">
                <div class="title" @click="item.open = !item.open">点击后折叠</div>
                <div v-show="item.open ">
                    我是内容
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                items:[{
                    open:false
                },{
                    open:false
                },{
                    open:false
                },{
                    open:false
                }]
            }
        },
        mounted(){
            console.log(`about-mounted`)
        }
    }
</script>
<style lang="less">

</style>
