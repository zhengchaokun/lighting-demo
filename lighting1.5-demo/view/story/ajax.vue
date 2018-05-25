
<template>
    <div style="width:750px;height: 1334px;">
        <div class="doc" style="margin-top: 40px;margin-bottom: 40px;">
            <text class="title" style="margin-bottom: 30px;">需求：ajax与fetch接口整合</text>
            <text class="desc" style="margin-top:20px;">验收标准：请求成功，正确显示数据</text>   
        </div>
        <div class="demo">
            <category :title="info.city_name+'天气情况'"></category>
            <lc-cell label="天气" 
                :title="info.current_condition" 
                :has-top-border="true"
                :has-bottom-border="false"></lc-cell>
            <lc-cell label="温度" 
                :title="info.current_temperature+'度'" 
                :has-top-border="false"
                :has-bottom-border="false"></lc-cell>
                
            <lc-cell label="最低温度" 
                :title="info.dat_low_temperature+'度'" 
                :has-top-border="false"
                :has-bottom-border="false"></lc-cell>

            <lc-cell label="最高温度" 
                :title="info.dat_high_temperature+'度'" 
                :has-top-border="false"
                :has-bottom-border="false"></lc-cell>
                
            <lc-cell label="空气质量等级" 
                :title="info.quality_level" 
                :has-top-border="false"
                :has-bottom-border="true"></lc-cell>
        
        </div>
    </div>
</template>
<script>
import Category from 'lighting-ui/packages/_mods/category.vue';
import LcCell from "lighting-ui/packages/lc-cell"
export default {
    components: {
        LcCell, Category
    },
    data() {
        return {
            info: {}
        };
    },
  
    mounted () {
        var that = this;
        this.$light.ajax({
            type: 'get',
            url: 'https://www.toutiao.com/stream/widget/local_weather/data/',
            dataType: 'json',
            headers: {
                'Access-Control-Allow-Origin': 'http://www.toutiao.com'
            },
            data: {
                city: '%E5%8C%97%E4%BA%AC'
            },
            success: function(data,status,xhr) {
                if(data.message=='success') {
                    that.info = data.data.weather;
                }
            }
        })
       
    }
};
</script>
<style scoped>
.info {
    font-size: 28px;
    text-align: center;
}
.doc {
    padding-left: 40px;
    padding-right: 40px;
}
.title {
    font-size: 36px;
    text-align: center;
}
.desc {
    font-size: 32px;
    text-align: left;
}
.button {
    margin-left: 24px;
    margin-top: 100px;
}
</style>
