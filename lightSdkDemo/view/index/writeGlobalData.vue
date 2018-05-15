
<template>
    <div class="apiContent">
    <scroller> 
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">当有些数据需要多次使用的时候，我们可以把这些数据存到本地，需要使用的时候再从本地读取这些已存的数据（见下面从本地读取数据），比如账户的用户名、密码等信息。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
            <lc-input label="属性名" v-model="jsonName" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <lc-input label="属性值" v-model="jsonvalue" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <div class="listWidth">
                <lc-button text="保存数据到本地"
                    type="normal" 
                    @LcButtonClicked="writeData"></lc-button>
             </div>
       
            <lc-input label="属性名" v-model="gotjsonName" placeholder="请先输入一个存储在本地的属性" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <lc-input label="属性值" v-model="gotjsonvalue" placeholder="" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <div class="listWidth">
                <lc-button text="读取本地数据"
                    type="normal" 
                    @LcButtonClicked="readData"></lc-button>
             </div>

            <lc-input label="属性名" v-model="deletejsonName" placeholder="请先输入一个存储在本地的属性" :has-top-border="false" :has-bottom-border="false"></lc-input>
            
             <div class="listWidth">
                <lc-button text="删除本地数据"
                    type="normal" 
                    @LcButtonClicked="deleteData"></lc-button>
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
    import App from "light";
    import LightSDK from "light-sdk";
    import LcInput  from 'lighting-ui/packages/lc-input';
    import LcButton from 'lighting-ui/packages/lc-button';
    export default {
        data(){
            return {
                jsonName:"",
                jsonvalue:"",
                gotjsonName:"",
                gotjsonvalue:"",
                deletejsonName:"",
                jumpShow:false
            }
        },
        components:{LcInput,LcButton},
        methods:{
            jump(view){
                App.navigate(view)
            },
            toOnlineApi:function(){
                var event = weex.requireModule('event'); 
                event.openNative('web',{startPage:'https://document.lightyy.com/app_jssdk_ref/content/native_writedata.html'})
            },
            writeData:function(){
                var that = this;
                if(!that.jsonName||!that.jsonvalue){
                    that.ifError = true;
                    that.Dialog.toast({
                        message: "属性值或者名称不能为空",
                        duration: 2
                    });
                    return false;
                }
                LightSDK.native.writeData({
                    key:that.jsonName,
                    value:that.jsonvalue
                },function(data){
                    if(data.info.error_code!='0'){
                        that.Dialog.toast({
                            message: data.info.error_message,
                            duration: 2
                        });
                        return false;
                    }
                    that.Dialog.toast({
                        message: "保存成功，读取数据试试吧！",
                        duration: 2
                    });
                    that.jumpShow = true;
                })
            },
            readData:function(){
                var that = this;
                if(!that.gotjsonName){
                    that.Dialog.toast({
                        message: "读取的属性名不能为空！",
                        duration: 2
                    });
                    return false;
                }
                
                LightSDK.native.readData({
                    key:that.gotjsonName,
                },function(data){
                    // if(data.info.error_code!='0'){
                    //     that.Dialog.toast({
                    //         message: data.info.error_message,
                    //         duration: 2
                    //     });
                    //     return false;
                    // }
                    that.Dialog.toast({
                        message: "数据读取成功",
                        duration: 2
                    });
                    that.gotjsonvalue = data.data.result;
                })
            },
            deleteData:function(){
                var that = this;
                if(!that.deletejsonName){
                    that.Dialog.toast({
                        message: "删除的属性名不能为空！",
                        duration: 2
                    });
                    return false;
                }
                LightSDK.native.deleteData({
                    key:that.deletejsonName
                },function(data){
                    if(data.info.error_code!='0'){
                        that.Dialog.toast({
                            message: data.info.error_message,
                            duration: 2
                        });
                        return false;
                    }
                    that.Dialog.toast({
                        message: "删除成功！",
                        duration: 2
                    });
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>

</style>
