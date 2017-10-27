
<template>
<div>
    <div class="apiContent">
       <p>说明：</p>
       <div class="apiDesc">通过js获取通讯录信息，有时候再某种特定情况下需要获取手机的通讯录信息，这时候可以使用这个方法获取，接口将会返回手机通讯录中的所有联系人的名字和电话。</div>
       <p>示例：</p>
       <div class="exampleShow"><span @click="ifshow=true">获取通讯录信息示例</span></div>
       <p>文档：</p>
       <div class="viewOnlineApi" @click="toOnlineApi()"><span>查看在线文档</span></div>
    </div>
    <div class="greyBg" v-show="ifshow">
        <div class="operateWrap">
            <em class="closed" @click="closed()"></em>
            <p class="tips"><span>tips:</span>点击'查询'按钮后，将会显示手机通讯录上的所有联系人信息</p>
            <p><span class="buttonStyle" @click="getContactInfo()">查询</span></p>
            <ul class=infoList>
                <li v-for="info in contactInfoList"><span>{{info.contactName}}</span><em>{{info.contactTelphone}}</em></li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                ifshow:false,
                contactInfoList:[]
            }
        },
        methods:{
            getContactInfo:function(){
                var that = this;
                LightSDK.native.getContactInfo(function(data){
                    that.contactInfoList = data.data;
                })
            },
            closed:function(){
                this.ifshow=false;
                this.contactInfoList=[];
            },
            toOnlineApi:function(){
                location.href="https://document.lightyy.com/termAPI/getContactInfo.html"
            }
        }
    }
</script>
<style lang="less">

</style>
