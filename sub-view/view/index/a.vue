<template>
    <div ref="test">
        <canvas ref="canvas_holder" style="width:750;height:750;background-color:rgba(0, 0, 0, 0.1)"></canvas>
    </div>
</template>
<script>


    import { enable, WeexBridge, Image as GImage } from "canvas";
    module.exports = {

        created: function () {
        },
        mounted: function () {
            var ref = this.$refs.canvas_holder;
            ref = enable(ref, {bridge: WeexBridge});
            var ctx = ref.getContext('2d');
            ctx.lineWidth=10;

            //1.圆形边角
            ctx.beginPath();
            ctx.lineJoin="round";
            ctx.moveTo(20,20);
            ctx.lineTo(100,50);
            ctx.lineTo(20,100);
            ctx.stroke();

            //2.创建斜角
            ctx.beginPath();
            ctx.lineJoin="bevel";
            ctx.moveTo(20,120);
            ctx.lineTo(100,150);
            ctx.lineTo(20,200);
            ctx.stroke();
            //3.创建尖角

            ctx.beginPath();
            ctx.lineJoin="miter";
            ctx.moveTo(20,220);
            ctx.lineTo(100,250);
            ctx.lineTo(20,300);
            ctx.stroke();
        }
    };
</script>