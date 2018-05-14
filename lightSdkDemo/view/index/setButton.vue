
<template>
    <div class="apiContent">
        <scroller class="operateWrap">   
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">有时候我们需要对导航栏做修改，比如添加导航栏按钮，修改透明度，设置导航栏背景色等。</text></div>
        <div><text class="detailHead">示例：</text></div>
        
        <div class="operateWrap">
             <div class="listWidth mb5" style="position:relative">
                <lc-input placeholder="请输入透明度"  v-model="opacity"></lc-input>
                <text class="miniBut" @click="setAlpha()">修改透明度</text>
            </div>
            <div class="listWidth mb5" style="position:relative">
                <lc-input placeholder="请输入背景色"  v-model="bgColor"></lc-input>
                <text class="miniBut" @click="setBackgroundColor()">设置背景色</text>
            </div>
            <lc-input label="按钮名称" v-model="title" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="icon地址" v-model="iconsrc" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <div class="listWidth mb30">
                <lc-button text="添加导航栏按钮"
                    type="normal" 
                    @LcButtonClicked="setButton"></lc-button>
             </div>
             <div class="listWidth">
                <lc-button text="删除导航栏按钮"
                    type="normal" 
                    @LcButtonClicked="removeButton"></lc-button>
             </div>

             <lc-input label="背景色" v-model="searBgColor" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="文字" v-model="textDesc" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
            <lc-input label="文字颜色" v-model="textColor" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <div class="listWidth">
                <lc-button text="添加导航栏搜索视图"
                    type="normal" 
                    @LcButtonClicked="setSearchView"></lc-button>
             </div>
        </div>
        <div><text class="detailHead">文档：</text></div>
        <div class="flex-row" @click="toOnlineApi()">
            <text class="onlineLink">查看在线文档</text>
        </div>
     </scroller>
     </div>
</template>
<script>
    import LightSDK from "light-sdk";
    import LcInput  from 'lighting-ui/packages/lc-input';
    import LcButton from 'lighting-ui/packages/lc-button';
    export default {
        data(){
            return {
                opacity:"",
                bgColor:"",
                searBgColor:"",
                textDesc:"",
                textColor:"",
                iconsrc:"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3754198828,1208184486&fm=173&app=25&f=JPEG?w=218&h=146&s=C0A5925640B2CC795636C4C3020030BB",
                title:"",
                tipsCont:"点击'添加'按钮后，请注意导航栏新添了按钮，点击试试吧"
            }
        },
        components:{LcInput,LcButton},
        methods:{
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_addbutton.html'})
            },
            a:function(){
               
            },
            removeButton:function(){
                LightSDK.native.removeButton();
            },
            setButton:function(){
                var that = this;
                if(!that.title&&!that.iconsrc){
                    that.tipsCont="名称和icon图标地址必须选填一个";
                    return false;
                }
                var actionFunction = 'actionFunction_' + Math.floor(Math.random() * 1000);
                window[actionFunction] = that.a;
                LightSDK.native.addButton({
                    title:that.title,
                    icon:that.iconsrc,
                    action: "javascript:" + actionFunction + "();",
                    position:"right"
                },function(){
                    that.Dialog.toast({
                        message: "添加成功",
                        duration: 2
                    });
                })
            },
            //修改导航栏透明度
            setAlpha:function(){
                var that = this;
                LightSDK.native.setAlpha({
                    alpha:that.opacity
                },function(data){
                    that.Dialog.toast({
                        message: "修改成功",
                        duration: 2
                    });
                })
            },
            //设置导航栏背景色
            setBackgroundColor:function(){
                var that = this;
                if(!that.bgColor){
                    that.Dialog.toast({
                        message: "背景色必填",
                        duration: 2
                    });
                    return false;
                }
                LightSDK.native.setBackgroundColor({
                    color:that.bgColor
                })
            },
            //设置导航栏搜索视图
            setSearchView:function(){
                var that = this;
                LightSDK.native.setSearchView({
                    "backgroundColor":that.searBgColor,
                    "placeholderText":that.textDesc,
                    "placeholderTextColor":that.textColor
                },function(data){
                    that.Dialog.toast({
                        message: "我被点击啦",
                        duration: 2
                    });
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>
    .miniBut{
    position:absolute;
    right:0px;
    top:0px;
    background-color:#399DE2;
    width:200px;
    text-align:center;
    height:85px;
    line-height:85px;
    display:block;
    color:#fff;
    font-size:30px;
}
</style>
