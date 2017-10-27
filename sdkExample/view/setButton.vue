
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js添加导航栏按钮，有时候我们需要在导航栏添加一些操作按钮，比如扫一扫、搜索等。就可以使用此方法。</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">设置导航栏按钮示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
       
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span>按钮名称：</span><input v-model="title" class="inputStyle" type="text" placeholder=""></p> 
            <p><span>icon地址：</span><input v-model="iconsrc" class="inputStyle" type="text" placeholder=""></p> 
            <p><span class="buttonStyle" @click="setButton()">添加</span></p>
            <p :class="{'colorRed':ifError==true,'tips':ifError==false}"><span>tips:</span>{{tipsCont}}</p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                ifshow:false,
                ifError:false,
                iconsrc:"",
                title:"",
                tipsCont:"点击'添加'按钮后，请注意导航栏新添了按钮，点击试试吧"
            }
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/setNavigateButton.html"
            },
            closed:function(){
                this.ifshow=false;
                this.ifError=false;
                this.tipsCont="点击'添加'按钮后，请注意导航栏新添了按钮，点击试试吧";
                this.title="";
                this.iconsrc="";
                LightSDK.native.removeButton();//移除导航栏按钮
            },
            setButton:function(){
                var that = this;
                if(!that.title&&!that.iconsrc){
                    that.ifError=true;
                    that.tipsCont="名称和icon图标地址必须选填一个";
                    return false;
                }
                LightSDK.native.setButton({
                    title:that.title,
                    icon:that.iconsrc
                },function(){
                    that.ifError=false;
                    that.tipsCont="点击'添加'按钮后，请注意导航栏新添了按钮，点击试试吧";
                    alert("我被点击啦！") //your code ,点击添加按钮后触发的函数
                })
            }
        }
    }
</script>
<style lang="less">

</style>
