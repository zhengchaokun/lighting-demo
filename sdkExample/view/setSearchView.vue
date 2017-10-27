
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js设置导航栏搜索视图。搜索视图添加后，点击视图触发回调函数，在回调函数中用户可以根据需求做处理，比如点击搜索视图后，页面跳转到搜索页面。</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">设置导航栏搜索视图示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span class="w50">背景色</span><input v-model="bgColor" class="inputStyle" type="text" placeholder="如#ffffff"></p> 
            <p><span class="w50">文字</span><input v-model="textDesc" class="inputStyle" type="text" placeholder="请输入搜索内容"></p> 
            <p><span class="w50">文字颜色</span><input v-model="textColor" class="inputStyle" type="text" placeholder="如#333333"></p> 
            <p><span class="buttonStyle" @click="setSearchView()">添加</span></p>
            <p class="tips"><span>tips:</span>{{tipsCont}}</p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                bgColor:"",
                textDesc:"",
                textColor:"",
                ifshow:false,
                tipsCont:"点击'添加'按钮后，请注意导航栏新添了搜索视图，点击试试吧"
            }
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/setSearchView.html"
            },
            closed:function(){
                this.ifshow=false;
            },
            setSearchView:function(){
                var that = this;
                LightSDK.native.setSearchView({
                    "backgroundColor":that.bgColor,
                    "placeholderText":that.textDesc,
                    "placeholderTextColor":that.textColor
                },function(data){
                    alert("我被点击啦");
                })
            }
        }
    }
</script>
<style lang="less">

</style>
