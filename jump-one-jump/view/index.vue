<template>
    <div style="">
        <div class="score">
            <image class="score-text" v-for="s in score.toString()" :src="'res/'+s+'.png'"></image>
        </div>
        <canvas ref="canvas"></canvas>
    </div>
</template>
<script>
    const Game = require("../lib/game");
    import Light from "light";
    export default {
        data() {
            return {
                score:0
            };
        },
        mounted() {
            const that = this;
            let game = new Game({
                canvas:this.$refs.canvas,
                success(score){
                    that.score = score;
                },fail(){
                    Light.requireModule("modal").alert({
                        message:"失败了，点击再试一次！",
                        okTitle:'再试一次'
                    },function(){
                        that.score = 0;
                        game.start();
                    })
                }
            });
            game.init()
        }
    }
</script>
<style scoped>
    .score{
        position: fixed;
        top:160px;
        left: 90px;
    }
    .score-text{
        width: 60px;
        height: 60px;
    }
</style>
