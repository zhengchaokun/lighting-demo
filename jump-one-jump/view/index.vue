<template>
    <div style="">
        <canvas ref="canvas"></canvas>
    </div>
</template>
<script>
    const Game = require("../lib/game");
    export default {
        data() {
            return {};
        },
        mounted() {
            let game = new Game({
                canvas:this.$refs.canvas
            });
            game.init()
            window.game = game;
            // game.addSuccessFn(success)
            // game.addFailedFn(failed)
            //
            // let mask = document.querySelector('.mask')
            // let restartButton = document.querySelector('.restart')
            // let score = document.querySelector('.score')
            //
            // restartButton.addEventListener('click', restart)
            //
            // function restart () {
            //     mask.style.display = 'none'
            //     game.restart()
            // }
            // function failed(){
            //     score.innerText = game.score
            //     mask.style.display = 'flex'
            // }
            // function success (score) {
            //     let scoreCurrent = document.querySelector('.score-current')
            //     scoreCurrent.innerText = score
            // }
        }
    }
</script>
<style scoped>
</style>
