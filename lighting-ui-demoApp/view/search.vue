
<template>
    <div style="background-color:#f0eff4;">
        <scroller>
            <lc-minibar 
                right-text="搜索"            
                class="navhead">
                <div slot="middle" class="navbar-search">
                    <image class="navbar-search-icon" src="images/search.png"></image>
                    <input class="navbar-search-input" type="text" value="" placeholder="股票代码或拼音简称" />
                </div>               
            </lc-minibar>

            <div class="result-wrap">
                <div class="result-box" v-for="(r,i) in results" :key="i">
                    <text class="result-type">{{r.type}}</text>
                    <text class="result-text">{{r.code}}</text>
                    <text class="result-text">{{r.name}}</text>
                    <text :class="['result-icon', r.isCollect?'remove':'add']" @click="changeCollect(r)">{{r.isCollect?'-':'+'}}</text>
                </div>
            </div>
            <lc-tip :show="show" type="text" :message="message"></lc-tip>  
        </scroller>
    </div>
</template>
<script>
import App from "light";
import LcMinibar from "lighting-ui/packages/lc-minibar";
import LcTip from 'lighting-ui/packages/lc-tip';
    export default {
        components: { LcMinibar,LcTip},        
        data(){
            return {
                show:false,
                message:'',
                results:[
                    { type:'沪A', code:'600570', name:'恒生电子', isCollect:true },
                    { type:'股转', code:'838701', name:'豪生电子', isCollect:false },
                    { type:'股转', code:'835691', name:'海森电子', isCollect:false },
                    { type:'股转', code:'830914', name:'海塞电装', isCollect:false },
                ]
            }
        },
        methods:{
            changeCollect(r){
                r.isCollect = !r.isCollect;
                this.show=true;
                if(r.isCollect){
                    this.message="添加成功";
                }else{
                    this.message="取消添加";
                }                
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
.navhead{  position:fixed;top:0;left:0;height:90px;font-size:30px;}
.navbar-img{ width: 55px; height: 55px; margin-left: 40px;}
.navbar-search{ align-items: center; flex-direction: row; justify-content: center;
     width: 510px; height: 70px; border-radius: 15px; background-color:rgba(255, 255, 255, 0.3); }
.navbar-search-icon{ width: 30px; height: 30px;}
.navbar-search-input{ width:385px; height: 70px; placeholder-color:#ffb1b9; color: #ebe8e9; font-size: 30px; margin-left: 10px; background-color: transparent;}

.result-wrap{ padding-left: 26px; padding-right: 26px; margin-top: 90px;}
.result-box{ height: 98px; flex-direction: row; align-items: center; justify-content: space-between; border-bottom-width: 1px; border-bottom-color: #dcdcde; }
.result-type{ width: 82px; height: 40px; line-height: 40px; text-align: center; border-width: 1px; border-color: #a84347; color: #a84347; font-size: 24px;}
.result-text{ color: #000002; font-size: 32px;}
.result-icon{width: 50px; height: 50px; line-height: 46px; text-align: center; border-width: 1px; font-size: 36px; border-radius: 25px;}
.add{ border-color: #a84347; color: #a84347;}
.remove{ border-color: #959597; color: #959597;}

</style>
