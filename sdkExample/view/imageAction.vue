
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">看到一张想要保存的图片，我们想通过点击或者长按图片将图片保存到本地相册中，就可以使用此方法实现</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">保存图片到本地示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>

    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><img @click="saveImage()" :src="imgsrc" width="100" height="100" alt=""></p> 
            <p class="tips"><span>tips:</span>点击图片后保存到本地相册中</p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                ifshow:false,
                imgsrc:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502080755380&di=038b685eaf4c6b40f50994cbc2a01a42&imgtype=0&src=http%3A%2F%2Fimg01.taopic.com%2F150704%2F240499-150F40QS335.jpg"
            }
        },
        methods:{
            saveImage:function(){
                var that = this;
                LightSDK.native.imageAction({
                    url:that.imgsrc
                },function(data){
                    if(data.error_no!="0"){
                        alert(data.error_info);
                        return false;
                    }else{
                        console.log(data);//your code
                    }
                })
            },
            closed:function(){
                this.ifshow=false;
            },
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/imageAction.html"
            },
            chooseImage:function(){
                LightSDK.native.chooseImage({},function(data){
                    console.log(data);
                })
            }
        }
    }
</script>
<style lang="less">

</style>
