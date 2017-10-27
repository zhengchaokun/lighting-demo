
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js分享内容到各平台。使用此API可实现分享文字、图片、图文、音乐、视频、链接到微信、微博、钉钉、QQ等多个平台。调用 share 接口，模块会弹出可分享平台列表（可通过 config.xml 和 key.xml 文件配置信息自定义数量）菜单供用户选择分享。使用本模块需要到对应开发平台申请开发者账号，并创建应用获取对应分享的 Appkey</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">分享示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span>标题：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><input v-model="title" class="inputStyle" type="text" placeholder=""></p> 
            <p><span>内容：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><input v-model="content" class="inputStyle" type="text" placeholder=""></p> 
            <p><span>图片地址：&nbsp;&nbsp;</span><input v-model="imgsrc" class="inputStyle" type="text" placeholder=""></p> 
            <p><span>链接地址：&nbsp;&nbsp;</span><input v-model="url" class="inputStyle" type="text" placeholder=""></p> 
            <p><span class="buttonStyle" @click="share()">分享</span></p>
            <p :class="{'colorRed':ifError==true,'tips':ifError==false}"><span>tips:</span>{{tipsCont}}</p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                ifError:false,
                ifshow:false,
                tipsCont:"请填写要分享的内容，其中标题，图片地址，链接地址为必填",
                title:"",
                content:"",
                imgsrc:"",
                url:""
            }
        },
        methods:{
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/share.html"
            },
            closed:function(){
                this.ifshow=false;
                this.ifError=false;
                this.tipsCont="请填写要分享的内容，标题，图片地址，url地址为必填";
                this.title="",
                this.content="",
                this.imgsrc="",
                this.url=""
            },
            share:function(){
                var that = this;
                if(!that.title||!that.url||!that.imgsrc){
                    that.tipsCont="标题，图片地址，url地址不能为空";
                    that.ifError=true;
                    return false;
                }
                LightSDK.native.share({
                    title:that.title,
                    content:that.content,
                    url:that.url, //分享出去的链接打开后显示的地址
                    image:that.imgsrc//分享出去的图片地址
                },function(data){
                    if(data.error_no!="0"){
                        alert(data.error_info);
                        return false;
                    }else{
                        that.ifError=false;
                        that.tipsCont="请填写要分享的内容，标题，图片地址，url地址为必填";
                        console.log(data);//your code
                    }
                })
            }
        }
    }
</script>
<style lang="less">

</style>
