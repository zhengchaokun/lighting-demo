
<template>
    <div style="background-color:#f0eff4;">
       <scroller>
             <div class="head">
                <lc-cell label="立即申购"
                :icon="icon1" :cell-style="cellStyle"
                :desc="desc" :label-style="labelStyle"
                :desc-style="descStyle"
                :has-arrow="true"
                :auto-accessible="true"></lc-cell>
            </div>  
            <div class="bgc-white">
                <lc-cell label="查询我的申购"
                :icon="icon2" :cell-style="cellStyle"
                :label-style="labelStyle2"       
                :has-arrow="true"
                :auto-accessible="true"></lc-cell>
            </div> 

            <div class="mt20 bgc-white">
                <lc-cell :icon="icon3" label="查询我的额度" :cell-style="cellStyle1" :has-arrow="true" :has-bottom-border="false"></lc-cell>
                <lc-cell :icon="icon4" label="新股发行计划" :cell-style="cellStyle1" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>
                <lc-cell :icon="icon5" label="新股发行提醒" title="（已开通）" :title-style="titleTextStyle" :cell-style="cellStyle1" :has-arrow="true" :has-top-border="false" :has-bottom-border="false"></lc-cell>
                <lc-cell :icon="icon6" label="跟我学新规" :cell-style="cellStyle1" cell-index="last" :has-arrow="true" :has-top-border="false"></lc-cell>
            </div>     
            <lc-cell title="我要还款（原借钱打新的用户使用）" :cell-style="cellStyle2" :title-style="titleTextStyle" :has-arrow="true" :has-top-border="false"></lc-cell>
      
       </scroller>
    </div>
</template>
<script>
import App from "light";
import LcCell from "lighting-ui/packages/lc-cell";
    export default {
        components: { LcCell },
        data(){
            return {
                desc:'今日有1只新股可申购',
                labelStyle:{color:'#fff',fontSize:'38px'},
                labelStyle2:{color:'#535353',fontSize:'38px'},
                cellStyle:{backgroundColor:'transparent',height:'190px'},
                cellStyle1:{height:'108px'},
                cellStyle2:{backgroundColor:'#f3f3f5',height:'108px'},                
                descStyle:{fontSize:'30px',color:'#ffd5a3',marginTop:'20px'},
                titleTextStyle:{fontSize:'26px',color:'#9f9f9f',textAlign:'left'},
                icon1:'images/apply-icon-1.png',
                icon2:'images/apply-icon-2.png',
                icon3:'images/apply-icon-3.png',
                icon4:'images/apply-icon-4.png',
                icon5:'images/apply-icon-5.png',
                icon6:'images/apply-icon-6.png',
            }
        },
        methods:{
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>

.head{ background-color: #f8902f; height: 190px; margin-top: 50px; }

</style>
