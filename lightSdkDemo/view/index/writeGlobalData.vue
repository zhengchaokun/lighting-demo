
<template>
    <div class="apiContent">
    <scroller> 
        <div><text class="detailHead">说明：</text></div>
        <div><text class="detailDesc">当有些数据需要多次使用的时候，我们可以把这些数据存到本地，需要使用的时候再从本地读取这些已存的数据（见下面从本地读取数据），比如账户的用户名、密码等信息。</text></div>
        <div><text class="detailHead">示例：</text></div>
        <div class="operateWrap">
            <lc-input label="属性名" v-model="jsonName" placeholder="key" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <lc-input label="属性值" v-model="jsonvalue" placeholder="value" :has-top-border="false" :has-bottom-border="false"></lc-input>
             <div class="flex-row mt20">
                <text class="flex-1 smallbut" @click="writeData()">保存数据</text>
                <text class="flex-1 smallbut" @click="readData()">读取数据</text>
                <text class="flex-1 smallbut" @click="deleteData()">删除数据</text>
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
                jsonvalue:""
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
                    // if(data.info.error_code!='0'){
                    //     that.Dialog.toast({
                    //         message: data.info.error_message,
                    //         duration: 2
                    //     });
                    //     return false;
                    // }
                    that.Dialog.toast({
                        message: "保存成功，读取数据试试吧！",
                        duration: 2
                    });
                })
            },
            readData:function(){
                var that = this;
                if(!that.jsonName){
                    that.Dialog.toast({
                        message: "读取的属性名不能为空！",
                        duration: 2
                    });
                    return false;
                }
                
                LightSDK.native.readData({
                    key:that.jsonName,
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
                    that.jsonvalue = data.data.result;
                })
            },
            deleteData:function(){
                var that = this;
                if(!that.jsonName){
                    that.Dialog.toast({
                        message: "删除的属性名不能为空！",
                        duration: 2
                    });
                    return false;
                }
                LightSDK.native.deleteData({
                    key:that.jsonName
                },function(data){
                    // if(data.info.error_code!='0'){
                    //     that.Dialog.toast({
                    //         message: data.info.error_message,
                    //         duration: 2
                    //     });
                    //     return false;
                    // }
                    that.Dialog.toast({
                        message: "删除成功！",
                        duration: 2
                    });
                    that.jsonvalue = "";
                    that.jsonName = "";
                })
            }
        }
    }
</script>
<style scoped src="../../css/ui.css"></style> <style scoped>
.smallbut{
    background-color:#399DE2;
    font-size:30px;
    height:80px;
    line-height:80px;
    color:#fff;
    text-align:center;
    margin-left:20px;
    margin-right:20px;
    border-radius:8px;
}
</style>
