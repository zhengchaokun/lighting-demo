<template>
    <div>
        <div class="blackBg"></div>
        <div class="scrollBox" id="scrollBox">
            <div class="whiteShadow">

            </div>
            <span></span>
            <button @click="sureSelect(select[num])">确1定</button>
            <ul id="scrollWrap">
                <li></li>
                <li></li>
                <li v-for="(item,index) in select" :class="{'selected':num==index}">{{getName(item,name)}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                num:2
            };
        },
        methods:{
            sureSelect(obj){
                this.$emit("getParam",obj)
            },
            getName(obj,name){
                for( var list in obj){
                    if(list==name){
                        return (obj[list])
                    }
                }
                
            }
        },
        props:['select','name'],
        mounted(){
            var that = this;
            var lastXForMobile, lastYForMobile,wh = document.getElementById("scrollWrap");
            var bh = document.getElementById("scrollBox");
            bh.scrollTop = 80;
            bh.addEventListener('touchstart', function (e) {
                lastXForMobile = e.changedTouches[0].pageX;
                lastYForMobile = e.changedTouches[0].pageY;
            });

            bh.addEventListener('touchend', function (e) {
                var diffX = e.changedTouches[0].pageX - lastXForMobile;
                var diffY = e.changedTouches[0].pageY - lastYForMobile;
                bh.scrollTop = (Math.ceil(bh.scrollTop/40))*40;
                var number = Math.ceil(bh.scrollTop/40);
                 that.num = number;
            });

        }
    }
</script>
<style lang="less">
    .blackBg{
        position:fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background:rgba(120,120,120,0.6)
    }
    .scrollBox{
        height:4rem;
        overflow-y:auto;
        width:100%;
        position:fixed;
        bottom:0;
        left:0;
        right:0;
        background:#eee;
        .whiteShadow{
            position:fixed;
            height:4rem;
            bottom:0;
            left:0;
            right:0;
            box-shadow:30rem 10rem 2rem #fff;
        }
        span{
            height:0.84rem;
            width:72%;
            position:fixed;
            left:4%;
            bottom:1.555rem;
            border:1px solid #d7d7d7;
            background:#fff;
            font-weight:900;
            z-index:-1;
        }
        button{
            height:0.84rem;
            width:16%;
             position:fixed;
            right:4%;
            bottom:1.55rem;
            background:#55c683;
            border-radius:4px;
            color:#fff;
            font-size:0.34rem;
            z-index: 9;
        }
        ul{
            position:relative;
            margin-bottom: 1.6rem;
            li{
                line-height:0.8rem;
                height:0.8rem;
                margin-left:4%;
                text-indent:0.4rem;
                width:72%;
                font-size:0.34rem;
                
            }
            li.selected{
                font-weight:900;
            }
        } 
        
    }
    .scrollBox::-webkit-scrollbar{
        display:none;
    }
</style>
