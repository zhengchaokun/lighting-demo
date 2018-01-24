<template>
    <div style="">
        <div class="score">
            <img class="score-text" v-for="s in score.toString()" :src="'res/'+s+'.png'"></img>
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
                    that.score = 0;
                    game.start();
                }
            });
            game.init()
        }
    }
</script>
<style scoped>
    .score{
        position: fixed;
        top:80px;
        left: 45px;
    }
    .score-text{
        width: 30px;
        height: 30px;
        display: inline-block;
    }
</style>
