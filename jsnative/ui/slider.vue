<template>
    <div>
        <slider class="slider" interval="4500" auto-play="true">
            <div class="frame" v-for="img in imageLists" @click="onclickimg(img)">
                <image class="image" resize="cover" :src="img.imgsrc"></image>
                <text class="title">{{img.title}}</text>
            </div>
            <indicator class="indicator"></indicator>
        </slider>
    </div>
</template>

<style scoped>
    .slider {
        width: 750;
        height: 380;
        margin-top: 5;
    }
    .image {
        width: 750;
        height: 380;
    }
    .title {
        position: absolute;
        top: 20px;
        left: 20px;
        padding-left: 20px;
        width: 200px;
        color: #FFFFFF;
        font-size: 36px;
        line-height: 60px;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .frame {
        width: 700px;
        height: 700px;
        position: relative;
    }
    .indicator {
        width: 700px;
        height: 700px;
        item-color: green;
        item-selected-color: red;
        item-size: 50px;
        position: absolute;
        top: 200px;
        left: 200px;
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
