
<template>
    <div style="background-color:#f0eff4;">
        <scroller>
            
        </scroller>
        <div class="headtop"></div>
        <div class="navhead">
            <div class="navbar-search">
                <image class="navbar-search-icon ml20" src="images/search.png"></image>
                <text class="navbar-search-text ml20">搜索基金名称/代码</text>
            </div>
        </div> 
    </div>
</template>
<script>
import App from "light";
import LcCell from "lighting-ui/packages/lc-cell";
    export default {
        components: { LcCell },
        data(){
            return {
            }
        },
         methods: {
            jump(view) {
                App.navigate(view);
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
.headtop{height:40px; width:750px; position:fixed; top:0; background-color:#2877d3;}
.navhead{ position:fixed;top:38px;left:0; width: 750px; height:90px;font-size:30px; background-color: #2877d3; align-items: center; }
.navbar-search{ align-items: center; flex-direction: row; 
     width: 686px; height: 70px; border-radius: 15px; background-color:#1862b7; }
.navbar-search-icon{ width: 30px; height: 30px;}
.navbar-search-text{ color: #aadcff; font-size: 28px; margin-left: 10px;}
</style>
