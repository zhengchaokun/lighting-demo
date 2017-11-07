<template>
    <div>
        <slider class="slider" interval="4500" auto-play="true">
            <div class="frame" v-for="img in imageLists" @click="onclickimg(img)">
                <image class="image" resize="cover" :src="img.imgsrc"></image>
                <text class="title">{{img.title}}</text>
            </div>
        </slider>
    </div>
</template>

<style scoped>
    .slider {
        height: 380px;
        margin-top: 70px;
    }
    .image {
        width: 750px;
        height: 380px;
    }
    .title {
        position: absolute;
        bottom: 0;
        left: 0;
        padding-left: 40px;
        width: 750px;
        height: 60px;
        color: #FFFFFF;
        font-size: 28px;
        line-height: 60px;
        background-color: rgba(0, 0, 0, 0.6);
    }
</style>

<script>
    import App from "light"
    export default {
        data: function () {
            return {
            }
        },
        props: ['imageLists'],
        methods: {
            onclickimg(img){
                this.$emit('imgOnClick', img);
                App.router.push(img.src)
            }
        }
    }
</script>
