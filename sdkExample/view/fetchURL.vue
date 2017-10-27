
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">经常我们在做开发的时候会遇到需要某个url地址中的某段内容时，就可以使用这个方法，比如我们现在需要恒生官网中的title标签中的内容，这时我们就可以使用这个方法来取到http://www.hundsun.com/的内容，从而拿到title的值。</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">抓取网页内容示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p><span>url：</span><input v-model="url" class="inputStyle" type="text" placeholder=""></p> 
            <p><span class="buttonStyle" @click="getTitle()">获取</span></p>
            <p><span class="w50">标题：</span><em>{{title}}</em></p>
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
                url:"http://www.hundsun.com/",
                tipsCont:"点击获取后将会展示对应的标题信息",
                title:""
            }
        },
        methods:{
            closed:function(){
                this.ifshow=false;
                this.ifError=false;
                this.title="";
                this.tipsCont="点击获取后将会展示对应的标题信息"
            },
            getTitle:function(){
                var that = this;
                if(!that.url){
                    that.tipsCont="请先输入url";
                    that.ifError=true;
                    return false;
                }
                LightSDK.native.fetchURL({
                    url:that.url
                },function(data){
                    if(data.error_no!="0"){
                        alert(data.error_info);
                        return false;
                    }else{
                        that.tipsCont="点击获取后将会展示对应的标题信息";
                        that.ifError=false;
                        var content = data.data;
                        var outTit = content.substring(content.indexOf("<title>")+7,content.indexOf("</title>"))
                        if(outTit){
                            that.title=outTit
                        }else {
                            that.title=that.url;
                        }
                    }
                })
            }
        }
    }
</script>
<style lang="less">

</style>
