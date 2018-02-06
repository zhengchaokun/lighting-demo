
<template>
    <div style="background-color:#f0eff4;">
        <scroller>
            <lc-minibar 
                right-text="搜索"            
                class="navhead" 
                @LcMinibarRightButtonClicked="">
                <div slot="middle" class="navbar-search">
                    <image class="navbar-search-icon" src="images/search.png"></image>
                    <input class="navbar-search-input" type="text" placeholder="股票代码或拼音简称" />
                </div>               
            </lc-minibar>

            <div class="result-wrap">
                <div v-for="(r,i) in results" :key="i">
                    <text>{{r.type}}</text>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
import App from "light";
import LcMinibar from "lighting-ui/packages/lc-minibar";
    export default {
        components: { LcMinibar},        
        data(){
            return {
                results:[
                    { type:'沪A', code:'600570', name:'恒生电子', isCollect:false },
                    { type:'股转', code:'838701', name:'豪生电子', isCollect:false },
                    { type:'股转', code:'835691', name:'海森电子', isCollect:false },
                    { type:'股转', code:'830914', name:'海塞电装', isCollect:false },
                ]
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
.navbar-search-input{ placeholder-color:#ffb1b9; color: #ebe8e9; font-size: 30px; margin-left: 10px; background-color: transparent; height: 70px;}

.result-wrap{ padding-left: 26px; padding-left: 26px;}

</style>
