
<template>
    <div style="height: 800px;padding: 100px">
       <div class="bar-wrap" ref="barWrap">
           <span class="text" :style="{width:getWidth(bar)+'px'}"  v-for="(bar,index) in bars">{{bar.p}}</span>
           <span class="bar" @mousedown="mousedown($event,index)" :style="{left:getLeft(index)+'px'}"
                 v-for="(bar,index) in  bars"></span>
       </div>
    </div>
</template>
<script>
    const zeroWidth = 22;
    export default {
        data(){
            return {
                bars:[],
                barWrapWidth:0,

                moveBarIndex:null,
                barWrapLeft:0
            }
        },
        methods:{
            mouseup(){},
            mousedown($event,index){
                this.moveBarIndex = index;
                this.barWrapLeft = $event.clientX-this.getLeft(index);
            },
            mousemove(){},
            getWidth(bar){
                let width = this.$refs.barWrap.offsetWidth;
                if(!bar.p){
                    return zeroWidth;
                }
                this.bars.forEach(function (bar) {
                    if(bar.p===0){
                        width-=zeroWidth;
                    }
                });
                return bar.p/100*width;
            },
            getLeft(index){
                let width = this.$refs.barWrap.offsetWidth;
                this.bars.forEach(function (bar) {
                    if(bar.p===0){
                        width-=zeroWidth;
                    }
                });
                if(index===0){
                    if(this.bars[index].p===0) return zeroWidth;
                    return this.bars[index].p*(width/100);
                }else{
                    if(this.bars[index].p===0) return zeroWidth+this.getLeft(index-1);
                    return this.bars[index].p*(width/100)+this.getLeft(index-1)
                }
            }
        },
        mounted(){
            this.bars = [
                {
                    p:10},
                {
                    p:10},
                {
                    p:10},
                {
                    p:60},
                {
                    p:10},
            ];

            const that =this;

            document.body.addEventListener("mousemove",function (event) {
                //处理鼠标移动
                if(that.moveBarIndex!==null){
                    let diff = event.clientX-that.barWrapLeft-that.getLeft(that.moveBarIndex);

                    // 不能超过左右边界
                    const left = that.moveBarIndex===0?0:that.getLeft(that.moveBarIndex-1);
                    const right = that.getLeft(that.moveBarIndex+1)
                    const current = that.getLeft(that.moveBarIndex)

                    if(diff>(right-current)){
                        diff = (right-current);
                    }else if(diff<(left-current)){
                        diff = (left-current);
                    }

                    if(Math.abs(diff)>that.$refs.barWrap.offsetWidth*0.05){
                        let flag;
                        if(diff>0){
                            flag = 1

                        }else{
                            flag = -1
                        }
                        that.bars[that.moveBarIndex].p+=10*flag;
                        that.bars[that.moveBarIndex+1].p+=10*flag*-1;
                    }
                }
            });

            document.body.addEventListener("mouseup",function () {
                //处理鼠标移动
                that.moveBarIndex = null;
            });
        }
    }
</script>
<style lang="less">
    .bar-wrap{
        background-color: #0AA9F1;
        width: 100%;
        height:20px;
        position: relative;
        span.text{
            display: inline-block;
            text-align: center;
            border: 1px solid red;
            box-sizing: border-box;
        }

        span.bar{
            position: absolute;;
            border-radius: 50%;
            width:22px;
            height:22px;
            background-color: red;
            top:0;
            cursor: pointer;
            transform: translateX(-50%);
            &:last-child{
                display: none;
            }
        }
    }
</style>
